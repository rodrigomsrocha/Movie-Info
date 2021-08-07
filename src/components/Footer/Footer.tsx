import React from "react";

import { ReactComponent as Heart } from "../../assets/heart.svg";

import styles from "./styles/Footer.module.scss";

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <span>feito com</span>
      <Heart />
      <span>
        por{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/rodrigomsrocha"
        >
          @rodrigomsrocha
        </a>
      </span>
    </div>
  );
};
