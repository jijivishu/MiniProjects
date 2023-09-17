function NestedDisplay (props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12 mt-8 md:m-8 mb-4">

            {/* props.parameters is an object whose keys are 'header tag - type' and values are array of those respective headers */}
            {Object.entries(props.parameters).map(([key, headerSize], i) => (
            <div key={i} className="flex flex-col bg-white rounded-md p-8 m-2 shadow-lg ">
                <div className='font-bold text-lg text-custom-sky-blue'>{headerSize.length} {key}</div>
                {headerSize.map((header, j) => (
                    <ul className="mt-2 list-disc list-inside">
                        <li key={j} className="p-2 text-custom-sea-green">{header}</li>
                    </ul> 
                ))}
            </div>
            ))}
        </div>
    )
}

export default NestedDisplay;