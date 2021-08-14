import React from "react";

import styles from "./styles/Worker.module.scss";

type WorkerProps = {
  name: string;
  character?: string;
  job?: string;
  profile_path: string;
  id: number;
  children?: React.ReactNode;
};

export const Worker = (props: WorkerProps) => {
  return (
    <div className={styles.worker}>
      {props.profile_path.slice(-4) === "null" ? (
        <div className={styles.empty_img}></div>
      ) : (
        <div
          className={styles.img}
          style={{
            backgroundImage: `url(${props.profile_path})`,
          }}
        ></div>
      )}
      <div className={styles.info}>
        <h2>{props?.name}</h2>
        <span>{props.character ? props.character : props.job}</span>
      </div>
    </div>
  );
};
