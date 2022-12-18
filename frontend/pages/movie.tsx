import type { NextPage } from "next";
import Movie from "../containers/Movie";

import Template from "../containers/Template";

const MoviePage: NextPage = () => {
  return (
    <div className="category-container">
      <Template clasActive="movie" content={<Movie />} title="Movie Lists" />
    </div>
  );
};

export default MoviePage;
