import React, { useState } from "react";
import { useParams } from "react-router-dom";

import { BackdropContent } from "./Backdrop";
import { PosterContent } from "./Posters";
import { VideosContent } from "./Videos";

import styles from "./styles/Midia.module.scss";

export const MovieMidia: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("backdrops");

  const { id } = useParams();
  let CurrentTab;

  if (activeTab === "backdrops") {
    CurrentTab = BackdropContent;
  } else if (activeTab === "posters") {
    CurrentTab = PosterContent;
  } else if (activeTab === "videos") {
    CurrentTab = VideosContent;
  }

  const handleActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <h1>Mídias</h1>
      <div className={styles.tabs}>
        <div
          className={`${activeTab === "backdrops" ? styles.active : ""} ${
            styles.tab
          }`}
          onClick={() => handleActiveTab("backdrops")}
        >
          Imagens de fundo
        </div>
        <div
          className={`${activeTab === "posters" ? styles.active : ""} ${
            styles.tab
          }`}
          onClick={() => handleActiveTab("posters")}
        >
          Poster
        </div>
        <div
          className={`${activeTab === "videos" ? styles.active : ""} ${
            styles.tab
          }`}
          onClick={() => handleActiveTab("videos")}
        >
          Vídeos
        </div>
      </div>
      {CurrentTab ? (
        <CurrentTab
          id={id}
          className={styles.content}
          imageWidth={200}
          imageHeight={300}
        />
      ) : (
        <h2>Ocorreu um erro ao carregar mídias</h2>
      )}
    </div>
  );
};
