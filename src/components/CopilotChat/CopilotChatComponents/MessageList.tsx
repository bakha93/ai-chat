import { useChatStore } from "@/components/CopilotChat/store.ts";
import { UserMessage } from "@/components/CopilotChat/CopilotChatComponents/UserMessage.tsx";
import { ChatGptMessage } from "@/components/CopilotChat/CopilotChatComponents/ChatGPTMessage.tsx";
import textingGif from "@/assets/typing-texting.gif";
import styles from './copilotChat.module.css'

export const MessageList = () => {
  const messages = useChatStore((state) => state.messages);
  const isMessageLoading = useChatStore((state) => state.isMessageLoading);

  return (
    <div className={styles.messageList}>
      {messages.map((message, index) => {
        if (message.role === "user") {
          return (
            <UserMessage
              key={message.content ?? "" + index}
              message={message.content ?? ""}
            />
          );
        } else {
          return (
            <ChatGptMessage
              key={message.content ?? "" + index}
              message={message.content ?? ""}
              messageIndex={index}
            />
          );
        }
      })}
      {isMessageLoading && (
        <img className={styles.loadingImage} src={textingGif} alt={"..."} />
      )}
    </div>
  );
};
