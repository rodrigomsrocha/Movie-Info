import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

type VideoProps = {
  id: string;
  children?: React.ReactNode;
  className?: string;
  imageHeight?: number;
  imageWidth?: number;
};

type Video = {
  key: string;
  id: string;
};

type Videos = {
  results: Video[];
};

export const VideosContent = (props: VideoProps) => {
  const [videos, setVideos] = useState<Videos>();

  useEffect(() => {
    const getImages = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${props.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
        );
        const json: Videos = await response.json();

        const video: Video[] = json.results.map((video) => {
          return {
            key: video.key,
            id: video.id,
          };
        });

        setVideos({
          results: [...video],
        });
      } catch (error) {
        console.log(error);
      }
    };
    getImages();
  }, [props.id]);

  return (
    <div className={props.className}>
      {videos?.results.map((video) => (
        <YouTube
          key={video.id}
          videoId={video.key}
          opts={{
            width: "900",
            height: "500",
          }}
        />
      ))}
    </div>
  );
};
