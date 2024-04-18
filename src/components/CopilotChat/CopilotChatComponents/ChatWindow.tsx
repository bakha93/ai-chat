import MessageInput from "@/components/CopilotChat/CopilotChatComponents/MessageInput.tsx";
import { useChatStore } from "@/components/CopilotChat/store.ts";
import { PredefinedPromptsSection } from "@/components/CopilotChat/CopilotChatComponents/PredefinedPromptsSection.tsx";
import styles from './copilotChat.module.css'
import {MessageList} from "@/components/CopilotChat/CopilotChatComponents/MessageList.tsx";

export const ChatWindow = () => {
  const messages = useChatStore((state) => state.messages);

  return (
    <div className={styles.chatWindow}>
      <h1 className={styles.title}>
        Financial Copilot Chat
      </h1>
      {!messages.length ? <PredefinedPromptsSection /> : <MessageList/>}
      <div className={styles.messageInputWrapper}>
        <MessageInput />
      </div>
    </div>
  );
};
