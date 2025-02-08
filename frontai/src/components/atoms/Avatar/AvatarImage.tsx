import { FC } from "react";
import styles from './Avatar.module.css';

import { AvatarProps } from ".";

export const AvatarImage: FC<AvatarProps> = ({ size, alt, ...props }) => {
  return <img className={styles.avatar} style={{ width: size, height: size }} alt={alt} {...props} />;
}