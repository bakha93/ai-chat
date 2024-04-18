import { InputField } from "@/components/common/InputField.tsx";
import { ChangeEvent, useState } from "react";
import { useChatGPTQueryWithLoading } from "@/api";
import { useChatStore } from "@/components/CopilotChat/store.ts";
import { ChatMessage } from "openai-fetch";
import styles from "./copilotChat.module.css";

const MessageInput = () => {
  const setMessage = useChatStore((state) => state.setMessage);
  const messages = useChatStore((state) => state.messages);
  const [value, setValue] = useState("");

  const { inputMessage } = useChatGPTQueryWithLoading(setMessage);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleEnterPress = () => {
    const newUserMessage: ChatMessage = { role: "user", content: value };
    setMessage(newUserMessage);
    inputMessage([...messages, newUserMessage]);
    setValue("");
  };

  return (
    <div className={styles.messageInput}>
      <InputField
        value={value}
        placeholder="Enter a prompt"
        onChange={handleChange}
        type="text"
        onEnterPress={handleEnterPress}
      />
    </div>
  );
};

export default MessageInput;
