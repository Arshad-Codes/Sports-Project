import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customBlue: '#09473F',
        customGreen: '#09473F',
        customGreen1: '#008767',
        customGreen2: '#00B087',
        customGreen3: '#94FDE4',
        customRed: '#DF0404',
        customRed2: '#FFC5C5',
      },
    },
  },
  plugins: [],
});
