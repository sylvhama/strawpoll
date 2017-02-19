import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './components/App';
import './index.css';

const Root = () => (
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

render(
  <Root />,
  document.getElementById('app')
);
