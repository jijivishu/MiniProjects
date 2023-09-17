function DetailedBooleanDisplay (props) {

    /*
     *  Green Tick image is displayed if parameter check returned a value that was in favor of SEO
     *  Red Warning image is displayed if parameter check returned value that was not in favor of SEO
     *  If parameter.value is true, it means the parameter check was in favor of SEO.
     *  On the same basis, the efefect of that parameter on website's SEO is displayed.
     */
    const greenTick = 'https://img.freepik.com/premium-vector/green-check-mark-icon-symbol-logo-circle-tick-symbol-green-color-vector-illustration_685751-503.jpg?w=740';
    const redWarning = 'https://media.istockphoto.com/id/1152189152/vector/red-alert-icon.jpg?s=612x612&w=0&k=20&c=Kw_-i314F4cxgn2hmakp-88-O45FSx62c6r-OzKYMw4=';
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12 mt-8 md:m-8 mb-4">
            {/* Render properties for plainDisplay type */}
            {Object.entries(props.parameters).map(([key, parameter], i) => (
            <div key={i} className="flex flex-col bg-white rounded-md p-2 m-2 text-center items-center shadow-lg">
                <div className='rounded-lg p-4 flex items-center max-h-20'>
                    <img src={parameter.value ? greenTick : redWarning} style={{ height: "100%" }}alt={parameter.value ? "Positive Response for" : "Negative Response for"}></img>
                    <div className='font-semibold text-lg ml-2 p-0 text-custom-sea-green'>{key}</div>
                </div>
                <div className='p-4 pt-2 text-custom-sea-green'>{parameter.value ? parameter.positiveImpact : parameter.negativeImpact}</div>
            </div>
            ))}
        </div>
    )
}

export default DetailedBooleanDisplay;