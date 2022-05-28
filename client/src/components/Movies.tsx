import { useQuery } from '@apollo/client';
import GET_ALL_MOVIES, { MoviesData } from '../gqls/allMovies';

const Movies = () => {
  // useQuery는 gql을 선언적으로 사용할 수 있게 한다.
  const { data, loading, error } = useQuery<MoviesData>(GET_ALL_MOVIES);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error!</p>;
  }

  return (
    <div>
      <ul>
        {data &&
          data.allMovies.map((movie) => <li key={movie.id}>{movie.title}</li>)}
      </ul>
    </div>
  );
};

export default Movies;
