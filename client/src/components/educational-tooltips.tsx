import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, HelpCircle, Sparkles, Eye } from "lucide-react";

interface TooltipProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  className?: string;
}

export function EducationalTooltip({ 
  trigger, 
  content, 
  position = "top", 
  delay = 0,
  className = "" 
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2"
  };

  const arrowClasses = {
    top: "top-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-popover",
    bottom: "bottom-full left-1/2 transform -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-popover",
    left: "left-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-popover",
    right: "right-full top-1/2 transform -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-popover"
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-help"
      >
        {trigger}
      </motion.div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.2, 
              delay: delay / 1000,
              ease: "easeOut" 
            }}
            className={`absolute z-50 ${positionClasses[position]}`}
          >
            <div className="bg-popover border border-border rounded-lg shadow-lg p-3 max-w-xs">
              <div className="text-sm text-popover-foreground">
                {content}
              </div>
              {/* Arrow */}
              <div 
                className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface GemTermTooltipProps {
  term: string;
  children: React.ReactNode;
  className?: string;
}

export function GemTermTooltip({ term, children, className = "" }: GemTermTooltipProps) {
  const getTooltipContent = (termName: string) => {
    const terms: { [key: string]: React.ReactNode } = {
      "clarity": (
        <div className="space-y-2">
          <div className="font-semibold flex items-center gap-2">
            <Eye className="h-4 w-4 text-primary" />
            Clarity Grading
          </div>
          <p>Measures internal and external flaws:</p>
          <div className="text-xs space-y-1">
            <div><strong>FL:</strong> Flawless - No inclusions visible at 10x</div>
            <div><strong>IF:</strong> Internally Flawless - No internal flaws</div>
            <div><strong>VVS:</strong> Very Very Slightly Included</div>
            <div><strong>VS:</strong> Very Slightly Included</div>
            <div><strong>SI:</strong> Slightly Included</div>
            <div><strong>I:</strong> Included - Visible to naked eye</div>
          </div>
        </div>
      ),
      "cut": (
        <div className="space-y-2">
          <div className="font-semibold flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Cut Quality
          </div>
          <p>Determines brilliance and fire:</p>
          <div className="text-xs space-y-1">
            <div><strong>Excellent:</strong> Maximum brilliance and fire</div>
            <div><strong>Very Good:</strong> Superior light performance</div>
            <div><strong>Good:</strong> Good light return</div>
            <div><strong>Fair:</strong> Acceptable performance</div>
            <div><strong>Poor:</strong> Minimal light return</div>
          </div>
        </div>
      ),
      "carat": (
        <div className="space-y-2">
          <div className="font-semibold">Carat Weight</div>
          <p>Unit of measurement for gemstones:</p>
          <div className="text-xs space-y-1">
            <div>1 carat = 200 milligrams</div>
            <div>1 carat = 100 points</div>
            <div>Larger stones are exponentially rarer</div>
          </div>
        </div>
      ),
      "refractive index": (
        <div className="space-y-2">
          <div className="font-semibold">Refractive Index (RI)</div>
          <p>Measures how light bends through the gem:</p>
          <div className="text-xs space-y-1">
            <div>Diamond: 2.418 (very high)</div>
            <div>Emerald: 1.576-1.582</div>
            <div>Ruby/Sapphire: 1.762-1.770</div>
            <div>Higher RI = more brilliance</div>
          </div>
        </div>
      ),
      "inclusions": (
        <div className="space-y-2">
          <div className="font-semibold">Inclusions</div>
          <p>Internal characteristics within gems:</p>
          <div className="text-xs space-y-1">
            <div><strong>Crystals:</strong> Mineral inclusions</div>
            <div><strong>Feathers:</strong> Internal fractures</div>
            <div><strong>Clouds:</strong> Groups of tiny inclusions</div>
            <div><strong>Needles:</strong> Long, thin inclusions</div>
          </div>
        </div>
      ),
      "brilliance": (
        <div className="space-y-2">
          <div className="font-semibold">Brilliance</div>
          <p>White light returned to the eye:</p>
          <div className="text-xs space-y-1">
            <div>Depends on cut quality and proportions</div>
            <div>Table size affects brilliance</div>
            <div>Crown and pavilion angles critical</div>
          </div>
        </div>
      ),
      "fire": (
        <div className="space-y-2">
          <div className="font-semibold">Fire (Dispersion)</div>
          <p>Colored light flashes in a gem:</p>
          <div className="text-xs space-y-1">
            <div>Diamond has exceptional fire (0.044)</div>
            <div>Created by light splitting into colors</div>
            <div>Cut quality enhances fire display</div>
          </div>
        </div>
      ),
      "mohs scale": (
        <div className="space-y-2">
          <div className="font-semibold">Mohs Hardness Scale</div>
          <p>Relative scratch resistance (1-10):</p>
          <div className="text-xs space-y-1">
            <div>Diamond: 10 (hardest)</div>
            <div>Ruby/Sapphire: 9</div>
            <div>Emerald: 7.5-8</div>
            <div>Quartz: 7</div>
          </div>
        </div>
      )
    };

    return terms[termName.toLowerCase()] || (
      <div className="space-y-2">
        <div className="font-semibold capitalize">{termName}</div>
        <p>Gemological term requiring further study. Consult professional gemological resources.</p>
      </div>
    );
  };

  return (
    <EducationalTooltip
      trigger={
        <span className={`border-b border-dotted border-primary/60 cursor-help hover:border-primary transition-colors ${className}`}>
          {children}
        </span>
      }
      content={getTooltipContent(term)}
      delay={300}
    />
  );
}

interface InfoIconTooltipProps {
  content: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function InfoIconTooltip({ content, position = "top", className = "" }: InfoIconTooltipProps) {
  return (
    <EducationalTooltip
      trigger={
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="inline-flex"
        >
          <Info className={`h-4 w-4 text-muted-foreground hover:text-primary transition-colors cursor-help ${className}`} />
        </motion.div>
      }
      content={content}
      position={position}
      delay={200}
    />
  );
}

interface HelpButtonTooltipProps {
  content: React.ReactNode;
  className?: string;
}

export function HelpButtonTooltip({ content, className = "" }: HelpButtonTooltipProps) {
  return (
    <EducationalTooltip
      trigger={
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors ${className}`}
        >
          <HelpCircle className="h-4 w-4 text-primary" />
        </motion.button>
      }
      content={content}
      delay={100}
    />
  );
}