import * as React from "react";
import { InterviewStage } from "@/lib/interviewStages";
import { motion } from "motion/react";
import { CheckCircle2, CircleDashed, Hourglass } from "lucide-react";
import { cn } from "@/lib/utils";

interface StageProgressBarProps {
  stages: InterviewStage[];
  currentStage: InterviewStage;
  completedStages: InterviewStage[];
}

export function StageProgressBar({ stages, currentStage, completedStages }: StageProgressBarProps) {
  
  const getStageLabel = (stage: InterviewStage) => {
    switch (stage) {
      case "intro": return "Intro";
      case "main": return "HR Questions";
      case "closing": return "Q&A";
    }
  };

  const getStageIcon = (stage: InterviewStage) => {
    if (completedStages.includes(stage)) {
      return <CheckCircle2 size={14} className="text-accent" />;
    }
    if (currentStage === stage) {
      return <CircleDashed size={14} className="text-primary animate-spin" />;
    }
    return <Hourglass size={14} className="text-text-muted" />;
  };

  return (
    <div className="w-full flex justify-center py-3 border-b border-border/50 glass z-30 sticky top-20 shadow-sm overflow-y-hidden">
      <div className="flex items-center gap-2 md:gap-4 px-4 overflow-x-auto overflow-y-hidden w-full max-w-3xl no-scrollbar justify-center">
        {stages.map((stage, index) => {
          const isCompleted = completedStages.includes(stage);
          const isActive = currentStage === stage;
          
          return (
            <React.Fragment key={stage}>
              {/* Stage Pill */}
              <motion.div 
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-medium whitespace-nowrap transition-colors duration-300",
                  isCompleted ? "border-accent/30 bg-accent/5 text-text" : 
                  isActive ? "border-primary/50 bg-primary/10 text-primary shadow-[0_0_15px_rgba(99,102,241,0.15)]" : 
                  "border-border/50 bg-surface text-text-muted"
                )}
                animate={{
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{ duration: 0.2 }}
              >
                {getStageLabel(stage)}
                <span className="ml-1 flex items-center justify-center">
                  {getStageIcon(stage)}
                </span>
              </motion.div>

              {/* Connecting Line */}
              {index < stages.length - 1 && (
                <div className="w-4 md:w-8 h-[1px] bg-border/50 shrink-0 relative overflow-hidden">
                   {isCompleted && (
                     <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        className="absolute left-0 top-0 h-full bg-accent/50" 
                     />
                   )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
