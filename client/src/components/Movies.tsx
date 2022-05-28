import { gql, useApolloClient } from '@apollo/client';
import { useEffect, useState } from 'react';

type Movie = {
  id: string;
  title: string;
};

const Movies = () => {
  const client = useApolloClient();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getMovies() {
      const {
        data: { allMovies },
        loading,
      } = await client.query({
        query: gql`
          {
            allMovies {
              title
              id
            }
          }
        `,
      });
      setMovies(allMovies);
      setIsLoading(loading);
    }
    getMovies();
  }, [client]);

  return (
    <div>
      <h1 className="text-2xl">Movies</h1>
      <p>{isLoading ? 'isLoading...' : ''}</p>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
