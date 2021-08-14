import React from "react";

import styles from "./styles/Subtitle.module.scss";

import { ReactComponent as ArrowIcon } from "../../assets/accordion-arrow.svg";

type SubtitleProps = {
  sub: string;
  setIsOpen: (param: boolean) => void;
  isOpen: boolean;
  children?: React.ReactNode;
};

export const Subtitle = (props: SubtitleProps) => {
  const openAccordion = () => {
    props.setIsOpen(!props.isOpen);
  };
  return (
    <div className={styles.subtitle} onClick={openAccordion}>
      <h2>{props.sub}</h2>
      <ArrowIcon
        style={{
          transition: "0.3s",
          transform: `rotate(${props.isOpen ? "0deg" : "180deg"})`,
        }}
      />
    </div>
  );
};
