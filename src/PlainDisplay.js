function PlainDisplay (props) {

    // Find the widest value just for aesthetic design.
    const maxWidth = Math.max(...Object.values(props.parameters).map(value => value.length));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8 md:m-4 md:mt-8 mt-8 mb-4">
            {/* Simply every key of props.parameters is diplayed with it's value (i.e. parameter name and value) in form of a grid. */}
            {Object.entries(props.parameters).map(([key, value], i) => (
            <div key={i} className="flex bg-white rounded-md p-2 m-2 text-center items-center shadow-lg">
                <div style={{ width: `${maxWidth * 18}px` }} className='bg-custom-white rounded-lg p-4 flex items-center'>
                    <p className='font-bold text-lg mx-auto self-center'>{value}</p>
                </div>
                <div className='ml-2 text-custom-sea-green text-left'>{key}</div>
            </div>
            ))}
        </div>
    )
}

export default PlainDisplay;