import React, { FC } from 'react';
import Card from '../../molecules/Card';
import styles from './CardRow.module.css';

interface CardItem {
  title: string;
  subtitle: string;
}

interface CardRowProps {
  cards: CardItem[];
}

const CardRow: FC<CardRowProps> = ({ cards }) => {
  return (
    <div className={styles.cardRow}>
      {cards.map((card, idx) => (
        <Card key={idx} title={card.title} subtitle={card.subtitle} />
      ))}
    </div>
  );
};

export default CardRow;
