/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Pelican 3.0 base palette (dark)
        base: {
          low: '#141415',
          flat: '#1e1e20',
          lowest: '#28282a',
          high: '#ceced4',
          highest: '#f4f5f6',
        },
        text: {
          primary: '#ffffff',
          secondary: '#ceced4',
          tertiary: '#ffffff8f',
          disabled: '#ffffff66',
          inverse: '#141415',
          'inverse-disabled': '#1414157a',
          onbranded: '#141415',
          onneutral: '#141415',
        },
        border: {
          normal: '#434347',
          high: '#56565c',
        },
        feedback: {
          'neutral-low': '#141415',
          'neutral-accent-low': '#b9bac1',
          'danger-high': '#ef9381',
          'danger-low': '#871c07',
          'danger-accent-low': '#f4b7ab',
          'warning-high': '#ffe285',
          'warning-cape': '#ffcf33',
          'disabled-high': '#b9bac1',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Pelican 3.0 type scale
        'display-xl': ['30px', { lineHeight: '1.25', fontWeight: '700' }],
        'display-lg': ['24px', { lineHeight: '1.5', fontWeight: '660' }],
        'display-md': ['20px', { lineHeight: '1.5', fontWeight: '700' }],
        'display-sm': ['16px', { lineHeight: '1.5', fontWeight: '700' }],
        'display-xs': ['14px', { lineHeight: '1.5', fontWeight: '650' }],
        'subtitle-xl': ['20px', { lineHeight: '1.5', fontWeight: '600' }],
        'subtitle-lg': ['16px', { lineHeight: '1.5', fontWeight: '600' }],
        'subtitle-md': ['14px', { lineHeight: '1.5', fontWeight: '600' }],
        'subtitle-sm': ['12px', { lineHeight: '1.5', fontWeight: '600' }],
        'body-lg': ['16px', { lineHeight: '1.5', fontWeight: '500' }],
        'body-md': ['14px', { lineHeight: '1.5', fontWeight: '500' }],
        'body-sm': ['12px', { lineHeight: '1.5', fontWeight: '500' }],
        caption: ['10px', { lineHeight: '1.6', letterSpacing: '0.2px', fontWeight: '700' }],
      },
      spacing: {
        tiny: '2px',
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        '2xl': '24px',
      },
      borderRadius: {
        none: '0',
        md: '8px',
        lg: '12px',
        xl: '20px',
        pill: '200px',
        full: '999px',
      },
    },
  },
  plugins: [],
}
