import Widget from './Widget';
import { useSEOCheckerContext } from  './context/SEOCheckerContext';

function ScoreDisplay (props) {
    const { enteredURL } = useSEOCheckerContext();
    return (
        <div className={"md:flex bg-custom-sky-blue rounded-lg p-6 items-center gap-4 py-8"}>
            <div className="flex-grow flex flex-col self-end"> 
            <Widget />
                <div className="flex justify-center items-center mb-4">
                    <div className="max-w-3xl w-full p-6 bg-white rounded-lg shadow-lg">
                        <p className='text-2xl font-semibold text-custom-sea-green border-b-2 border-gray-300 pb-2'>
                            Results for: <span className="text-custom-sky-blue">{enteredURL}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-md md:ml-4 p-4 m-4 bg-white rounded-lg shadow-lg self-baseline">
                <div className="mb-4 text-center">
                    <div className={`radial-progress mx-auto text-2xl my-2 ${props.score > 75 ? "text-green-800" : props.score > 50 ? "text-green-400" : props.score > 25 ? "text-orange-600" : "text-red-700"}`} style={{"--value": props.score, "--size": "10rem", "--thickness": "1.4rem" }}>{props.score}</div>
                </div>
                <div className="bg-gray-100 p-4">
                    <h2 className="text-darkgray font-semibold text-xl pb-1">OnPage Score</h2>
                    <hr></hr>
                    <p className="text-gray-600 pt-2">{props.score}</p>
                </div>
                <p className="text-xs italic text-gray-400 pt-2">shows how your page is optimized on a 100-point scale</p>
            </div>
        </div>
        
    )
}

export default ScoreDisplay;