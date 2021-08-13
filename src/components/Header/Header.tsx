import React from "react";
import { Link } from "react-router-dom";

import { Input } from "./Input";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import styles from "./styles/Header.module.scss";

export const Header: React.FC = () => {
  return (
    <header className={styles.container}>
      <div className={styles.header}>
        <Link to="/">
          <Logo />
        </Link>
        <Input />
      </div>
    </header>
  );
};
