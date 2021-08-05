import React from "react";

import styles from "./styles/Header.module.scss";

import { Input } from "./Input";

import { ReactComponent as Logo } from "../../assets/logo.svg";

export const Header: React.FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <Logo />
        <Input />
      </div>
    </header>
  );
};
