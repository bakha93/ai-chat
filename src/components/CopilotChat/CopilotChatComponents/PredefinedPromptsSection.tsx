import {
  DefineStrategyButtons,
  MarketingResearchButtons,
  RiskAssessmentButtons,
} from "@/constants";
import { Button } from "@/components/common/Button.tsx";
import { DividerHorizontal } from "@/components/common/DividerHorizontal.tsx";
import { useChatStore } from "@/components/CopilotChat/store.ts";
import styles from "./copilotChat.module.css";
import { ChatMessage } from "openai-fetch";
import { useChatGPTQueryWithLoading } from "@/api";

export const PredefinedPromptsSection = () => {
  const setMessage = useChatStore((state) => state.setMessage);
  const { inputMessage } = useChatGPTQueryWithLoading(setMessage);

  const handleButtonClick = (text: string) => {
    const newUserMessage: ChatMessage = { role: "user", content: text };
    setMessage(newUserMessage);
    inputMessage([newUserMessage]);
  };

  return (
    <div className={styles.predefinedWrapper}>
      <div className={styles.subtitle}>Define Strategy</div>
      <div className={styles.section}>
        {DefineStrategyButtons.map((text) => (
          <Button key={text} onClick={() => handleButtonClick(text)}>
            {text}
          </Button>
        ))}
      </div>
      <DividerHorizontal />
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Marketing research</div>
        {MarketingResearchButtons.map((text) => (
          <Button key={text} onClick={() => handleButtonClick(text)}>
            {text}
          </Button>
        ))}
      </div>
      <DividerHorizontal />
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Risk Assessment</div>
        {RiskAssessmentButtons.map((text) => (
          <Button key={text} onClick={() => handleButtonClick(text)}>
            {text}
          </Button>
        ))}
      </div>
      <DividerHorizontal />
    </div>
  );
};
