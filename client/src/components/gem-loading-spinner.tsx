import { motion } from "framer-motion";

interface GemLoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function GemLoadingSpinner({ size = "md", className = "" }: GemLoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16", 
    lg: "w-24 h-24"
  };

  const gemVariants = {
    rotate: {
      rotate: 360,
      scale: [1, 1.1, 1],
      transition: {
        rotate: {
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        },
        scale: {
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }
    }
  };

  const sparkleVariants = {
    animate: {
      opacity: [0, 1, 0],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Main rotating gem */}
      <motion.div
        className={`${sizeClasses[size]} relative`}
        variants={gemVariants}
        animate="rotate"
      >
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="loadingGem" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e3f2fd" />
              <stop offset="50%" stopColor="#2196f3" />
              <stop offset="100%" stopColor="#0d47a1" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Diamond shape */}
          <polygon 
            points="60,15 95,45 85,65 35,65 25,45" 
            fill="url(#loadingGem)" 
            stroke="#1976d2" 
            strokeWidth="2"
            filter="url(#glow)"
          />
          
          {/* Inner facets */}
          <polygon points="45,35 75,35 80,50 70,55 50,55 40,50" fill="#bbdefb" opacity="0.8"/>
          <path d="M60 15 L60 35" stroke="#0d47a1" strokeWidth="1"/>
          <path d="M25 45 L60 50 L95 45" stroke="#0d47a1" strokeWidth="1"/>
        </svg>
      </motion.div>

      {/* Sparkle effects */}
      <motion.div
        className="absolute inset-0"
        variants={sparkleVariants}
        animate="animate"
      >
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              top: `${20 + (i * 10)}%`,
              left: `${15 + (i * 12)}%`,
            }}
            variants={{
              animate: {
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                transition: {
                  delay: i * 0.1,
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        ))}
      </motion.div>

      {/* Rotating ring */}
      <motion.div
        className={`absolute ${sizeClasses[size]} border-2 border-primary/30 rounded-full`}
        animate={{
          rotate: -360,
          transition: {
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />
    </div>
  );
}

export function GemLoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex items-center justify-center">
      <div className="text-center">
        <GemLoadingSpinner size="lg" className="mb-6" />
        <motion.h2 
          className="text-2xl font-semibold text-foreground mb-2"
          animate={{
            opacity: [0.5, 1, 0.5],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          Loading Gemstone Data
        </motion.h2>
        <motion.p 
          className="text-muted-foreground"
          animate={{
            opacity: [0.3, 0.7, 0.3],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }
          }}
        >
          Analyzing crystalline structures...
        </motion.p>
      </div>
    </div>
  );
}