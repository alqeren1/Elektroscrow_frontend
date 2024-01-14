const ErrorDisplay = ({ errorMessage }) => {
    if (!errorMessage) return null // Don't render if there's no error

    return (
        <div className="px-1 w-full flex justify-center">
            <div className="flex justify-center items-center bg-red-200 w-[480px]  rounded-2xl">
                <div className="py-4 px-4 font-base text-gray-700">{errorMessage}</div>
            </div>
        </div>
    )
}

export default ErrorDisplay
