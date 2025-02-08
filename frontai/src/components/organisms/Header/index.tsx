import React, { FC } from 'react';

// import Avatar from '../../atoms/Avatar';
import styles from './Header.module.css';

interface HeaderProps {
  userName?: string;
}

const Header: FC<HeaderProps> = ({ userName = 'Guest' }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>SayHalo</div>
      <div className={styles.rightSection}>
        <span className={styles.userName}>{userName}</span>
        {/* <Avatar letter='N' /> */}
      </div>
    </header>
  );
};

export default Header;
