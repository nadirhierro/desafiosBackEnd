import { buildSchema } from "graphql";

const schema = buildSchema(`
type Product {
    id:ID!,
    title: String,
    price: Int,
    thumbnail: String,
}
type Author {
    email: String,
    alias: String,
    name: String,
    surname: String,
    age: Int,
    avatar: String
}
type Message {
    id: ID!,
    timestamp: String!,
    author: Author,
    message: String,
}
input AuthorInput{
    email: String,
    alias: String,
    name: String,
    surname: String,
    age: Int,
    avatar: String
}
input ProductInput{
    title: String,
    price: Int,
    thumbnail: String,
}
input MessageInput {
    author: AuthorInput,
    message: String,
}
type Query {
    getProducts(field: String, value: String): [Product],
    getProductById(id:ID!): Product,
    getMessages(field: String, value: String): [Message],
}
type Mutation {
    createProduct(data: ProductInput): Product,
    changeProduct(id: ID!, data: ProductInput): Product,
    deleteProduct(id: ID!): Product,
    createMessage(data: MessageInput): Message,
}
`);

export default schema;
