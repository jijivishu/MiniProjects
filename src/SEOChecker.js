import React from 'react';

import { useSEOCheckerContext } from  './context/SEOCheckerContext';

/* Result component is responsible for displaying the SEO stats fetched, however it has Widget Component nested in it.
   Thus, widget component is rendered only in the case when we do not have result to display i.e. no valid URL is submitted. */
import Result from './Result';
import Widget from './Widget';

function SEOChecker () {
    const { submittedOnce } = useSEOCheckerContext();
    return (
            <div className='flex flex-col bg-custom-white p-4 h-full'>
                {!submittedOnce && <Widget />} {/* Render Widget if url is not submitted yet */}
                {submittedOnce && <Result />} {/* Render Result only if url is submitted atleast once*/}             
            </div>
        )
}

export default SEOChecker;