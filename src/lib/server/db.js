import { MongoClient } from "mongodb"
import { MONGODB_CONNEXION_STRING } from "$env/static/private"

const client = new MongoClient(MONGODB_CONNEXION_STRING);
await client.connect();
const database = client.db('Blog');

const usersRef = database.collection('users');
const resetPasswordTokensRef = database.collection("resetPasswordTokens");
const postsRef = database.collection("posts");
const newsletterRef = database.collection("newsletter");
export { usersRef, resetPasswordTokensRef, postsRef, newsletterRef }