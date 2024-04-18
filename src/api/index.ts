import { useMutation, UseMutationResult } from "react-query";
import { MODEL } from "@/constants";

import { ChatMessage, ChatResponse, OpenAIClient } from "openai-fetch";
import { useChatStore } from "@/components/CopilotChat/store.ts";

const client = new OpenAIClient({ apiKey: import.meta.env.VITE_API_KEY });

const useChatGPTQuery = (
  onSuccess: (message: ChatMessage) => void,
  onMutate: () => void,
): UseMutationResult<ChatResponse, unknown, ChatMessage[], unknown> => {
  return useMutation(
    async (messages: ChatMessage[]) => {
      return await client.createChatCompletion({
        model: MODEL,
        messages,
      });
    },
    {
      onMutate,
      onSuccess: (data) => {
        onSuccess(data.choices[0].message);
      },
    },
  );
};

export const useChatGPTQueryWithLoading = (
  onSuccess: (message: ChatMessage) => void,
) => {
  const setMessageLoading = useChatStore((state) => state.setMessageLoading);
  const onQuerySuccess = (message: ChatMessage) => {
    onSuccess(message);
    setMessageLoading(false);
  };

  const onMutate = () => {
    setMessageLoading(true);
  };

  const { mutate: inputMessage } = useChatGPTQuery(onQuerySuccess, onMutate);

  return {
    inputMessage,
  };
};

export const useRegenerateLastMessageQuery = (
  onSuccess: (message: ChatMessage) => void,
) => {
  const removeLastMessage = useChatStore((state) => state.removeLastMessage);
  const setMessageLoading = useChatStore((state) => state.setMessageLoading);
  const onQuerySuccess = (message: ChatMessage) => {
    onSuccess(message);
    setMessageLoading(false);
  };

  const onMutate = () => {
    removeLastMessage();
    setMessageLoading(true);
  };

  const { mutate: inputMessage } = useChatGPTQuery(onQuerySuccess, onMutate);

  return {
    inputMessage,
  };
};
