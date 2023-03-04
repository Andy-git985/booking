import { createTheme } from '@mui/material';

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
