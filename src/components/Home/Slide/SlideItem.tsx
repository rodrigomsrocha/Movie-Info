import React from "react";

import { Button } from "../../utils/Button/Button";

import { ReactComponent as Arrow } from "../../../assets/arrow.svg";

import styles from "./styles/SlideItem.module.scss";

type SlideItemProps = {
  poster_img: string;
  title: string;
  runtime: number;
  backdrop_img: string;
  children?: React.ReactNode;
};

export const SlideItem = (props: SlideItemProps) => {
  const hours = Math.floor(props.runtime / 60);
  const minutes = Math.round((props.runtime / 60 - hours) * 60);

  return (
    <div
      className={styles.movie_container}
      style={{
        background: `
        radial-gradient(
          92.7% 919.8% at 3.77% 50%, #212733 5.69%,rgba(76, 83, 97, 0.6) 32.78%,
          rgba(76, 83, 97, 0.6) 69.97%, #212733 93.03%
        ),
        url("${props.backdrop_img}") no-repeat center / cover
        `,
      }}
    >
      <img src={props.poster_img} alt={props.title} />
      <div className={styles.movie_info}>
        <h1>{props.title}</h1>
        <span>
          {hours.toString().padStart(2, "0")}:
          {minutes.toString().padStart(2, "0")}
        </span>
        <Button>
          veja mais
          <Arrow />
        </Button>
      </div>
    </div>
  );
};
