import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => `
        a {
          text-decoration: none;
        }
      `,
    },
  },
});
