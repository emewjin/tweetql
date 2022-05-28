import { useQuery } from '@apollo/client';
import { ListGroup } from 'flowbite-react';
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movies</h1>
      <ListGroup>
        {data &&
          data.allMovies.map(({ id, title }) => (
            <ListGroup.Item key={id}>
              <Link to={`/movies/${id}`}>{title}</Link>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default Movies;
