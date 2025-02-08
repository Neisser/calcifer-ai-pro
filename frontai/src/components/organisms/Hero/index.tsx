import React, { FC } from 'react';
import styles from './Hero.module.css';

interface HeroProps {
  userName: string;
}

const Hero: FC<HeroProps> = ({ userName }) => {
  return (
    <section className={styles.hero}>
      <h1>Hi, {userName}</h1>
      <h2>Can I help you with anything?</h2>
      <p>
        Ready to assist you with anything you need, from answering questions to providing
        recommendations. Let&apos;s get started!
      </p>
    </section>
  );
};

export default Hero;
