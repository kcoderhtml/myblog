import { createClient } from "@vrite/sdk/api";
import { createContentTransformer } from "@vrite/sdk/transformers";
import readingTime from "reading-time";

const client = createClient({
    token: import.meta.env.VRITE_ACCESS_TOKEN
});

export module ReadingTime {
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
}