export const ProgressBar = ({ progress }) => (
    <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
      <div className="absolute top-0 left-0 w-full h-full opacity-25">
        <div className="animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent h-full w-1/2" />
      </div>
    </div>
  );