const typeDefs = `

type User {
  _id: ID
  username: String!
  email: String!
  savedBooks: [Book]
  bookCount: Int
}
type Book {
  authors: [String]
  description: String
  bookId: ID!
  image: String
  link: String
  title: String
}

input BookInput {
  authors: [String]
  description: String
  bookId: String!
  image: String
  link: String
  title: String!
}


type Auth {
  token: ID!
  user: User
}
  type Query {
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookInput: BookInput): User
    removeBook(bookId: String!): User
  }
  
  
  
  `;
module.exports = typeDefs;

// type Query {
//   me: User
//   book: [Book]
//   user(id: ID!): User
// }
