import Head from 'next/head';

import Header from '@/components/organisms/Header';
import Hero from '@/components/organisms/Hero';
import CardRow from '@/components/organisms/CardRow';
import Button from '@/components/atoms/Button';
import styles from './page.module.css';
import ChatSection from '@/components/organisms/ChatSection';

const cardsData = [
  { title: 'Wanderlust Destinations 2024', subtitle: 'Must-Visit Places' },
  { title: 'SayHalo AI: What Sets Us Apart', subtitle: 'Key Differentiators' },
  { title: 'Design Trends on TikTok 2024', subtitle: 'Trending Now' },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SayHalo - AI Assistant</title>
        <meta name="description" content="Next.js + React + TypeScript + Pure CSS Layout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header userName="Asal Design" />

      <main className={styles.mainContent}>
        {/* <Hero userName="Asal Design" />
        <CardRow cards={cardsData} /> */}
        <ChatSection />
      </main>

      {/* <div className={styles.inputBar}>
        <input
          className={styles.textInput}
          type="text"
          placeholder="Ask SayHalo anything..."
        />
        <Button label="Send" />
      </div> */}
    </div>
  );
};
