import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import GET_MOVIE, { MovieData, MovieVariables } from '../gqls/movie';

const Movie = () => {
  const { id } = useParams();

  const {
    data,
    loading,
    error,
    client: { cache },
  } = useQuery<MovieData, MovieVariables>(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error!</p>;
  }

  const handleClick = () => {
    cache.writeFragment({
      id: `Movie:${id}`,
      fragment: gql`
        fragment MovieFragment on Movie {
          isLiked
        }
      `,
      data: {
        isLiked: data?.movie.isLiked ? false : true,
      },
    });
  };

  return (
    <div>
      <h1 className="text-2xl">{data?.movie.title}</h1>
      <figure>
        <img
          src={data?.movie.medium_cover_image}
          alt={`${data?.movie.title}커버 이미지`}
        />
      </figure>
      <button onClick={handleClick}>
        {data?.movie?.isLiked ? 'Unlike' : 'like'}
      </button>
    </div>
  );
};

export default Movie;
