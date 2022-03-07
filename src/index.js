import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';
import theme from './theme';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
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
