function DetailedDisplay (props) {
    return (
        <div className="lg:flex gap-y-8 md:gap-x-12 md:m-8 mt-8 mb-4">

            {/* Rendering as flex with first item being how site's meta link are displayed on internet and second item displaying collection of og tags */}
            <div className="max-w-md mx-auto lg:ml-4 p-4 m-4 bg-white rounded-lg shadow-lg self-baseline">
                <div className="mb-4">
                    <img src={props.parameters['Image URL']} alt="Website Preview" className="w-full rounded-lg" />
                </div>
                <div className="bg-gray-100 p-4">
                    <p className="text-gray-600 pb-1">{props.parameters['URL']}</p>
                    <hr></hr>
                    <h2 className="text-xl font-semibold m-2 ml-1">{props.parameters['Title']}</h2>
                    <p className="text-gray-800 ml-1">{props.parameters['Description']}</p>
                </div>
                <p className="text-xs italic text-gray-400 pt-2">This is how your website is displayed on search engines and social media</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-2">
                {Object.entries(props.parameters).map(([key, value], i) => (
                <div key={i} className="flex-col bg-white rounded-md p-2 m-2 text-center shadow-lg items-center">
                    <div className='bg-custom-white rounded-lg p-4 flex items-center'>
                        <div className='font-semibold text-md text-custom-sea-green'>{key}</div>
                    </div>
                    <div className='mx-2 text-left p-2 pl-0 text-custom-sea-green'>{value}</div>
                </div>
                ))}
            </div> 
            
        </div>
    )
}

export default DetailedDisplay;