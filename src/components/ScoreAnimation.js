export const ScoreAnimation = ({ score }) => (
    <div className="relative">
      <span className="absolute -top-8 right-0 text-2xl font-bold text-yellow-500 animate-bounce">
        +{Math.round(score)}
      </span>
    </div>
  );
  