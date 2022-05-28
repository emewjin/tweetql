import { gql } from '@apollo/client';

interface Movie {
  id: number;
  title: string;
  medium_cover_image: string;
  isLiked: boolean;
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
      # remote fields : cache -> API (graphql)
      id
      title
      medium_cover_image
      # local only fields : cache -X-> API (graphql)
      isLiked @client
    }
  }
`;

export default GET_MOVIE;
