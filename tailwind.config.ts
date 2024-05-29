import { error } from 'console'
import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
    },

    colors: {
      primary: '#2BD17E',
      error: '#EB5757',
      backgroundColor: '#093545',
      inputColor: '#224957',
      cardColor: '#092C39',
      white: '#FFFFFF',
    },
    screens: {
      '2xsm': '375px',
      xsm: '425px',
      '3xl': '2000px',
      ...defaultTheme.screens,
    },

    extend: {
      fontSize: {
        'heading-one': [
          '64px',
          {
            lineHeight: '80px',
            letterSpacing: '0%',
            fontWeight: '600',
          },
        ],
        'heading-two': [
          '48px',
          {
            lineHeight: '56px',
            letterSpacing: '0%',
            fontWeight: '600',
          },
        ],
        'heading-three': [
          '32px',
          {
            lineHeight: '40px',
            letterSpacing: '0%',
            fontWeight: '600',
          },
        ],
        'heading-four': [
          '24px',
          {
            lineHeight: '32px',
            letterSpacing: '0%',
            fontWeight: '700',
          },
        ],
        'heading-five': [
          '20px',
          {
            lineHeight: '24px',
            letterSpacing: '0%',
            fontWeight: '700',
          },
        ],
        'heading-six': [
          '16px',
          {
            lineHeight: '24px',
            letterSpacing: '0%',
            fontWeight: '700',
          },
        ],
        'body-large': [
          '20px',
          {
            lineHeight: '32px',
            letterSpacing: '0%',
            fontWeight: '400',
          },
        ],
        'body-regular': [
          '16px',
          {
            lineHeight: '24px',
            letterSpacing: '0%',
            fontWeight: '700',
          },
        ],
        'body-small': [
          '14px',
          {
            lineHeight: '24px',
            letterSpacing: '0%',
            fontWeight: '400',
          },
        ],
        'body-extra-small': [
          '12px',
          {
            lineHeight: '24px',
            letterSpacing: '0%',
            fontWeight: '400',
          },
        ],
        caption: [
          '14px',
          {
            lineHeight: '16px',
            letterSpacing: '0%',
            fontWeight: '400',
          },
        ],
      },
      spacing: {
        2: '2px',
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        24: '24px',
        32: '32px',
        40: '40px',
        48: '48px',
        64: '64px',
        80: '80px',
        120: '120px',
        160: '160px',
      },
    },
  },
  plugins: [],
}
export default config
