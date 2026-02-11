// export type FormulasType = typeof FORMULAS;

export const FORMULAS = {
  algebra: {
    title: 'Algebra Formulas',
    formulas: [
      { name: 'Difference of Squares', latex: '\\(a^2 - b^2 = (a - b)(a + b)\\)' },
      { name: '(a + b)²', latex: '\\((a + b)^2 = a^2 + 2ab + b^2\\)' },
      { name: 'a² + b²', latex: '\\(a^2 + b^2 = (a + b)^2 - 2ab\\)' },
      { name: '(a - b)²', latex: '\\((a - b)^2 = a^2 - 2ab + b^2\\)' },
      { name: '(a + b + c)²', latex: '\\((a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2bc + 2ca\\)' },
      { name: '(a - b - c)²', latex: '\\((a - b - c)^2 = a^2 + b^2 + c^2 - 2ab + 2bc - 2ca\\)' },
      { name: '(a + b)³', latex: '\\((a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3\\)' },
      { name: '(a - b)³', latex: '\\((a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3\\)' },
      { name: 'a³ - b³', latex: '\\(a^3 - b^3 = (a - b)(a^2 + ab + b^2)\\)' },
      { name: 'a³ + b³', latex: '\\(a^3 + b^3 = (a + b)(a^2 - ab + b^2)\\)' },
      { name: '(a + b)⁴', latex: '\\((a + b)^4 = a^4 + 4a^3b + 6a^2b^2 + 4ab^3 + b^4\\)' },
      { name: '(a - b)⁴', latex: '\\((a - b)^4 = a^4 - 4a^3b + 6a^2b^2 - 4ab^3 + b^4\\)' },
      { name: 'a⁴ - b⁴', latex: '\\(a^4 - b^4 = (a - b)(a + b)(a^2 + b^2)\\)' },
      { name: 'a^m * a^n', latex: '\\(a^m \\cdot a^n = a^{m+n}\\)' },
      { name: '(ab)^m', latex: '\\((ab)^m = a^m b^m\\)' },
      { name: '(a^m)^n', latex: '\\((a^m)^n = a^{mn}\\)' },
    ],
  },
  mensuration: {
    title: 'Mensuration Formulas',
    formulas: [
      { name: 'Rectangle Perimeter', latex: '\\(\\text{Perimeter} = 2(l + b)\\)' },
      { name: 'Rectangle Area', latex: '\\(\\text{Area} = l \\times b\\)' },
      { name: 'Square Area', latex: '\\(\\text{Area} = a^2\\)' },
      { name: 'Square Perimeter', latex: '\\(\\text{Perimeter} = 4a\\)' },
      { name: 'Triangle Area', latex: '\\(\\text{Area} = \\frac{1}{2} \\times b \\times h\\)' },
      { name: 'Trapezoid Area', latex: '\\(\\text{Area} = \\frac{1}{2} \\times (b_1 + b_2) \\times h\\)' },
      { name: 'Circle Area', latex: '\\(\\text{Area} = \\pi r^2\\)' },
      { name: 'Circle Circumference', latex: '\\(\\text{Circumference} = 2\\pi r\\)' },
      { name: 'Cube Surface Area', latex: '\\(\\text{Surface Area} = 6a^2\\)' },
      { name: 'Cube Volume', latex: '\\(\\text{Volume} = a^3\\)' },
      { name: 'Cylinder Curved SA', latex: '\\(\\text{Curved SA} = 2\\pi rh\\)' },
      { name: 'Cylinder Total SA', latex: '\\(\\text{Total SA} = 2\\pi r(r + h)\\)' },
      { name: 'Cylinder Volume', latex: '\\(\\text{Volume} = \\pi r^2 h\\)' },
      { name: 'Cone Curved SA', latex: '\\(\\text{Curved SA} = \\pi rl\\)' },
      { name: 'Cone Total SA', latex: '\\(\\text{Total SA} = \\pi r(r + l)\\)' },
      { name: 'Cone Volume', latex: '\\(\\text{Volume} = \\frac{1}{3} \\pi r^2 h\\)' },
      { name: 'Sphere Surface Area', latex: '\\(\\text{Surface Area} = 4\\pi r^2\\)' },
      { name: 'Sphere Volume', latex: '\\(\\text{Volume} = \\frac{4}{3} \\pi r^3\\)' },
    ],
  },
  probability: {
    title: 'Probability Formula',
    formulas: [
      { name: 'Probability', latex: '\\(P(A) = \\frac{n(A)}{n(S)}\\)' },
    ],
  },
  fraction: {
    title: 'Fraction Formulas',
    formulas: [
      { name: 'Add Whole + Fraction', latex: '\\(a + \\frac{b}{c} = \\frac{a \\times c + b}{c}\\)' },
      { name: 'Add Fractions Same Denom', latex: '\\(\\frac{a}{b} + \\frac{d}{b} = \\frac{a + d}{b}\\)' },
      { name: 'Add Fractions Diff Denom', latex: '\\(\\frac{a}{b} + \\frac{c}{d} = \\frac{a \\times d + b \\times c}{b \\times d}\\)' },
      { name: 'Multiply Fractions', latex: '\\(\\frac{a}{b} \\times \\frac{c}{d} = \\frac{a \\times c}{b \\times d}\\)' },
      { name: 'Divide Fractions', latex: '\\(\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a \\times d}{b \\times c}\\)' },
    ],
  },
  percentage: {
    title: 'Percentage Formula',
    formulas: [
      { name: 'Percentage', latex: '\\(\\text{Percentage} = \\left( \\frac{\\text{Given Value}}{\\text{Total Value}} \\right) \\times 100\\)' },
    ],
  },
  distance: {
    title: 'Distance Formula',
    formulas: [
      { name: 'Distance', latex: '\\(\\text{Distance} = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}\\)' },
    ],
  },
  trigonometry: {
    title: 'Trigonometry Formulas',
    formulas: [
      { name: 'sin θ', latex: '\\(\\sin \\theta = \\frac{\\text{Opposite}}{\\text{Hypotenuse}}\\)' },
      { name: 'cos θ', latex: '\\(\\cos \\theta = \\frac{\\text{Adjacent}}{\\text{Hypotenuse}}\\)' },
      { name: 'tan θ', latex: '\\(\\tan \\theta = \\frac{\\text{Opposite}}{\\text{Adjacent}}\\)' },
      { name: 'sec θ', latex: '\\(\\sec \\theta = \\frac{\\text{Hypotenuse}}{\\text{Adjacent}}\\)' },
      { name: 'cosec θ', latex: '\\(\\csc \\theta = \\frac{\\text{Hypotenuse}}{\\text{Opposite}}\\)' },
      { name: 'cot θ', latex: '\\(\\cot \\theta = \\frac{\\text{Adjacent}}{\\text{Opposite}}\\)' },
    ],
  },
};
