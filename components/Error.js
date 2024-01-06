const ErrorDisplay = ({ errorMessage }) => {
    if (!errorMessage) return null // Don't render if there's no error

    return (
        <div className="flex justify-center items-center bg-red-200 w-[480px] rounded-3xl">
            <div className="py-5 font-medium text-gray-700">Error occured</div>
        </div>
    )
}

export default ErrorDisplay
