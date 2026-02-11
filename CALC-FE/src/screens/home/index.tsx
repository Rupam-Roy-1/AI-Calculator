import { ColorSwatch, Group, Select } from '@mantine/core';
import { Button } from '@/components/ui/button';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Draggable from 'react-draggable';
import {SWATCHES} from '@/constants';
import {FORMULAS, FormulasType} from '@/constants/formulas';
// import {LazyBrush} from 'lazy-brush';

interface GeneratedResult {
    expression: string;
    answer: string;
}

interface Response {
    expr: string;
    result: string;
    assign: boolean;
}

export default function Home() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const initialDataRef = useRef<ImageData | null>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('rgb(255, 255, 255)');
    const [reset, setReset] = useState(false);
    const [dictOfVars, setDictOfVars] = useState({});
    const [result, setResult] = useState<GeneratedResult>();
    const [latexPosition, setLatexPosition] = useState({ x: 10, y: 200 });
    const [latexExpression, setLatexExpression] = useState<Array<string>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState<ImageData[]>([]);
    const [formulaPosition, setFormulaPosition] = useState({ x: 10, y: 300 });
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedFormula, setSelectedFormula] = useState<string | null>(null);

    // const lazyBrush = new LazyBrush({
    //     radius: 10,
    //     enabled: true,
    //     initialPoint: { x: 0, y: 0 },
    // });

    const renderLatexToCanvas = useCallback((expression: string, answer: string) => {
        const latex = `\\(\\LARGE{${expression} = ${answer}}\\)`;
        setLatexExpression(prev => [...prev, latex]);

        // Clear the main canvas
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    }, []);

    const showFormula = (latex: string) => {
        setLatexExpression(prev => [...prev, latex]);
    };

    useEffect(() => {
        if (latexExpression.length > 0 && window.MathJax) {
            setTimeout(() => {
                window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
            }, 0);
        }
    }, [latexExpression]);

    useEffect(() => {
        if (result) {
            renderLatexToCanvas(result.expression, result.answer);
        }
    }, [result, renderLatexToCanvas]);

    useEffect(() => {
        if (reset) {
            resetCanvas();
            setLatexExpression([]);
            setResult(undefined);
            setDictOfVars({});
            setHistory([]);
            setReset(false);
        }
    }, [reset]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight - canvas.offsetTop;
                ctx.lineCap = 'round';
                ctx.lineWidth = 3;
                // Save initial canvas state
                initialDataRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
            }

        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-MML-AM_CHTML';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.MathJax.Hub.Config({
                tex2jax: {inlineMath: [['$', '$'], ['\\(', '\\)']]},
            });
        };

        return () => {
            document.head.removeChild(script);
        };

    }, []);


    const resetCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.style.background = 'black';
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                setIsDrawing(true);
            }
        }
    };
    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) {
            return;
        }
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.strokeStyle = color;
                ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
                ctx.stroke();
            }
        }
    };
    const stopDrawing = () => {
        setIsDrawing(false);
        // Save canvas state after drawing
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                setHistory(prev => [...prev, imageData]);
            }
        }
    };

    const undo = () => {
        const canvas = canvasRef.current;
        if (canvas && history.length > 0) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                const lastState = history[history.length - 1];
                ctx.putImageData(lastState, 0, 0);
                setHistory(prev => prev.slice(0, -1));
            }
        }
    };

    const runRoute = async () => {
        setIsLoading(true);
        const canvas = canvasRef.current;

        if (canvas) {
            try {
                const response = await axios({
                    method: 'post',
                    url: `${import.meta.env.VITE_API_URL}/calculate`,
                    data: {
                        image: canvas.toDataURL('image/png'),
                        dict_of_vars: dictOfVars
                    }
                });

                const resp = await response.data;
                console.log('Response', resp);
                resp.data.forEach((data: Response) => {
                    if (data.assign === true) {
                        // dict_of_vars[resp.result] = resp.answer;
                        setDictOfVars({
                            ...dictOfVars,
                            [data.expr]: data.result
                        });
                    }
                });
                const ctx = canvas.getContext('2d');
                const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
                let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;

                for (let y = 0; y < canvas.height; y++) {
                    for (let x = 0; x < canvas.width; x++) {
                        const i = (y * canvas.width + x) * 4;
                        if (imageData.data[i + 3] > 0) {  // If pixel is not transparent
                            minX = Math.min(minX, x);
                            minY = Math.min(minY, y);
                            maxX = Math.max(maxX, x);
                            maxY = Math.max(maxY, y);
                        }
                    }
                }

                const centerX = (minX + maxX) / 2;
                const centerY = (minY + maxY) / 2;

                setLatexPosition({ x: centerX, y: centerY });
                resp.data.forEach((data: Response) => {
                    setTimeout(() => {
                        setResult({
                            expression: data.expr,
                            answer: data.result
                        });
                    }, 1000);
                });
            } catch (error) {
                console.error('Error processing image:', error);
                alert('Error processing image. Please try again.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const categoryOptions = Object.keys(FORMULAS).map(key => ({ value: key, label: FORMULAS[key as keyof FormulasType].title }));
    const formulaOptions = selectedCategory ? FORMULAS[selectedCategory as keyof FormulasType].formulas.map((f, index) => ({ value: index.toString(), label: f.name })) : [];

    return (
        <>
            <div className='grid grid-cols-7 gap-2'>
                <Button
                    onClick={() => setReset(true)}
                    className='z-20 bg-black text-white'
                    variant='default'
                    color='black'
                >
                    Reset
                </Button>
                <Button
                    onClick={undo}
                    className='z-20 bg-gray-600 text-white'
                    variant='default'
                    disabled={history.length === 0}
                >
                    Undo
                </Button>
                <Select
                    placeholder="Select Category"
                    data={categoryOptions}
                    value={selectedCategory}
                    onChange={(value) => {
                        setSelectedCategory(value);
                        setSelectedFormula(null);
                    }}
                    className='z-20'
                />
                <Select
                    placeholder="Select Formula"
                    data={formulaOptions}
                    value={selectedFormula}
                    onChange={setSelectedFormula}
                    disabled={!selectedCategory}
                    className='z-20'
                />
                <Button
                    onClick={() => {
                        if (selectedCategory && selectedFormula !== null) {
                            const formula = FORMULAS[selectedCategory as keyof FormulasType].formulas[parseInt(selectedFormula)];
                            showFormula(formula.latex);
                        }
                    }}
                    className='z-20 bg-blue-600 text-white'
                    variant='default'
                    disabled={!selectedCategory || selectedFormula === null}
                >
                    Show Formula
                </Button>
                <Group className='z-20'>
                    {SWATCHES.map((swatch) => (
                        <ColorSwatch key={swatch} color={swatch} onClick={() => setColor(swatch)} />
                    ))}
                </Group>
                <Button
                    onClick={runRoute}
                    className='z-20 bg-black text-white'
                    variant='default'
                    color='white'
                    disabled={isLoading}
                >
                    {isLoading ? 'Processing...' : 'Run'}
                </Button>
            </div>
            <canvas
                ref={canvasRef}
                id='canvas'
                className='absolute top-0 left-0 w-full h-full'
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
            />

            {latexExpression && latexExpression.map((latex, index) => (
                <Draggable
                    key={index}
                    defaultPosition={latexPosition}
                    onStop={(_, data) => setLatexPosition({ x: data.x, y: data.y })}
                >
                    <div className="absolute p-2 text-white rounded shadow-md">
                        <div className="latex-content">{latex}</div>
                    </div>
                </Draggable>
            ))}
            {latexExpression && latexExpression.filter(latex => latex.includes('(a + b)^2')).map((latex, index) => (
                <Draggable
                    key={`formula-${index}`}
                    defaultPosition={formulaPosition}
                    onStop={(_, data) => setFormulaPosition({ x: data.x, y: data.y })}
                >
                    <div className="absolute p-2 text-white rounded shadow-md">
                        <div className="latex-content">{latex}</div>
                    </div>
                </Draggable>
            ))}
        </>
    );
}
