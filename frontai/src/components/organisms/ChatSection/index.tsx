'use client';

import React, { FC, useState } from 'react';
import ChatMessage from '../../molecules/ChatMessage';
import styles from './ChatSection.module.css';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

const ChatSection: FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'assistant', content: 'Hello! How can I help you today?' },
  ]);

  // Tracks whether the SSE stream is active (disables the Send button/input).
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  /**
   * 1) Add user's message to state.
   * 2) Create a placeholder assistant message with empty content.
   * 3) As SSE chunks come in, append them to that single assistant message.
   */
  const handleSend = (userText: string) => {
    if (!userText.trim()) return;

    // Add user’s message
    const newUserMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: userText,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // Disable input while streaming
    setIsStreaming(true);

    // Create a placeholder assistant message
    const assistantMessage: Message = {
      id: Date.now() + 1, // or another unique ID strategy
      role: 'assistant',
      content: '', // start empty, we’ll append chunks
    };
    const assistantId = assistantMessage.id;
    setMessages((prev) => [...prev, assistantMessage]);

    // Start SSE
    const encodedMsg = encodeURIComponent(userText);
    const source = new EventSource(`http://localhost:3009/stream-chat?message=${encodedMsg}`);

    source.onmessage = (event) => {
      if (event.data === '[DONE]') {
        // End of stream
        source.close();
        setIsStreaming(false);
        return;
      }

      // Otherwise, append chunk to our single assistant message
      setMessages((prev) => {
        // Make a copy to update
        const updated = [...prev];
        const index = updated.findIndex((m) => m.id === assistantId);
        if (index !== -1) {
          // Append the new chunk to the existing content
          const oldContent = updated[index].content;
          updated[index] = {
            ...updated[index],
            content: oldContent + event.data,
          };
        }
        return updated;
      });
    };

    source.onerror = (err) => {
      console.error('SSE error: ', err);
      source.close();
      setIsStreaming(false);
    };
  };

  return (
    <div className={styles.chatSection}>
      <div className={styles.chatContainer}>
        {messages.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role} content={msg.content} />
        ))}
      </div>

      <ChatInputBar onSend={handleSend} isStreaming={isStreaming} />
    </div>
  );
};

export default ChatSection;

/** 
 * Inline definition of ChatInputBar for clarity. 
 * You can move it to another file if you prefer.
 */
interface ChatInputBarProps {
  onSend: (content: string) => void;
  isStreaming: boolean;
}

const ChatInputBar: FC<ChatInputBarProps> = ({ onSend, isStreaming }) => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!isStreaming && text.trim()) {
      onSend(text);
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className={styles.inputBar}>
      <input
        className={styles.textInput}
        type="text"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isStreaming}
      />
      <button
        className={styles.sendButton}
        onClick={handleSubmit}
        disabled={isStreaming}
      >
        {isStreaming ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};
