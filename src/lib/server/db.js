import { MongoClient } from "mongodb"
const client = new MongoClient("mongodb://localhost:27017");
await client.connect();
client.db('blogSvelte');
const database = client.db('blogSvelte');

const usersRef = database.collection('users');
const resetPasswordTokensRef = database.collection("resetPasswordTokens");
const postsRef = database.collection("posts");
const newsletterRef = database.collection("newsletter");
export { usersRef, resetPasswordTokensRef, postsRef, newsletterRef }