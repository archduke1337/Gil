import { motion } from "framer-motion";
import logoPath from "@assets/1000119055-removebg-preview.png";
import { memo } from "react";

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
      {/* Main rotating GIL logo */}
      <motion.div
        className={`${sizeClasses[size]} relative`}
        variants={gemVariants}
        animate="rotate"
      >
        <img 
          src={logoPath} 
          alt="GIL Logo" 
          className="w-full h-full object-contain"
        />
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
          Loading GIL Database
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
          Accessing gemological certification data...
        </motion.p>
      </div>
    </div>
  );
}