import normalizr from "normalizr";

// Normalize y schemas
const normalize = normalizr.normalize;
const schema = normalizr.schema;

const authorSchema = new schema.Entity("authors", {}, { idAttribute: "email" });
const messageSchema = new schema.Entity(
  "messages",
  { author: authorSchema },
  { idAttribute: "id" }
);
const posts = new schema.Entity("posts", {
  messages: [messageSchema],
});

export { normalize, posts };
