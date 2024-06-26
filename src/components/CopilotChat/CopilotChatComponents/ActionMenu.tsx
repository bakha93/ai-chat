import ShorterIcon from "@/assets/SvgIcons/ShorterIcon.tsx";
import LongerIcon from "@/assets/SvgIcons/LongerIcon.tsx";
import SimplerIcon from "@/assets/SvgIcons/SimplerIcon.tsx";
import CasualIcon from "@/assets/SvgIcons/CasualIcon.tsx";
import Professional from "@/assets/SvgIcons/Professional.tsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRegenerateLastMessageQuery } from "@/api";
import { useChatStore } from "@/components/CopilotChat/store.ts";
import { ChatMessage } from "openai-fetch";
import styles from "./copilotChat.module.css";

const MENU_ITEMS = [
  {
    icon: <ShorterIcon />,
    text: "Shorter",
    regenerateAction: "Make next text shorter:",
  },
  {
    icon: <LongerIcon />,
    text: "Longer",
    regenerateAction: "Make next text longer:",
  },
  {
    icon: <SimplerIcon />,
    text: "Simpler",
    regenerateAction: "Make next text more simpler:",
  },
  {
    icon: <CasualIcon />,
    text: "Casual",
    regenerateAction: "Make next text more casual:",
  },
  {
    icon: <Professional />,
    text: "Professional",
    regenerateAction: "Make next text more professional:",
  },
];

type Props = {
  handleCloseMenu: () => void;
};

export const ActionMenu = ({ handleCloseMenu }: Props) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const setMessage = useChatStore((state) => state.setMessage);
  const messages = useChatStore((state) => state.messages);
  const [modalPosition, setModalPosition] = useState('')

  const { inputMessage } = useRegenerateLastMessageQuery(setMessage);

  const handleMenuActionClick = (regenerateAction: string) => {
    const lastMessage = messages.find(
      (_, index) => index === messages.length - 1,
    );
    const newUserMessage: ChatMessage = {
      role: "user",
      content: `${regenerateAction} ${lastMessage?.content ?? ""}`,
    };
    inputMessage([newUserMessage]);
  };

  const handleClickOutside = (event: any) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      handleCloseMenu();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useLayoutEffect(() => {
    if(menuRef.current){
      const shouldDisplayOnTop = menuRef.current?.getBoundingClientRect().bottom + 100 > window.innerHeight;
      setModalPosition(!shouldDisplayOnTop ? 'top-0' : 'bottom-0')
    }
  },[])


  return (
    <div ref={menuRef} className={`${styles.actionMenu} ${modalPosition}`}>
      <div className={styles.actionMenuModify}>Modify:</div>
      {MENU_ITEMS.map((el) => (
        <div
          key={el.text}
          onClick={() => {
            handleMenuActionClick(el.regenerateAction);
          }}
          className={styles.actionMenuItem}
        >
          <div>{el.icon}</div>
          <div>{el.text}</div>
        </div>
      ))}
    </div>
  );
};
