import { LikeIcon } from "@/assets/SvgIcons/LikeIcon.tsx";
import { DislikeIcon } from "@/assets/SvgIcons/DislikeIcon.tsx";
import { MenuActionIcon } from "@/assets/SvgIcons/MenuActionIcon.tsx";
import { CopyIcon } from "@/assets/SvgIcons/CopyIcon.tsx";
import { useCallback, useMemo, useState } from "react";
import { ActionMenu } from "@/components/CopilotChat/CopilotChatComponents/ActionMenu.tsx";
import styles from "./copilotChat.module.css";
import { useChatStore } from "@/components/CopilotChat/store.ts";
import { FEEDBACK_ACTIONS } from "@/constants";

export const InteractionIcons = ({
  content,
  messageIndex,
}: {
  content: string;
  messageIndex: number;
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const messages = useChatStore((state) => state.messages);
  const dislikedIndices = useChatStore((state) => state.dislikedIndices);
  const likedIndices = useChatStore((state) => state.likedIndices);
  const setFeedbackIndex = useChatStore((state) => state.setFeedbackIndex);

  const { isLiked, isDisliked } = useMemo(() => {
    const isDisliked = !!dislikedIndices.find((el) => el === messageIndex);
    const isLiked = !!likedIndices.find((el) => el === messageIndex);
    return { isLiked, isDisliked };
  }, [likedIndices, dislikedIndices]);

  const lastIndexMessage = messages.length - 1;

  const handleOpenMenu = useCallback(() => {
    setOpenMenu(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const handleFeedbackClick = (action: FEEDBACK_ACTIONS) => {
    const removeDislike = () =>
      setFeedbackIndex(
        FEEDBACK_ACTIONS.DISLIKE,
        dislikedIndices.filter((el) => el !== messageIndex),
      );

    const removeLike = () =>
      setFeedbackIndex(
        FEEDBACK_ACTIONS.LIKE,
        likedIndices.filter((el) => el !== messageIndex),
      );

    if (action === FEEDBACK_ACTIONS.LIKE) {
      if (isLiked) {
        setFeedbackIndex(
          FEEDBACK_ACTIONS.LIKE,
          likedIndices.filter((el) => el !== messageIndex),
        );
      } else {
        setFeedbackIndex(FEEDBACK_ACTIONS.LIKE, [
          ...likedIndices,
          messageIndex,
        ]);
        removeDislike();
      }
    }

    if (action === FEEDBACK_ACTIONS.DISLIKE) {
      if (isDisliked) {
        setFeedbackIndex(
          FEEDBACK_ACTIONS.DISLIKE,
          dislikedIndices.filter((el) => el !== messageIndex),
        );
      } else {
        setFeedbackIndex(FEEDBACK_ACTIONS.DISLIKE, [
          ...dislikedIndices,
          messageIndex,
        ]);
        removeLike();
      }
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        alert("Copied!");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className={styles.interactionIconsContainer}>
      <div className={styles.interactionIconsWrapper}>
        <div
          onClick={() => {
            handleFeedbackClick(FEEDBACK_ACTIONS.LIKE);
          }}
          className={`${styles.interactionIconsButton} ${isLiked ? styles.feedbackActive : ""}`}
        >
          <LikeIcon />
        </div>
        <div
          onClick={() => {
            handleFeedbackClick(FEEDBACK_ACTIONS.DISLIKE);
          }}
          className={`${styles.interactionIconsButton} ${isDisliked ? styles.feedbackActive : ""}`}
        >
          <DislikeIcon />
        </div>
        {messageIndex === lastIndexMessage && (
          <div
            onClick={handleOpenMenu}
            className={styles.interactionIconsButton}
          >
            <MenuActionIcon />
            {openMenu && <ActionMenu handleCloseMenu={handleCloseMenu} />}
          </div>
        )}
      </div>
      <div>
        <div
          onClick={handleCopyToClipboard}
          className={styles.interactionIconsButton}
        >
          <CopyIcon />
        </div>
      </div>
    </div>
  );
};
