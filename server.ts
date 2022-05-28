import { ApolloServer, gql } from 'apollo-server';
// GraphQL 익스텐션을 설치해야 syntax highlighting가능

// FAKE DB
const tweets = [
  {
    id: '1',
    text: 'first',
    // 일종의 Foreign key
    userId: '2',
  },
  { id: '2', text: 'second', userId: '1' },
];

const users = [
  {
    id: '1',
    firstName: 'Red',
    lastName: 'Hatter',
  },
  {
    id: '2',
    firstName: 'Green',
    lastName: 'Grinch',
  },
];

const typeDefs = gql`
  # 테이블
  type User {
    # return type은 ID 혹은 null
    id: ID
    # return type은 오직 String
    username: String!
    # DB에 없는 값
    fullName: String!
  }
  # 테이블
  """
  Tweet에 대한 설명을 적을 수 있다.
  """
  type Tweet {
    """
    필드에 대한 설명을 적을 수 있다.
    """
    id: ID
    text: String
    # relation
    author: User
  }
  # GET
  type Query {
    allUsers: [User!]!
    # Tweet의 배열을 반환
    allTweets: [Tweet]
    # query parameter / path parameter는 argument로
    tweet(id: ID): Tweet
    ping: String!
  }
  # POST, DELETE, PUT과 같이 mutate하는 모든 것들
  type Mutation {
    # text는 필수값, userId는 옵셔널
    postTweet(text: String!, userId: ID!): Tweet
    deleteTweet(id: ID): Boolean
  }
`;

const resolvers = {
  Query: {
    allTweets() {
      return tweets;
    },
    // resolver 파라미터 명세: (root: Query, args: 쿼리필드에 제공된 인자)
    tweet(root, { id }) {
      // root:  undefined args:  { id: '2' }
      // To be SQL
      return tweets.find((tweet) => tweet.id === id);
    },
    ping() {
      return 'pong';
    },
    allUsers() {
      // users를 조회했으나 fullName이 없는 것 확인 후 fullName resolver 사용
      return users;
    },
  },
  Mutation: {
    postTweet(root, { text, userId }) {
      // To be SQL
      const newTweet = {
        id: String(tweets.length + 1),
        text,
        userId,
      };
      tweets.push(newTweet);
      return newTweet;
    },
  },
  User: {
    // type User의 fullName field에 대한 resolver
    // root는 type User
    fullName(user) {
      console.log(user);
      return `${user.firstName} ${user.lastName}`;
    },
  },
  Tweet: {
    author({ userId }) {
      // tweets와 users간 유사 join
      return users.find((user) => user.id === userId);
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Running on ${url}`);
});
