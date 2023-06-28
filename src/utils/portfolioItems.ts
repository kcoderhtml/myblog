import { createClient } from "@vrite/sdk/api";

const client = createClient({
    token: import.meta.env.VRITE_ACCESS_TOKEN
});

export module PortfolioItems {
    export const getPortfolioItems = async () => {
        const contentPieces = await client.contentPieces.list({
            contentGroupId: import.meta.env.VRITE_PORTFOLIO_GROUP_ID,
        });

        return {
            contentPieces: contentPieces
        };
    }
};
