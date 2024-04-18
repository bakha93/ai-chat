import styles from './copilotChat.module.css'

export const UserMessage = ({ message }: { message: string }) => {
  return <div className={styles.userMessage}>{message}</div>;
};
