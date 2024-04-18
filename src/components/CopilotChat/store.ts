import { create } from "zustand";
import { ChatMessage } from "openai-fetch";
import { FEEDBACK_ACTIONS } from "@/constants";

interface IChatStore {
  messages: ChatMessage[];
  setMessage: (message: ChatMessage) => void;
  isMessageLoading: boolean;
  setMessageLoading: (isLoading: boolean) => void;
  removeLastMessage: () => void;
  likedIndices: number[];
  dislikedIndices: number[];
  setFeedbackIndex: (action: FEEDBACK_ACTIONS, indices: number[]) => void;
}

export const useChatStore = create<IChatStore>((set) => ({
  messages: [],
  likedIndices: [],
  dislikedIndices: [],
  setMessage: (message) => {
    set((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  },
  isMessageLoading: false,
  setMessageLoading: (isLoading) => {
    set((prev) => ({ ...prev, isMessageLoading: isLoading }));
  },
  removeLastMessage: () => {
    set((prev) => ({
      ...prev,
      messages: [
        ...prev.messages.filter((_, i) => i !== prev.messages.length - 1),
      ],
    }));
  },
  setFeedbackIndex: (action, indices) => {
    set((prev) => {
      if (action === FEEDBACK_ACTIONS.LIKE) {
        debugger
        return { ...prev, likedIndices: [...indices] };
      } else if (action === FEEDBACK_ACTIONS.DISLIKE) {
        return { ...prev, dislikedIndices: [...indices] };
      } else {
        return { ...prev };
      }
    });
  },
}));
