import React, { useEffect, useState } from "react";

import { Subtitle } from "./Subtitle";
import { Worker } from "./Worker";

import styles from "./styles/Crew.module.scss";

type CrewProps = {
  id: string;
  children?: React.ReactNode;
};

type CrewPartner = {
  id: number;
  name: string;
  job: string;
  profile_path: string;
  department: string;
};

type CrewType = {
  art: CrewPartner[];
  camera: CrewPartner[];
  makeUp: CrewPartner[];
  crew: CrewPartner[];
  directories: CrewPartner[];
  editing: CrewPartner[];
  lightning: CrewPartner[];
  production: CrewPartner[];
  sound: CrewPartner[];
  visualEffects: CrewPartner[];
  writing: CrewPartner[];
};

type CrewData = {
  crew: CrewPartner[];
};

export const Crew = (props: CrewProps) => {
  const [crew, setCrew] = useState<CrewType>();
  const [artIsOpen, setArtIsOpen] = React.useState<boolean>(false);
  const [cameraIsOpen, setCameraIsOpen] = React.useState<boolean>(false);
  const [makeUpIsOpen, setMakeUpIsOpen] = React.useState<boolean>(false);
  const [crewIsOpen, setCrewIsOpen] = React.useState<boolean>(false);
  const [directoriesIsOpen, setDirectoriesIsOpen] =
    React.useState<boolean>(false);
  const [editingIsOpen, setEditingIsOpen] = React.useState<boolean>(false);
  const [lightningIsOpen, setLightningIsOpen] = React.useState<boolean>(false);
  const [productionIsOpen, setProductionIsOpen] =
    React.useState<boolean>(false);
  const [soundIsOpen, setSoundIsOpen] = React.useState<boolean>(false);
  const [visualEffectsIsOpen, setVisualEffectsIsOpen] =
    React.useState<boolean>(false);
  const [writingIsOpen, setWritingIsOpen] = React.useState<boolean>(false);

  useEffect(() => {
    const getCrew = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${props.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`
      );
      const data: CrewData = await response.json();

      const art = data.crew
        .filter((c) => c.department === "Art")
        .map((c) => ({
          id: c.id,
          name: c.name,
          job: c.job,
          profile_path: `https://image.tmdb.org/t/p/w200${c.profile_path}`,
          department: c.department,
        }));
      const camera = data.crew
        .filter((c) => c.department === "Camera")
        .map((c) => ({
          id: c.id,
          name: c.name,
          job: c.job,
          profile_path: `https://image.tmdb.org/t/p/w200${c.profile_path}`,
          department: c.department,
        }));
      const makeUp = data.crew
        .filter((c) => c.department === "Costume & Make-Up")
        .map((c) => ({
          id: c.id,
          name: c.name,
          job: c.job,
          profile_path: `https://image.tmdb.org/t/p/w200${c.profile_path}`,
          department: c.department,
        }));
      const crew = data.crew
        .filter((c) => c.department === "Crew")
        .map((c) => ({
          id: c.id,
          name: c.name,
          job: c.job,
          profile_path: `https://image.tmdb.org/t/p/w200${c.profile_path}`,
          department: c.department,
        }));
      const directories = data.crew
        .filter((c) => c.department === "Directing")
        .map((c) => ({
          id: c.id,
          name: c.name,
          job: c.job,
          profile_path: `https://image.tmdb.org/t/p/w200${c.profile_path}`,
          department: c.department,
        }));
      const editing = data.crew
        .filter((c) => c.department === "Editing")
        .map((c) => ({
          id: c.id,
          name: c.name,
          job: c.job,
          profile_path: `https://image.tmdb.org/t/p/w200${c.profile_path}`,
          department: c.department,
        }));
      const lightning = data.crew
        .filter((c) => c.department === "Lighting")
        .map((c) => ({
          id: c.id,
          name: c.name,
          job: c.job,
          profile_path: `https://image.tmdb.org/t/p/w200${c.profile_path}`,
          department: c.department,
        }));
      const production = data.crew
        .filter((c) => c.department === "Production")
        .map((c) => ({
          id: c.id,
          name: c.name,
          job: c.job,
          profile_path: `https://image.tmdb.org/t/p/w200${c.profile_path}`,
          department: c.department,
        }));
      const sound = data.crew
        .filter((c) => c.department === "Sound")
        .map((c) => ({
          id: c.id,
          name: c.name,
          job: c.job,
          profile_path: `https://image.tmdb.org/t/p/w200${c.profile_path}`,
          department: c.department,
        }));
      const visualEffects = data.crew
        .filter((c) => c.department === "Visual Effects")
        .map((c) => ({
          id: c.id,
          name: c.name,
          job: c.job,
          profile_path: `https://image.tmdb.org/t/p/w200${c.profile_path}`,
          department: c.department,
        }));
      const writing = data.crew
        .filter((c) => c.department === "Writing")
        .map((c) => ({
          id: c.id,
          name: c.name,
          job: c.job,
          profile_path: `https://image.tmdb.org/t/p/w200${c.profile_path}`,
          department: c.department,
        }));
      setCrew({
        art,
        camera,
        makeUp,
        crew,
        directories,
        editing,
        lightning,
        production,
        sound,
        visualEffects,
        writing,
      });
    };
    getCrew();
  }, [props.id]);

  console.log(crew);

  return (
    <div>
      <>
        <Subtitle isOpen={artIsOpen} setIsOpen={setArtIsOpen} sub="Arte" />
        <div
          className={`${styles.actors_container}`}
          style={{
            display: artIsOpen ? "grid" : "none",
          }}
        >
          {crew?.art.map((c) => (
            <div key={c.id}>
              <Worker
                name={c.name}
                profile_path={c.profile_path}
                id={c.id}
                character={c.job}
              />
            </div>
          ))}
        </div>
        <Subtitle
          isOpen={cameraIsOpen}
          setIsOpen={setCameraIsOpen}
          sub="Câmera"
        />
        <div
          className={`${styles.actors_container}`}
          style={{
            display: cameraIsOpen ? "grid" : "none",
          }}
        >
          {crew?.camera.map((c) => (
            <div key={c.id}>
              <Worker
                name={c.name}
                profile_path={c.profile_path}
                id={c.id}
                character={c.job}
              />
            </div>
          ))}
        </div>
        <Subtitle
          isOpen={makeUpIsOpen}
          setIsOpen={setMakeUpIsOpen}
          sub="Figurino e Maquiagem"
        />
        <div
          className={`${styles.actors_container}`}
          style={{
            display: makeUpIsOpen ? "grid" : "none",
          }}
        >
          {crew?.makeUp.map((c) => (
            <div key={c.id}>
              <Worker
                name={c.name}
                profile_path={c.profile_path}
                id={c.id}
                character={c.job}
              />
            </div>
          ))}
        </div>
        <Subtitle isOpen={crewIsOpen} setIsOpen={setCrewIsOpen} sub="Equipe" />
        <div
          className={`${styles.actors_container}`}
          style={{
            display: crewIsOpen ? "grid" : "none",
          }}
        >
          {crew?.crew.map((c) => (
            <div key={c.id}>
              <Worker
                name={c.name}
                profile_path={c.profile_path}
                id={c.id}
                character={c.job}
              />
            </div>
          ))}
        </div>
        <Subtitle
          isOpen={directoriesIsOpen}
          setIsOpen={setDirectoriesIsOpen}
          sub="Diretor(a)"
        />
        <div
          className={`${styles.actors_container}`}
          style={{
            display: directoriesIsOpen ? "grid" : "none",
          }}
        >
          {crew?.directories.map((c) => (
            <div key={c.id}>
              <Worker
                name={c.name}
                profile_path={c.profile_path}
                id={c.id}
                character={c.job}
              />
            </div>
          ))}
        </div>
        <Subtitle
          isOpen={editingIsOpen}
          setIsOpen={setEditingIsOpen}
          sub="Edição"
        />
        <div
          className={`${styles.actors_container}`}
          style={{
            display: editingIsOpen ? "grid" : "none",
          }}
        >
          {crew?.editing.map((c) => (
            <div key={c.id}>
              <Worker
                name={c.name}
                profile_path={c.profile_path}
                id={c.id}
                character={c.job}
              />
            </div>
          ))}
        </div>
        <Subtitle
          isOpen={lightningIsOpen}
          setIsOpen={setLightningIsOpen}
          sub="Iluminação"
        />
        <div
          className={`${styles.actors_container}`}
          style={{
            display: lightningIsOpen ? "grid" : "none",
          }}
        >
          {crew?.lightning.map((c) => (
            <div key={c.id}>
              <Worker
                name={c.name}
                profile_path={c.profile_path}
                id={c.id}
                character={c.job}
              />
            </div>
          ))}
        </div>
        <Subtitle
          isOpen={productionIsOpen}
          setIsOpen={setProductionIsOpen}
          sub="Produção"
        />
        <div
          className={`${styles.actors_container}`}
          style={{
            display: productionIsOpen ? "grid" : "none",
          }}
        >
          {crew?.production.map((c) => (
            <div key={c.id}>
              <Worker
                name={c.name}
                profile_path={c.profile_path}
                id={c.id}
                character={c.job}
              />
            </div>
          ))}
        </div>
        <Subtitle
          isOpen={soundIsOpen}
          setIsOpen={setSoundIsOpen}
          sub="Sonoplastia"
        />
        <div
          className={`${styles.actors_container}`}
          style={{
            display: soundIsOpen ? "grid" : "none",
          }}
        >
          {crew?.sound.map((c) => (
            <div key={c.id}>
              <Worker
                name={c.name}
                profile_path={c.profile_path}
                id={c.id}
                character={c.job}
              />
            </div>
          ))}
        </div>
        <Subtitle
          isOpen={visualEffectsIsOpen}
          setIsOpen={setVisualEffectsIsOpen}
          sub="Efeitos Visuais"
        />
        <div
          className={`${styles.actors_container}`}
          style={{
            display: visualEffectsIsOpen ? "grid" : "none",
          }}
        >
          {crew?.visualEffects.map((c) => (
            <div key={c.id}>
              <Worker
                name={c.name}
                profile_path={c.profile_path}
                id={c.id}
                character={c.job}
              />
            </div>
          ))}
        </div>
        <Subtitle
          isOpen={writingIsOpen}
          setIsOpen={setWritingIsOpen}
          sub="Roteirização"
        />
        <div
          className={`${styles.actors_container}`}
          style={{
            display: writingIsOpen ? "grid" : "none",
          }}
        >
          {crew?.writing.map((c) => (
            <div key={c.id}>
              <Worker
                name={c.name}
                profile_path={c.profile_path}
                id={c.id}
                character={c.job}
              />
            </div>
          ))}
        </div>
      </>
    </div>
  );
};
