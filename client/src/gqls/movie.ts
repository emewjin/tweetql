import { gql } from '@apollo/client';

interface Movie {
  id: number;
  title: string;
}

export interface MovieData {
  movie: Movie;
}

export interface MovieVariables {
  movieId: string | undefined;
}

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    # resolver
    movie(id: $movieId) {
      id
      title
    }
  }
`;

export default GET_MOVIE;
