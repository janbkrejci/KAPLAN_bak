/* eslint-disable @typescript-eslint/no-var-requires */

import { resolve } from 'path'

export const plugins = [
  require('tailwindcss')(resolve(__dirname, 'tailwind.config.js')),
  require('autoprefixer'),
]
