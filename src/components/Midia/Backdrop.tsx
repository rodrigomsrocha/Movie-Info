import React, { useEffect, useState } from "react";

type BackdropProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
  imageHeight?: number;
  imageWidth?: number;
};

type Backdrop = {
  file_path: string;
};

type Backdrops = {
  backdrops: Backdrop[];
};

export const BackdropContent = (props: BackdropProps) => {
  const [backdrops, setBackdrops] = useState<Backdrops>();

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${props.id}/images?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const json: Backdrops = await response.json();

        const backdrops: Backdrop[] = json.backdrops.map((backdrop) => {
          return {
            file_path: backdrop.file_path,
          };
        });

        setBackdrops({
          backdrops: [...backdrops],
        });
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, [props.id]);

  if (!backdrops) {
    return (
      <div className={props.className}>
        <h2>Ocorreu um erro ao carregar a mídia</h2>
      </div>
    );
  }

  if (backdrops.backdrops.length === 0) {
    return (
      <div className={props.className}>
        <h2>Sem imagens de fundo</h2>
      </div>
    );
  }

  return (
    <div className={props.className}>
      {backdrops?.backdrops.map((backdrop) => (
        <img
          key={backdrop.file_path}
          src={`https://image.tmdb.org/t/p/w1280${backdrop.file_path}`}
          alt=""
        />
      ))}
    </div>
  );
};
