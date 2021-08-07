import React from "react";

import styles from "./styles/Poster.module.scss";

type PosterProps = {
  title: string;
  children?: React.ReactNode;
};

export const Poster = ({ title }: PosterProps) => {
  return (
    <div className={styles.container}>
      <span>{title}</span>
    </div>
  );
};
