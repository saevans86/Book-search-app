const typeDefs = `
type User {
      _id: ID
    username: String
    email: String
    password: String
    bookCount: String
    savedBooks: string

}
Type Book {

    bookId: ID
  authors: String
  description: String
  title: String
  image: String
  link: string
}
      type Auth {
    token: ID!
    user: User
  }
}
`;
module.exports = typeDefs;
