import React, { useEffect, useState } from "react";
// @ts-ignore
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Poster } from "../../utils/Poster/Poster";
import { MovieModal } from "../../Modal/MovieModal";

import styles from "./styles/Carrousel.module.scss";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "./styles/Splide.scss";
import { ErrorModal } from "../../Modal/ErrorModal";

type Genre = {
  id: number;
  name: string;
};

type MovieInfo = {
  id: number;
  poster_path: string;
  title: string;
  runtime: number;
  genres: Genre[];
  release_date: string;
  overview: string;
  vote_average: string;
  classification: number;
  tagline: string;
  backdrop_path: string;
};

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
  const [movieId, setMovieId] = useState<number>(0);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [movieInfo, setMovieInfo] = useState<MovieInfo>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  function openModal(id: number) {
    setModalIsOpen(true);
    setMovieId(id);
  }

  function closeModal() {
    setMovieId(0);
    setModalIsOpen(false);
  }

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        if (movieId !== 0) {
          setLoading(true);
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`
          );
          const data: MovieInfo = await response.json();

          const dates_response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/release_dates?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`
          );
          const dates = await dates_response.json();

          const certification = await dates?.results?.filter((d: any) => {
            return d.iso_3166_1 === "BR";
          });

          console.log(certification);

          const classification = await certification?.[0]?.release_dates?.[0]
            ?.certification;

          const movieDetail: MovieInfo = {
            id: data.id,
            poster_path: data.poster_path,
            title: data.title,
            runtime: data.runtime,
            genres: data?.genres?.map((genre) => ({
              name: genre.name,
              id: genre.id,
            })),
            release_date: format(parseISO(data?.release_date), "d/MM/yyyy", {
              locale: ptBR,
            }),
            overview: data.overview,
            vote_average: data.vote_average.toString().replace(".", ","),
            classification,
            tagline: data.tagline,
            backdrop_path: data.backdrop_path,
          };
          setMovieInfo(movieDetail);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetail();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h1>{sectionTitle}</h1>
      {error ? (
        <ErrorModal isOpen={modalIsOpen} onRequestClose={closeModal} />
      ) : (
        <MovieModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          movieId={movieId}
          movieInfo={movieInfo}
          loading={loading}
        />
      )}
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
          return (
            <SplideSlide key={movie.id}>
              {movie.poster_path.slice(-4) === "null" ? (
                <Poster
                  key={movie.id}
                  title={movie.title}
                  onClick={() => {
                    openModal(movie.id);
                  }}
                />
              ) : (
                <div
                  key={movie.id}
                  className={styles.poster_container}
                  onClick={() => {
                    openModal(movie.id);
                  }}
                >
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
