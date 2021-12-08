import React from 'react';
import ReactDOM from 'react-dom';
import { LoginProvider } from './context';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@mui/material/styles';
import './index.css';
import Router from './router';
import AdapterDateFns from '@mui/lab/AdapterMoment';
import { LocalizationProvider } from '@mui/lab';
import * as serviceWorker from './serviceWorker';
const theme = createTheme({
    palette: {
        secondary: {
            main: '#f50057'
        }
    }
});

ReactDOM.render(
    <LoginProvider>
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDateFns} dateFormats={'DD/MM/YYYY'}>
                <Router />
            </LocalizationProvider>
        </ThemeProvider>
    </LoginProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
