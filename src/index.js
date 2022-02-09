import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';

import App from './App';
import theme from './theme';
import reportWebVitals from './reportWebVitals';

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
