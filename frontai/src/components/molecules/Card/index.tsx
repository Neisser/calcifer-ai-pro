// components/molecules/Card.tsx
import React, { FC, ReactNode } from 'react';
import styles from './Card.module.css';

interface CardProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

const Card: FC<CardProps> = ({ title, subtitle, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.textContainer}>
        <h3>{title}</h3>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children && <div className={styles.extraContent}>{children}</div>}
    </div>
  );
};

export default Card;  
