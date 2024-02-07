import { createClient } from "@vrite/sdk/api";

const vrite = createClient({
  token: process.env.VRITE_ACCESS_TOKEN || '',
});

const vritePosts = await vrite.contentPieces.list({
  contentGroupId: process.env.VRITE_CONTENT_GROUP_ID || '',
});

console.log(vritePosts);
