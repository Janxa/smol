/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:
      {'greenpear':'#87FF65',
      'greenpear-2':'#6FFF47',
      'greenpear-3':'#4FFF1F',
      'greenpear-4':'#35F500',
      'greenpear-5':'#41AF1D',
      'greenpear-6':'#348C17',
      'greenpear-7':'#276911',
      'greenpear-8':'#1A460B',
      'greenpear-9':'#0D2306',
        'opal':'#9DC7C8',
        'redalert':'#af1b3f',
        'mint-1':'#BFFFAE',
        'mint-2':'#DFFFD7'}
      ,},
  },
  plugins: [],
}
