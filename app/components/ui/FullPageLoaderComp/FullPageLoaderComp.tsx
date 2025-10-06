import React, { useState, useEffect } from "react";

const ImagePuzzleLoader = () => {
  const [progress, setProgress] = useState(0);
  const [revealedPieces, setRevealedPieces] = useState(new Set());
  const [isComplete, setIsComplete] = useState(false);

  // Sample image URL - replace with your actual puzzle image
  const puzzleImage =
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop";

  // Deterministic particle positions to avoid hydration mismatch
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: (i * 37 + 23) % 100,
    top: (i * 47 + 13) % 100,
    delay: (i * 0.2) % 3,
    duration: 1 + (i % 3) * 0.5,
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 2; // Increased from 1.5 to 2 for faster completion

        // Reveal pieces progressively
        const totalPieces = 16;
        const piecesToReveal = Math.floor((newProgress / 100) * totalPieces);
        const newRevealed = new Set();

        for (let i = 0; i < piecesToReveal; i++) {
          newRevealed.add(i);
        }
        setRevealedPieces(newRevealed);

        if (newProgress >= 100) {
          setIsComplete(true);
          return 100;
        }
        return newProgress;
      });
    }, 100); // Reduced from 120ms to 100ms for faster updates

    return () => clearInterval(timer);
  }, []);

  // Create 4x4 grid of puzzle pieces
  const createPuzzlePieces = () => {
    const pieces = [];
    const gridSize = 4;
    const pieceSize = 80;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const pieceIndex = row * gridSize + col;
        const isRevealed = revealedPieces.has(pieceIndex);

        pieces.push(
          <div
            key={pieceIndex}
            className={`absolute border-2 border-white/30 transition-all duration-800 ease-out transform ${
              isRevealed
                ? "opacity-100 scale-100 rotate-0"
                : "opacity-0 scale-90 rotate-12"
            }`}
            style={{
              width: `${pieceSize}px`,
              height: `${pieceSize}px`,
              left: `${col * pieceSize}px`,
              top: `${row * pieceSize}px`,
              backgroundImage: `url(${puzzleImage})`,
              backgroundSize: `${gridSize * pieceSize}px ${gridSize * pieceSize}px`,
              backgroundPosition: `-${col * pieceSize}px -${row * pieceSize}px`,
              filter: isRevealed ? "none" : "blur(2px)",
              animationDelay: `${pieceIndex * 0.1}s`,
            }}
          >
            {/* Puzzle piece shape overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>

            {/* Piece number indicator */}
            {!isRevealed && (
              <div className="absolute inset-0 bg-gray-800/80 flex items-center justify-center">
                <div className="w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
              </div>
            )}

            {/* Reveal animation effect */}
            {isRevealed && (
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 animate-pulse opacity-50"></div>
            )}
          </div>
        );
      }
    }
    return pieces;
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white opacity-20 rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center">
        {/* Main puzzle container */}
        <div className="relative mb-8">
          <div
            className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 shadow-2xl"
            style={{ width: "360px", height: "360px" }}
          >
            {/* Puzzle grid container */}
            <div className="relative w-80 h-80 mx-auto">
              {createPuzzlePieces()}

              {/* Grid overlay */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`h-${i}`}
                    className="absolute w-full h-px bg-white/10"
                    style={{ top: `${i * 80}px` }}
                  />
                ))}
                {[...Array(5)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute h-full w-px bg-white/10"
                    style={{ left: `${i * 80}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Loading interface */}
        <div className="text-center">
          {/* Title with typewriter effect */}
          <h2 className="text-3xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {isComplete ? "Puzzle Complete!" : "Assembling Image Puzzle"}
            </span>
          </h2>

          {/* Piece counter */}
          <div className="text-lg text-gray-300 mb-4">
            Pieces Revealed: {revealedPieces.size}/16
          </div>

          {/* Progress percentage */}
          <div className="text-2xl font-mono text-cyan-400 mb-6">
            {Math.round(progress)}%
          </div>

          {/* Progress bar with pieces indicator */}
          <div className="w-80 h-3 bg-gray-700 rounded-full mx-auto mb-6 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
            {/* Piece markers on progress bar */}
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`absolute top-0 w-px h-full ${
                  revealedPieces.has(i) ? "bg-white/60" : "bg-white/20"
                } transition-colors duration-300`}
                style={{ left: `${(i / 16) * 100}%` }}
              />
            ))}
          </div>

          {/* Loading status text */}
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <svg
              className="w-5 h-5 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="text-sm">
              {isComplete ? "Ready to play!" : "Loading puzzle pieces..."}
            </span>
          </div>

          {/* Animated dots */}
          {!isComplete && (
            <div className="flex justify-center space-x-2 mt-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Success burst effect */}
        {isComplete && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-ping"
                style={{
                  left: `${50 + Math.cos((i * 30 * Math.PI) / 180) * 20}%`,
                  top: `${50 + Math.sin((i * 30 * Math.PI) / 180) * 20}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePuzzleLoader;
