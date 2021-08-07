import React, { useState, useEffect } from "react";

import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { SlideItem } from "./SlideItem";

import styles from "./styles/Slide.module.scss";
import "swiper/swiper.scss";
import "swiper/components/pagination/pagination.scss";

type PopularMovie = {
  title: string;
  runtime: number;
  backdrop_path: string;
  poster_path: string;
  id: number;
};

SwiperCore.use([Pagination, Autoplay]);

export const Slide: React.FC = () => {
  const [popular, setPopular] = useState<PopularMovie[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`
        );
        const data = await response.json();
        const popularMoviesData = data.results
          .map(async (movie: any) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`
            );
            const data = await response.json();
            return {
              title: data.title,
              runtime: data.runtime,
              backdrop_path: `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`,
              poster_path: `https://image.tmdb.org/t/p/w200${data.poster_path}`,
              id: data.id,
            };
          })
          .slice(0, 6);
        const popularMovies: PopularMovie[] = await Promise.all(
          popularMoviesData
        );
        setPopular([...popularMovies]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPopularMovies();
  }, []);

  if (!popular) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        <Swiper pagination={{ clickable: true }} autoplay={{ delay: 5000 }}>
          {popular.map((movie) => (
            <SwiperSlide key={movie.id}>
              <SlideItem
                key={movie.id}
                id={movie.id}
                poster_img={movie.poster_path}
                title={movie.title}
                runtime={movie.runtime}
                backdrop_img={movie.backdrop_path}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
