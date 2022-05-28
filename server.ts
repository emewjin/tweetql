import { ApolloServer, gql } from 'apollo-server';
// GraphQL 익스텐션을 설치해야 syntax highlighting가능

const typeDefs = gql`
  type User {
    # return type은 ID 혹은 null
    id: ID
    # return type은 오직 String
    username: String!
  }
  type Tweet {
    id: ID
    text: String
    # DB의 관계
    author: User
  }
  # GET
  type Query {
    # Tweet의 배열을 반환
    allTweets: [Tweet]
    # query parameter / path parameter는 argument로
    tweet(id: ID): Tweet
  }
  # POST, DELETE, PUT과 같이 mutate하는 모든 것들
  type Mutation {
    # text는 필수값, userId는 옵셔널
    postTweet(text: String!, userId: ID): Tweet
    deleteTweet(id: ID): Boolean
  }
`;

const server = new ApolloServer({ typeDefs });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
