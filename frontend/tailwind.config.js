import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        customBlue: '#09473F',
        customGreen: '#09473F',
      },
    },
  },
  plugins: [],
});
