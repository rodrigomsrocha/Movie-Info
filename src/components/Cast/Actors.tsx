import React, { useEffect, useState } from "react";

import styles from "./styles/Actors.module.scss";
import { Subtitle } from "./Subtitle";

import { Worker } from "./Worker";

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
  children?: React.ReactNode;
};

export const Actors = (props: ActorProps) => {
  const [cast, setCast] = useState<ActorsTypes>();

  const [isOpen, setIsOpen] = React.useState<boolean>(false);

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
    <>
      <Subtitle isOpen={isOpen} setIsOpen={setIsOpen} sub="Atores" />
      <div
        className={`${styles.actors_container}`}
        style={{
          display: isOpen ? "grid" : "none",
        }}
      >
        {cast.cast.map((actor) => (
          <div key={actor.id}>
            <Worker
              name={actor.name}
              profile_path={actor.profile_path}
              id={actor.id}
              character={actor.character}
            />
          </div>
        ))}
      </div>
    </>
  );
};
