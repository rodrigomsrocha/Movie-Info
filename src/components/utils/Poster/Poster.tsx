import React from "react";

import styles from "./styles/Poster.module.scss";

type PosterProps = {
  title: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export const Poster = ({ title, onClick }: PosterProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <span>{title}</span>
    </div>
  );
};
