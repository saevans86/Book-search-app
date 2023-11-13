const typeDefs = `

type Query {
  me: User
}
  type User {
    _id: ID
    username: String
    email: String
    password: String
    bookCount: [savedBooks]!
  }
  type Book {
    authors: [authors] String
    description: String!
    bookId: ID!
    image: String
    title: String!
  }
  type Auth {
    token: ID!
    user: User
  }
    type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(authors: String[authors], description: String!, bookId: String!, image: String, link: String!, title: String! ): Book
    removeBook(bookId: String!) User

    }


`;
module.exports = typeDefs;
