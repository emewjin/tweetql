# tweetql

learning graphQL  
apollo studio를 client로 사용

- [x] 컨셉
- [x] 기본 문법
- [x] resolver
- [x] 명세 문서화
- [ ] 에러처리

## How to start

```
yarn dev
```

## Note

### 문법

- gql `SDL` : schema definition language의 약자로, gql에게 data shape을 설명하기 위함
  - 반드시 Query root type이 있어야 함.
  - 모든 필드는 기본적으로 nullable
- `[Type]` : 배열(리스트)를 의미
- `!`: required를 의미
  - arg에 붙으면 필수 인자, return 값에 붙으면 non-nullable을 의미
  - required arg를 넘기지 않으면 `Field "tweet" argument "id" of type "ID!" is required, but it was not provided.` 에러 발생
  - return type이 ! 인데 resolver가 없으면 `"message": "Cannot return null for non-nullable field Query.tweet."` 에러 발생
- REST API를 기준으로 생각했을 때
  - GET : `type Query`
  - POST, DELETE, PUT과 같이 mutate하는 모든 것들 : `type Mutation`
- Scalar type : graphql 내장 타입. String, Int, Boolean, ID 등등이 있다.

**Operation**

```gql
query ExampleQuery {
  allTweets {
    id
  }
  tweet(id: "2") {
    text
  }
}

mutation {
  postTweet {
    id
  }
}
```

### resolver

- 모든 타입의 모든 필드에 대해 작성 가능
- 연산 및 유사 join 가능

### 문서화

거의 대부분의 graphQL 클라이언트들이 문서를 지원하고 있음.

![image](https://user-images.githubusercontent.com/76927618/170818386-8c1df94c-f2f1-4594-b742-46158e8974f7.png)

### REST -> GraphQL 래핑

- FE에서는 GraphQL을, BE에서는 REST를 쓰고 싶을 때
- 기존재하는 REST api를 GraphQL로 쓰고 싶을 때

아주 작은 GraphQL 서버를 쓰거나 express 서버 최상단에 apollo를 두고 REST api를 GraphQL로 변환할 수 있다.

type, field를 하나하나 다 선언해주어야 하는데 매우 귀찮아보임. 대신해주는 툴이 분명히 있을듯...  
그리고 resolver에서 fetch해서 그 응답값을 반환하도록 래핑하는 것.

### error 처리
