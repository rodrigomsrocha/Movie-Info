import React from "react";

import styles from "./styles/Button.module.scss";

export const Button: React.FC = (props) => {
  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  );
};
