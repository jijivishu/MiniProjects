import React from 'react';
import ReactDOM from 'react-dom/client';

/* Context hook used to avoid props drilling in the vrtual DOM. 
   SEOChecker is the eldest component containing the application. */
import { SEOCheckerContextProvider } from './context/SEOCheckerContext';
import SEOChecker from './SEOChecker'

const root = ReactDOM.createRoot(document.querySelector('#root'))
root.render(
    <SEOCheckerContextProvider>
        <SEOChecker /> 
    </SEOCheckerContextProvider>
);