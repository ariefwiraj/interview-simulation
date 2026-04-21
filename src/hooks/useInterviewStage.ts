import { useState, useEffect, useMemo } from 'react';
import { getStageConfig, InterviewStage } from '@/lib/interviewStages';

export function useInterviewStage(duration: number, messageCount: number, secondsLeft: number) {
  const [currentStage, setCurrentStage] = useState<InterviewStage>("intro");
  
  // Get stage config for the specific duration
  const allStagesConfig = useMemo(() => getStageConfig(duration), [duration]);
  
  useEffect(() => {
    // Basic logic for transitioning stages based on text-mode MVP constraints
    // Intro -> Main: transitions after intro exchange (e.g., 2 user messages)
    // Main -> Closing: transitions when time is running out (e.g., <= 5 minutes or according to duration proportion)
    
    // Determine the closing threshold in seconds
    let closingThresholdSecs = 60; // 1 min fallback
    if (duration === 10) closingThresholdSecs = 2 * 60; // 1-2 min closing
    else if (duration === 15) closingThresholdSecs = 3 * 60; // 3 min closing
    else if (duration === 20) closingThresholdSecs = 4 * 60; // 3-4 min closing
    else if (duration === 30) closingThresholdSecs = 5 * 60; // 4-5 min closing
    
    // user message count is roughly half the total messages since it's user-ai-user-ai...
    // messageCount typically includes ai messages too, so if we track just total messages:
    // User intro would be at index 2 (AI, User, AI). Or if we pass userMessageCount specifically:
    
    if (secondsLeft <= closingThresholdSecs && secondsLeft > 0) {
      setCurrentStage("closing");
    } else if (messageCount >= 2 && currentStage === "intro") {
      // Assuming 1 user message fulfills the intro stage in this MVP
      setCurrentStage("main");
    }
  }, [messageCount, secondsLeft, duration, currentStage]);

  const stages: InterviewStage[] = ["intro", "main", "closing"];
  
  const completedStages = useMemo((): InterviewStage[] => {
    if (currentStage === "intro") return [];
    if (currentStage === "main") return ["intro"];
    return ["intro", "main"];
  }, [currentStage]);

  return {
    currentStage,
    stageConfig: allStagesConfig[currentStage],
    stages,
    completedStages
  };
}
