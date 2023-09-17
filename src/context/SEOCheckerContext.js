import React, { createContext, useContext, useState } from "react";

export const seoCheckerContext = createContext();

export function SEOCheckerContextProvider ({children}) {
    /* State variables within this context: 
    submittedOnce: Check if the user submitted a URL in Form component and deliver status to Result component
    receivedData: Stores valid response object of API and conveys to Result component
    enteredURL: Stores exact format of url initially entered by the user
    error: Stores any error message from any component and to be displayed in any component. */
    const [submittedOnce, setSubmittedOnce] = useState(false);
    const [receivedData, setReceivedData] = useState(null);
    const [enteredURL, setEnteredURL] = useState(null);
    const [error, setError] = useState(null);

    return (
        <seoCheckerContext.Provider value={{submittedOnce, setSubmittedOnce, receivedData, setReceivedData, enteredURL, setEnteredURL, error, setError}}>
            {children}
        </seoCheckerContext.Provider>
    );
}

// Function to handle errors and to facilitate easy use of this context across the DOM
export function useSEOCheckerContext () {
    const context = useContext(seoCheckerContext)
    
    if (!context) {
        throw new Error('useSubmittedState must be used within SEOCheckerContextProvider')
    }

    return context;
}

