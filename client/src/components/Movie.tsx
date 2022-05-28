import { gql, useQuery } from '@apollo/client';
import { Button } from 'flowbite-react';
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{data?.movie.title}</h1>
      <figure>
        <img
          src={data?.movie.medium_cover_image}
          alt={`${data?.movie.title}커버 이미지`}
        />
      </figure>
      <Button onClick={handleClick} className="mt-3">
        {data?.movie?.isLiked ? 'Unlike' : 'like'}
      </Button>
    </div>
  );
};

export default Movie;
