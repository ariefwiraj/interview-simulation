import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, Info, Target, Clock, ClipboardList } from "lucide-react";
import { StageConfig, InterviewStage } from "@/lib/interviewStages";
import { cn } from "@/lib/utils";

interface HintBoxProps {
  stageConfig: StageConfig;
  currentStage: InterviewStage;
}

export function HintBox({ stageConfig, currentStage }: HintBoxProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  // Border colors based on stage
  const stageColors = {
    intro: "border-primary/50 text-primary bg-primary/10",
    main: "border-accent/50 text-accent bg-accent/10",
    closing: "border-warning/50 text-warning bg-warning/10"
  };

  const getBorderColor = () => {
    if (currentStage === "intro") return "border-primary/30";
    if (currentStage === "main") return "border-accent/30";
    if (currentStage === "closing") return "border-warning/30";
    return "border-border";
  };

  return (
    <div className={cn(
      "relative z-50 flex flex-col glass rounded-xl border transition-colors duration-300",
      getBorderColor()
    )}>
      {/* Header / Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-sm text-left hover:bg-surface-elevated/50 transition-colors rounded-xl cursor-pointer"
      >
        <ClipboardList size={16} className={currentStage === 'intro' ? 'text-primary' : currentStage === 'main' ? 'text-accent' : 'text-warning'} />
        <div className="flex flex-col">
          <span className="text-[10px] text-text-muted font-semibold uppercase tracking-wider hidden md:block">Sekarang</span>
          <span className="font-semibold text-text whitespace-nowrap">{stageConfig.label}</span>
        </div>
        <div className={cn(
          "ml-2 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center justify-center",
          stageColors[currentStage]
        )}>
          {currentStage}
        </div>
        {isExpanded ? <ChevronUp size={16} className="text-text-muted ml-1" /> : <ChevronDown size={16} className="text-text-muted ml-1" />}
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 md:left-0 mt-2 w-72 overflow-hidden glass rounded-xl border border-border shadow-xl origin-top"
          >
            <div className="p-4 space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Clock size={14} className="text-text-muted mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-xs text-text-muted">Estimasi verbal</span>
                    <span className="text-sm font-medium">{stageConfig.durationRange}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <Target size={14} className="text-text-muted mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-xs text-text-muted">Target text</span>
                    <span className="text-sm font-medium">{stageConfig.wordCountTarget}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-1.5 mb-2">
                  <Info size={14} className="text-text-muted" />
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Tips</span>
                </div>
                <ul className="space-y-1.5">
                  {stageConfig.tips.map((tip, i) => (
                    <li key={i} className="text-xs text-text flex items-start gap-1.5">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
