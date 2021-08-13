import React, { useEffect, useState } from "react";

import styles from "./styles/Actors.module.scss";

type Actor = {
  name: string;
  character: string;
  profile_path: string;
  id: number;
};

type ActorsTypes = {
  cast: Actor[];
};

type ActorProps = {
  id: string;
  isOpen: boolean;
  children?: React.ReactNode;
};

export const Actors = (props: ActorProps) => {
  const [cast, setCast] = useState<ActorsTypes>();

  useEffect(() => {
    const getActors = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`
        );
        const json: ActorsTypes = await response.json();

        const actors: Actor[] = json.cast.map((actor) => {
          return {
            name: actor.name,
            character: actor.character,
            profile_path: `https://image.tmdb.org/t/p/w200${actor.profile_path}`,
            id: actor.id,
          };
        });

        setCast({
          cast: [...actors],
        });
      } catch (error) {
        console.log(error);
      }
    };
    getActors();
  }, [props.id]);

  if (!props.id) {
    return null;
  }
  if (!cast) {
    return null;
  }

  return (
    <div
      className={`${styles.actors_container}`}
      style={{
        display: props.isOpen ? "grid" : "none",
      }}
    >
      {cast.cast.map((actor) => (
        <div className={styles.actor} key={actor.id}>
          {actor.profile_path.slice(-4) === "null" ? (
            <div className={styles.empty_img}></div>
          ) : (
            <div
              className={styles.img}
              style={{
                backgroundImage: `url(${actor.profile_path})`,
              }}
            ></div>
          )}
          <div className={styles.info}>
            <h2>{actor?.name}</h2>
            <span>{actor?.character}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
