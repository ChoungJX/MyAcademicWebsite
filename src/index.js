import blue from '@material-ui/core/colors/blue';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './pages/home/homepage';



const theme = createTheme({
  palette: {
    primary: blue,
  },
});

function App() {
  return <ThemeProvider theme={theme}><HomePage /></ThemeProvider>;
}


ReactDOM.render(<App />, document.querySelector('#root'));