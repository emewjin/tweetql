import { gql } from '@apollo/client';

interface Movie {
  id: number;
  title: string;
}

export interface MoviesData {
  allMovies: Movie[];
}

// 공식문서에서 확인한 네이밍 컨벤션
const GET_ALL_MOVIES = gql`
  {
    allMovies {
      title
      id
    }
  }
`;

export default GET_ALL_MOVIES;
