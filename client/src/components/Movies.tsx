import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import GET_ALL_MOVIES, { MoviesData } from '../gqls/allMovies';

const Movies = () => {
  // useQuery는 gql을 선언적으로 사용할 수 있게 한다.
  // 제네릭 1 - data 타입, 제네릭2 - variables 타입
  const { data, loading, error } = useQuery<MoviesData>(GET_ALL_MOVIES);

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error!</p>;
  }

  return (
    <div>
      <h1 className="text-2xl">Movies</h1>
      <ul>
        {data &&
          data.allMovies.map(({ id, title }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Movies;
