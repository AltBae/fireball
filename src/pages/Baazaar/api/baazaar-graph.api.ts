import { GRAPH_CORE_API } from 'shared/constants';
import { TheGraphResponse } from 'shared/models';
import { TheGraphCoreApi } from 'api';

import { GotchiListingDTO, ClosedPortalListingDTO, WearableListingDTO } from '../models';

export class BaazaarGraphApi {
    public static async getBaazaarGotchis(query: string): Promise<GotchiListingDTO[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc721Listings: GotchiListingDTO[] }>) => res.data.erc721Listings);
    }

    public static async getClosedPortalsListings(query: string): Promise<ClosedPortalListingDTO[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc721Listings: ClosedPortalListingDTO[] }>) => res.data.erc721Listings);
    }

    public static async getWearablesListings(query: string): Promise<WearableListingDTO[]> {
        return TheGraphCoreApi.getGraphData(GRAPH_CORE_API, query)
            .then((res: TheGraphResponse<{ erc1155Listings: WearableListingDTO[] }>) => res.data.erc1155Listings);
    }
}
