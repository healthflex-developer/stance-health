// components/MasonryGallery.js
import React from 'react';
import Masonry from 'react-masonry-css';
import styles from './MasonryGallery.module.css';

const MasonryGallery = ({ items }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {items.map((item, index) => (
        <div key={index} className={styles.masonryItem}>
          <img src={item.src} alt={item.alt} />
        </div>
      ))}
    </Masonry>
  );
};

export default MasonryGallery;