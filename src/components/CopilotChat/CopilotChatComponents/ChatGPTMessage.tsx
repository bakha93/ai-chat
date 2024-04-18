import { InteractionIcons } from "@/components/CopilotChat/CopilotChatComponents/InteractionIcons.tsx";
import { parseChatGPTResponseByParagraph } from "@/utils/parseChatGPTResponseByParagraph.ts";
import styles from './copilotChat.module.css'


export const ChatGptMessage = ({ message, messageIndex }: { message: string, messageIndex: number }) => {
  const parsedMessage = parseChatGPTResponseByParagraph(message ?? "");
  return (
    <div className={styles.chatMessage}>
      {parsedMessage.map((el, i) => (
        <p key={i}>{el.text}</p>
      ))}
      <InteractionIcons content={message} messageIndex={messageIndex} />
    </div>
  );
};
