const db = require("../../data/db-config");

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
};

function find() {
  return db("posts");
}

function findById(id) {
  return db("posts")
    .where({ id: Number(id) })
    .first();
}

async function insert(post) {
  const [id] = await db("posts").insert(post, "id");
  return db("posts").where("id", id).first();
}

function update(id, post) {
  db("posts")
    .where("id", Number(id))
    .update(post)
    .then(db("posts").where("id", id).first());
}

function remove(id) {
  return db("posts").where("id", Number(id)).del();
}

function findPostComments(postId) {
  return db("comments")
    .join("posts", "posts.id", "post_id")
    .select("comments.*", "title as post")
    .where("post_id", postId);
}

function findCommentById(id) {
  return db("comments")
    .join("posts", "posts.id", "post_id")
    .select("comments.*", "title as post")
    .where("comments.id", id)
    .first();
}

function insertComment(comment) {
  return db("comments")
    .insert(comment)
    .then((ids) => ({ id: ids[0] }));
}
