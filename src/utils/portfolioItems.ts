import { createClient } from "@vrite/sdk/api";
import type { Client } from "@vrite/sdk/api";
import type { ContentPieceWithAdditionalData } from "@vrite/sdk/api";


const client = createClient({
    token: import.meta.env.VRITE_ACCESS_TOKEN
});

const getContentPieces = async (
    contentGroupId: string,
    config?: {
        limit?: number | "all";
        startPage?: number;
        tagId?: string;
    }
): Promise<Array<Omit<ContentPieceWithAdditionalData, "content">>> => {
    const contentPieces: Array<Omit<ContentPieceWithAdditionalData, "content">> = [];

    let page = config?.startPage || 1;

    const fetchPage = async (): Promise<void> => {
        const paginatedContentPieces = await (client as Client).contentPieces.list({
            contentGroupId,
            page,
            perPage: config?.limit === "all" ? 50 : config?.limit || 50,
            tagId: config?.tagId
        });

        contentPieces.push(...paginatedContentPieces);

        if (config?.limit === "all" && paginatedContentPieces.length === 50) {
            page += 1;
            await fetchPage();
        }
    };

    await fetchPage();

    return contentPieces;
};

const getPortfolioItems = async () => {
    const contentPieces = await client.contentPieces.list({
        contentGroupId: import.meta.env.VRITE_PORTFOLIO_GROUP_ID,
    });

    return {
        contentPieces: contentPieces
    };
}

const getStaticPaths = async (
    contentGroupId: string
): Promise<
    Array<{
        params: { slug: string };
        props: Omit<ContentPieceWithAdditionalData, "content">;
    }>
> => {
    const contentPieces = await getContentPieces(import.meta.env.VRITE_PORTFOLIO_GROUP_ID, {
        limit: "all"
    });

    return contentPieces.map((contentPiece) => {
        return {
            params: {
                slug: contentPiece.slug
            },
            props: contentPiece
        };
    });
};

export { getContentPieces, getPortfolioItems, getStaticPaths }