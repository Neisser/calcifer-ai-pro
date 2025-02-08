import React, { FC, ImgHTMLAttributes } from 'react';

import { AvatarLetter, Roles } from './AvatarLetter';
import { AvatarImage } from './AvatarImage';

enum AvatarType {
  Image = 'img',
  Letter = 'letter',
}

export { Roles };

export interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  type?: AvatarType;
  role?: Roles;
  letter?: string;
}

const Avatar: FC<AvatarProps> = ({ type = AvatarType.Letter, size = 40, alt, ...props }) => {
  if (type === AvatarType.Image) {
    return <AvatarImage size={size} alt={alt} {...props} />;
  }
  
  return <AvatarLetter {...props} />;
};

export default Avatar;
