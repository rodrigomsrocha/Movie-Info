import React from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";

import styles from "./styles/Carrousel.module.scss";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "./styles/Splide.scss";
import { Poster } from "../../utils/Poster/Poster";

type Movies = {
  title: string;
  poster_path: string;
  id: number;
};

type CarouselProps = {
  sectionTitle: string;
  movies: Movies[];
  children?: React.ReactNode;
};

export const Carrousel = ({ movies, sectionTitle }: CarouselProps) => {
  return (
    <div className={styles.container}>
      <h1>{sectionTitle}</h1>
      <Splide
        options={{
          rewind: true,
          width: 1170,
          perPage: 5,
          autoWidth: true,
          gap: 20,
          pagination: false,
          drag: false,
        }}
      >
        {movies.map((movie: Movies) => {
          console.log(movie.poster_path);
          return (
            <SplideSlide key={movie.id}>
              {movie.poster_path.slice(-4) === "null" ? (
                <Poster title={movie.title} />
              ) : (
                <div className={styles.poster_container}>
                  <div>
                    <span>{movie.title}</span>
                  </div>
                  <img src={movie.poster_path} alt={movie.title} />
                </div>
              )}
            </SplideSlide>
          );
        })}
      </Splide>
    </div>
  );
};
