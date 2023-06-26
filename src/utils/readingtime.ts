import { createClient } from "@vrite/sdk/api";
import { createContentTransformer } from "@vrite/sdk/transformers";
import readingTime from "reading-time";
import { loadEnv } from "vite";

const { VRITE_ACCESS_TOKEN } = loadEnv(
	import.meta.env.MODE,
	`${process.cwd()}/../../.env`,
	""
);

// const VRITE_ACCESS_TOKEN="axLALpQOENP-j8IR_C4Ge:4rqnaR8ff2ksS_HjibATF"

const client = createClient({
    token: VRITE_ACCESS_TOKEN
});

export const getReadingTime = async (id: string) => {
    const contentPiece = await client.contentPieces.get({ id: id, content: true });
    const rawTextTransformer = createContentTransformer({
        applyInlineFormatting(type, attrs, content) {
            return content;
        },
        transformNode(type, attrs, content) {
            if (type === "codeBlock") {
                return "";
            }

            return content;
        }
    });

    const rawText = rawTextTransformer(contentPiece.content);

    return {
        content: contentPiece.content,
        readingTime: readingTime(rawText).text
    };
};