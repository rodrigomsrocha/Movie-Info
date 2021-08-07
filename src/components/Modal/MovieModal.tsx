import React from "react";
import Modal from "react-modal";

import { Poster } from "../utils/Poster/Poster";
import { ReactComponent as Star } from "../../assets/star.svg";
import { Button } from "../utils/Button/Button";

import "./styles/modal.scss";

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

type ModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  movieId: number;
  movieInfo: MovieInfo | undefined;
  children?: React.ReactNode;
};

Modal.setAppElement("#root");

export const MovieModal = ({
  isOpen,
  onRequestClose,
  movieId,
  movieInfo,
}: ModalProps) => {
  const hours = movieInfo && Math.floor(movieInfo?.runtime / 60);
  const minutes =
    movieInfo && hours && Math.round((movieInfo?.runtime / 60 - hours) * 60);

  console.log(movieInfo?.backdrop_path);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal_container"
      overlayClassName="modal_overlay"
      style={{
        content: {
          background: `
          ${
            movieInfo?.backdrop_path !== null
              ? `
                linear-gradient(
                  90deg, #212733 13.69%, rgba(33, 39, 51, 0.8) 24.5%,
                  rgba(33, 39, 51, 0.8) 76.56%, #212733 86.46%),
                  url('https://image.tmdb.org/t/p/w1280${movieInfo?.backdrop_path}') no-repeat center / cover`
              : "#303846"
          }
        `,
        },
      }}
    >
      <div className="poster">
        <div className="vote">
          <Star />
          <h2>{movieInfo?.vote_average}</h2>
        </div>
        {movieInfo?.poster_path === null ? (
          <Poster title={movieInfo.title} />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w200${movieInfo?.poster_path}`}
            alt={movieInfo?.title}
          />
        )}
      </div>
      <div className="movie_details">
        <h1>{movieInfo?.title}</h1>
        <div className="more_details">
          <span>
            {hours?.toString().padStart(2, "0")}:
            {minutes?.toString().padStart(2, "0")}
          </span>
          <div className="genres">
            {movieInfo?.genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>
          <span>{movieInfo?.release_date}</span>
        </div>
        <p className="overview">{movieInfo?.overview}</p>
        <span className="tagline">{movieInfo?.tagline || ""}</span>
        <div className="btns_container">
          <Button>mídias</Button>
          <Button>elenco</Button>
        </div>
      </div>
    </Modal>
  );
};
