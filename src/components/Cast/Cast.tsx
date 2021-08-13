import React from "react";
import { useParams } from "react-router-dom";

import { Actors } from "./Actors";

import styles from "./styles/Cast.module.scss";

import { ReactComponent as ArrowIcon } from "../../assets/accordion-arrow.svg";

export const Cast: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const { id } = useParams();

  const openAccordion = () => setIsOpen(!isOpen);

  return (
    <div className={styles.container}>
      <h1>Elenco</h1>
      <div className={styles.subtitle} onClick={openAccordion}>
        <h2>Atores</h2>
        <ArrowIcon
          style={{
            transition: "0.3s",
            transform: `rotate(${isOpen ? "0deg" : "180deg"})`,
          }}
        />
      </div>
      <Actors isOpen={isOpen} id={id} />
    </div>
  );
};
