import React, { useEffect } from "react";

import { Slide } from "./Slide/Slide";
import { Carrousel } from "./Carrousel/Carrousel";

type MoviesTypes = {
  title: string;
  poster_path: string;
  id: number;
};

export const Home: React.FC = () => {
  const [topRatedMovies, setTopRatedMovies] = React.useState<MoviesTypes[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = React.useState<MoviesTypes[]>(
    []
  );
  const [upcomingMovies, setUpcomingMovies] = React.useState<MoviesTypes[]>([]);

  useEffect(() => {
    const getTopRatedMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`
        );
        const data = await response.json();

        const topRatedMovie = data.results.map((movie: MoviesTypes) => {
          return {
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
            id: movie.id,
          };
        });
        setTopRatedMovies([...topRatedMovie]);
      } catch (error) {
        console.log(error);
      }
    };
    const getNowPlayingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`
        );
        const data = await response.json();

        const nowPlayingMovie = data.results.map((movie: MoviesTypes) => {
          return {
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
            id: movie.id,
          };
        });
        setNowPlayingMovies([...nowPlayingMovie]);
      } catch (error) {
        console.log(error);
      }
    };
    const getUpcomingMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR&region=br`
        );
        const data = await response.json();

        const upcomingMovie = data.results.map((movie: MoviesTypes) => {
          return {
            title: movie.title,
            poster_path: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
            id: movie.id,
          };
        });
        setUpcomingMovies([...upcomingMovie]);
      } catch (error) {
        console.log(error);
      }
    };
    getTopRatedMovies();
    getNowPlayingMovies();
    getUpcomingMovies();
  }, []);

  return (
    <div>
      <Slide />
      <Carrousel sectionTitle="Bem avaliados" movies={topRatedMovies} />
      <Carrousel sectionTitle="Passando agora" movies={nowPlayingMovies} />
      <Carrousel sectionTitle="Próximas estreias" movies={upcomingMovies} />
    </div>
  );
};
