import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => `
        a {
          color: inherit;
          text-decoration: none;
        }
        a:visited {
          color: inherit;
          text-decoration: none;
        }
      `,
    },
  },
});
