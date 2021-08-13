import React, { useEffect, useState } from "react";

import { Button } from "../../utils/Button/Button";

import { ReactComponent as Arrow } from "../../../assets/arrow.svg";

import styles from "./styles/SlideItem.module.scss";
import { MovieModal } from "../../Modal/MovieModal";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
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

type SlideItemProps = {
  id: number;
  poster_img: string;
  title: string;
  runtime: number;
  backdrop_img: string;
  children?: React.ReactNode;
};

export const SlideItem = (props: SlideItemProps) => {
  const hours = Math.floor(props.runtime / 60);
  const minutes = Math.round((props.runtime / 60 - hours) * 60);

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
    <div
      className={styles.movie_container}
      style={{
        background: `
          ${
            props.backdrop_img !== null || !loading
              ? `radial-gradient(
            92.7% 919.8% at 3.77% 50%, #212733 5.69%,rgba(76, 83, 97, 0.6) 32.78%,
            rgba(76, 83, 97, 0.6) 69.97%, #212733 93.03%
          ),
          url("${props.backdrop_img}") no-repeat center / cover`
              : "#303846"
          }
        `,
      }}
    >
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
      <img src={props.poster_img} alt={props.title} />
      <div className={styles.movie_info}>
        <h1>{props.title}</h1>
        <span>
          {hours.toString().padStart(2, "0")}:
          {minutes.toString().padStart(2, "0")}
        </span>
        <Button
          onClick={() => {
            openModal(props?.id);
          }}
        >
          veja mais
          <Arrow />
        </Button>
      </div>
    </div>
  );
};
