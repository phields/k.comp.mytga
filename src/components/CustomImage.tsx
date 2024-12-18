
import React from 'react';

interface CustomImageProps {
  name: string;
  imageId: string;
  altText: string;
  size: string;
  classes?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ name, imageId, altText, size, classes }) => {
  const imageUrl = `https://images.igdb.com/igdb/image/upload/t_${size}/${imageId}.jpg`;

  return <img src={imageUrl} alt={altText} className={classes} />;
};

export default CustomImage;