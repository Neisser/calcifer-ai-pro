import React, { FC } from 'react';

import AvatarLetter, { Roles } from '../../atoms/Avatar';
import styles from './ChatMessage.module.css';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

const ChatMessage: FC<ChatMessageProps> = ({ role, content }) => {
  // Assign letter based on role
  const letter = role === Roles.User ? 'U' : 'A';

  return (
    <div
      className={`${styles.messageContainer} ${
        role === Roles.User ? styles.userMessage : styles.assistantMessage
      }`}
    >
      {/* Avatar (left if assistant, right if user) */}
      {role === Roles.Assistant && <AvatarLetter letter={letter} role={Roles.Assistant} />}

      {/* Bubble */}
      <div className={styles.messageBubble}>{content}</div>

      {/* Avatar on the right if user */}
      {role === Roles.User && <AvatarLetter letter={letter} role={Roles.Assistant} />}
    </div>
  );
};

export default ChatMessage;
