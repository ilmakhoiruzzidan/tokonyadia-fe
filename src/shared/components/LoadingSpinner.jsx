function LoadingSpinner() {
    return (
        <div className="min-w-full h-[calc(100dvh-400px)] grid place-items-center">
            <span className="loading loading-spinner loading-lg text-blue-800"></span>
        </div>
    );
}

export default LoadingSpinner;