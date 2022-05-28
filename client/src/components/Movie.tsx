import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import GET_MOVIE, { MovieData, MovieVariables } from '../gqls/movie';

const Movie = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery<MovieData, MovieVariables>(
    GET_MOVIE,
    {
      variables: {
        movieId: id,
      },
    }
  );

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error!</p>;
  }

  return (
    <div>
      <h1 className="text-2xl">{data?.movie.title}</h1>
    </div>
  );
};

export default Movie;
