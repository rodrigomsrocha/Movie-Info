import React, { useEffect, useState } from "react";

type PosterProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
  imageHeight?: number;
  imageWidth?: number;
};

type Poster = {
  file_path: string;
};

type Posters = {
  posters: Poster[];
};

export const PosterContent = (props: PosterProps) => {
  const [poster, setPoster] = useState<Posters>();

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${props.id}/images?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const json: Posters = await response.json();

        const poster: Poster[] = json.posters.map((poster) => {
          return {
            file_path: poster.file_path,
          };
        });

        setPoster({
          posters: [...poster],
        });
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, [props.id]);

  if (!poster) {
    return (
      <div className={props.className}>
        <h2>Ocorreu um erro ao carregar a mídia</h2>
      </div>
    );
  }

  if (poster.posters.length === 0) {
    return (
      <div className={props.className}>
        <h2>Sem Posters</h2>
      </div>
    );
  }

  return (
    <div className={props.className}>
      {poster?.posters.map((poster) => (
        <img
          width={props.imageWidth}
          height={props.imageHeight}
          key={poster.file_path}
          src={`https://image.tmdb.org/t/p/w200${poster.file_path}`}
          alt=""
        />
      ))}
    </div>
  );
};
