export const Confetti = () => (
    <div className="fixed inset-0 pointer-events-none bg-black">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: ['#FFD700', '#FF69B4', '#00FF00', '#FF4500'][Math.floor(Math.random() * 4)]
          }}
        />
      ))}
    </div>
  );