import React, { useState } from "react";
import { useSEOCheckerContext } from  './context/SEOCheckerContext';

/* Credentials for API authentication, must be stored in env variables for better security.
   However, since this small project uses no virtual environment, they're used directly. */
const profile = 'jacksparrowbottled@gmail.com';
const password = 'be31444173f20dd9';

// Credentials need to be in a special format and base64 encoded before sending to the API.
const credentials = `${profile}:${password}`;
const base64credentials = btoa(credentials);
const authHeader = `Basic ${base64credentials}`;

function Form () {

    // Context hooks in it's full glory avoiding props drilling.
    const { submittedOnce, setSubmittedOnce, setReceivedData, error, setError, setEnteredURL } = useSEOCheckerContext();

    // State Variable to receive entered url and convert it into valid format for calling API.
    const [url, setURL] = useState();
    
    // Function to handle submission of the only Form in this project.
    const handleSubmit = (e) => {
        // Store entered URL in context to display in any component.
        setEnteredURL(url)

        // Forget previously fetched data.
        setReceivedData(null);

        // Avoid page refresh for better User Experience.
        e.preventDefault();

        // Check the validity of URL before calling the API.
        try {
            new URL(url)

            // Setting submittedOnce true to start/keep displaying Result component once a valid URL is submitted.
            if (!submittedOnce) setSubmittedOnce(true);

            // Remove any previously displayed errors
            setError(null);
        }
        // In case of invalid URL, display error and return nothing.
        catch (err) {

            // Display the error indicating invalid URL
            setError(`${url} is invalid URL!`)

            // Setting submittedOnce true to start/keep displaying Widget component with appropriate errors.
            setSubmittedOnce(false);

            // (When scaling the project, custom error codes can be returned here for easy error handling)
            return null;
        }
        
        /* Since our API required removal of any prefixes from the URL, appropriate pre-fixes are removed conditionally
            Something like https://www.stackoverflow.com will now become stackoverflow.com */
        if (url.startsWith('https://')) {
            const newURL = url.slice('https://'.length);
            if (newURL.startsWith('www.')) setURL(newURL.slice('www.'.length));
            else setURL(newURL);
        }
        else if (url.startsWith('http://')) {
            const newURL = url.slice('http://'.length);
            if (newURL.startsWith('www.')) setURL(newURL.slice('www.'.length));
            else setURL(newURL);
        }
        else if (url.startsWith('www.')) setURL(url.slice('www.'.length));
           
        
        /* The API documntation requires us to first post a task using POST request 
            API Documentation: 'https://docs.dataforseo.com/v3/auth'.

            On receiving the unique id of our task in the response, we can include it in header and call other APIs to as per our requirement.
            As per our requirement, we need to call OnPage API route for obtaining SEO statistics for the page entered by the user.
            OnPage API Documentation: 'https://docs.dataforseo.com/v3/on_page/overview' 
            
            Using Sandbox version of the API which will always return same response irrespective of URL, handy for development and testing*/

        // Calling the API to post Task. */  
        fetch("https://sandbox.dataforseo.com/v3/on_page/task_post", {
            headers : {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": authHeader
            },
            method: "POST",
            body: JSON.stringify([
                {
                    target: url,
                    load_resources: true,
                    enable_javascript: true,
                    max_crawl_pages: 1
                }
            ])
        })
        .then(response => response.json())
        .then(data => {

            // Validating success based on Status Code returned by the API. An extensive list of respective status codes is available at 'https://docs_v3.dataforseo.com/v3/appendix-errors/' 
            if (data.status_code === 20000) {

                // Extracting the unique id for our task which would be used for further API calls
                const id = data.tasks[0].id;

                // Calling onPage API only after we've successfully registered a task and received it's unique id.
                fetch("https://sandbox.dataforseo.com/v3/on_page/pages", {
                    headers : {
                        "Content-type": "application/json; charset=UTF-8",
                        "Authorization": authHeader
                    },
                    method: "POST",
                    body: JSON.stringify([
                        {
                            id: id,
                            target: url,
                            limit: 1,
                            load_resources: true,
                            enable_javascript: true,
                            max_crawl_pages: 1
                        }
                    ])
                }).then(response => response.json())
                .then(newData => {

                    // Validationg response of child fetch based on Status Code  
                    if (newData.status_code === 20000) {

                        // Updating the receivedData state variable in the context with freshly received data corresponding to the entered URL
                        setReceivedData(newData);

                        // Emptying the input box for aesthetics and better user experience.
                        setURL('');  
                    }
                    else setError(`Error Fetching Data. API responded with Status Code ${data.status_code} while fetching On Page Results`) // Custom error messagge for failed inner fetch
                })
            }
            else setError(`Error Fetching Data. API responded with Status Code ${data.status_code} while posting Task`) // Custom error message for failed outer fetch
        })
    }

    return (
        <div className="text-center p-4 pb-2">
            <form onSubmit={handleSubmit} className="sm:flex justify-center">
                <div className="mb-4 w-full">
                    <input
                    type="text"
                    placeholder="Enter complete URL (including http(s) and www) to check SEO stats"
                    onChange={(e) => setURL(e.target.value) /* Updating the url state variable every time user changes the input. */}
                    value={url /* Value of the input will always be same as url state va=riable. */}
                    required
                    className="bg-white w-full rounded-lg p-2 border text-custom-sea-green border-custom-white focus:border-custom-white focus:outline-none autofocus"
                    />
                </div>
                <div className="md:pl-4 mb-4">
                    <button
                    type="submit"
                    className="bg-custom-white hover:bg-custom-sea-green text-custom-sea-green hover:font-medium hover:text-custom-white rounded-md py-2 px-4 transition duration-300 ease-in-out"
                    >
                        Check
                    </button>
                </div>
            </form>
            {/* Error message is displayed conditionally based on its presence */
            error && 
            <p className='text-xl font-semibold text-custom-sea-green pl-2 text-start'>
                Error: <span className="text-red-600">{error}</span>
            </p>}
        </div>
    )
} 

export default Form;