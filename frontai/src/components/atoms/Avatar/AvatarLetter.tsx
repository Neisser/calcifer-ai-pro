import { FC } from "react";
import styles from './Avatar.module.css';

import { AvatarProps } from ".";

export enum Roles {
  User = 'user',
  Assistant = 'assistant',
}

export const AvatarLetter: FC<AvatarProps> = ({ role = Roles.User, letter = '', ...props }) => {

  return (
    <div className={`${styles.avatar} ${styles[role]}`}>
      {letter}
    </div>
  );
}