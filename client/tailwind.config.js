/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:

      {'primary-green':'#157F1F', 
      'primary-green-2':'#116a19',
      'primary-black':'#1C1917',
      'primary-red':'#A8201A',
      'primary-grey-light':'#A8A29E',
      'primary-brown-2':'#57534E',
      'primary-white':"#eceaea",
      'primary-brown':'#292524',
      'secondary-yellow':'#FFFC99'
      },
    
  },
},
  plugins: [],
}
