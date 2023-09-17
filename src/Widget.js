import React from "react";

import { useSEOCheckerContext } from  './context/SEOCheckerContext';
import Form from './Form';

import styles from './index.css';


// Widget component acts as the Container Wrap for Form component and renders Widget name with the Form.
function Widget () {
    
    // Context variable allows this component to occupy full screen unless a valid URL is submitted.
    const { submittedOnce } = useSEOCheckerContext();

    return (
        <div className={submittedOnce ? 'flex justify-center items-center mt-4 mb-8' : 'flex justify-center items-center h-screen'}>
            <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-custom-sea-green text-2xl font-semibold mb-4">SEO Checker</h1>
                <Form />
            </div>
        </div>
    )
} 


export default Widget;