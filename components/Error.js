const ErrorDisplay = ({ errorMessage }) => {
    if (!errorMessage) return null // Don't render if there's no error

    return (
        <div className="px-1 w-full flex justify-center">
            <div className="relative items-center bg-red-200 w-[480px] overflow-hidden rounded-2xl">
                <div className="absolute   w-[480px] h-1  ">
                    <div className="time-bar h-full bg-red-400 "></div>
                </div>

                <div className="flex justify-center">
                    <div
                        style={{ fontFamily: "'Franklin Gothic', sans-serif" }}
                        className="py-4 px-4 font-base text-gray-700  text-opacity-80"
                    >
                        {errorMessage}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorDisplay
