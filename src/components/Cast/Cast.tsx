import React from "react";
import { useParams } from "react-router-dom";

import { Actors } from "./Actors";
import { Crew } from "./Crew";

import styles from "./styles/Cast.module.scss";

export const Cast: React.FC = () => {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <h1>Elenco</h1>
      <Actors id={id} />
      <h1>Equipe Técnica</h1>
      <Crew id={id} />
    </div>
  );
};
