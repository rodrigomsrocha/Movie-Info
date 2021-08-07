import React from "react";

import styles from "./styles/Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button = (props: ButtonProps) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
