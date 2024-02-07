import { createClient } from "@vrite/sdk/api";
import { getTaggedPosts } from "./scrappy";
import OpenAI from "openai";

// ----------------
// Config
// ----------------

const vrite = createClient({
  token: process.env.VRITE_SHIPPER_TOKEN || "",
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

// ----------------
// Functions
// ----------------

async function createContentPiece(
  title: string,
  description: string,
  body: string,
  scrappyId: string,
  date: any,
  coverUrl: string,
) {
  const contentPiece = await vrite.contentPieces.create({
    contentGroupId: process.env.VRITE_CONTENT_GROUP_ID || "",
    title: title,
    description: description,
    content: body,
    tags: [],
    customData: {
      id: scrappyId,
    },
    members: ["64974cb888e8beebeb2c925f"],
    date: date,
    coverUrl: coverUrl,
  });
  return contentPiece;
}

// ----------------
// Main
// ----------------

// read vrite posts

/**
 * Synchronizes posts by fetching new posts, summarizing them, and creating content pieces.
 * @returns An array containing the created content piece and the number of new posts.
 */
export async function syncPosts() {
  const vritePosts = await vrite.contentPieces.list({
    contentGroupId: process.env.VRITE_CONTENT_GROUP_ID || "",
  });

  // get tagged posts
  const taggedPosts = await getTaggedPosts("Kieran", "ship");

  // find scrappy posts that aren't in vrite
  const newPosts = taggedPosts.filter((post: any) => {
    return !vritePosts.some(
      (vritePost: any) => vritePost.customData?.id === post.id,
    );
  });

  let contentPieces: any[] = [];

  let counter = 0;
  for (const post of newPosts) {
    counter++;
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are an expert post summarizer" },
        {
          role: "user",
          content: `Summarize this project from a first person perspective; make the description a sentence or less and start with the 🚢 emoji: ${post.text}
                    Do not include any explanations, only provide a RFC8259 compliant JSON response following this format without deviation.
                    [{
                        "title": "🚢 The title of the project",
                        "description": "The description of project"
                    }]
                    The JSON response:`,
        },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });

    const jsonPost = JSON.parse(
      chatCompletion.choices[0].message.content as string,
    );

    // add images to the description with markdown syntax for the images in the attachments ommiting the first one
    const body =
      `<img src="` + post.attachments[0] + `" alt="attachment" />` +
      post.text +
      "" +
      post.attachments
        .slice(1)
        .map(
          (attachment: any) => `<img src="${attachment}" alt="attachment" />`,
        )
        .join("\n\n");

    contentPieces.push(
      await createContentPiece(
        jsonPost.title,
        jsonPost.description,
        body,
        post.id,
        post.postedAt,
        post.attachments[0],
      ),
    );
    console.log(
      `Created content piece ` +
        counter +
        ` of ` +
        newPosts.length +
        `: ${post.id}`,
    );
  }

  return [contentPieces, newPosts.length];
}
