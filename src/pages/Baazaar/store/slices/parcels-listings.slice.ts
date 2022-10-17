import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc721Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { ParcelListingFilters, ParcelListingVM } from '../../models';
import { parcelListingFiltersData } from '../../static/filters';

export interface ParcelsListingsState {
    parcelsListings: ParcelListingVM[];
    parcelsListingsLimitPerLoad: number;
    parcelsListingsGraphQueryParams: GraphQueryParams;
    parcelsListingsDefaultSorting: SortingItem;
    parcelsListingsSorting: SortingItem;
    parcelsListingsIsSortingUpdated: boolean;
    parcelsListingsFilters: ParcelListingFilters;
    parcelsListingsIsFiltersUpdated: boolean;
    parcelsListingsQueryParamsOrder: string[];
}

const initialState: ParcelsListingsState = {
    parcelsListings: [],
    parcelsListingsLimitPerLoad: 50,
    parcelsListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'asc',
        where: {
            category: Erc721Categories.Realm
        }
    },

    parcelsListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
    parcelsListingsSorting: { type: 'timeCreated', dir: 'desc' },
    parcelsListingsIsSortingUpdated: false,
    parcelsListingsFilters: parcelListingFiltersData,
    parcelsListingsIsFiltersUpdated: false,
    parcelsListingsQueryParamsOrder: [
        parcelListingFiltersData.size.queryParamKey,
        parcelListingFiltersData.district.queryParamKey,
        parcelListingFiltersData.priceInWei.queryParamKey,
        parcelListingFiltersData.fudBoost.queryParamKey,
        parcelListingFiltersData.fomoBoost.queryParamKey,
        parcelListingFiltersData.alphaBoost.queryParamKey,
        parcelListingFiltersData.kekBoost.queryParamKey,
        'sort',
        'dir'
    ]
};

export const parcelsListingsSlice = createSlice({
    name: 'parcelsListings',
    initialState,
    reducers: {
        setParcelsListings: (state, action: PayloadAction<ParcelListingVM[]>): void => {
            state.parcelsListings = action.payload;
        },
        setParcelsListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.parcelsListingsGraphQueryParams.skip = action.payload;
        },
        setParcelsListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.parcelsListingsSorting = action.payload;

            state.parcelsListingsGraphQueryParams.orderBy = action.payload.type;
            state.parcelsListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setParcelsListingsIsSortingUpdated: (state, action: PayloadAction<boolean>): void => {
            state.parcelsListingsIsSortingUpdated = action.payload;
        },
        setParcelsListingsFilters: (state, action: PayloadAction<ParcelListingFilters>): void => {
            state.parcelsListingsFilters = action.payload;
        },
        setParcelsListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
            state.parcelsListingsIsFiltersUpdated = action.payload;
        }
    }
});

export const {
    setParcelsListings,
    setParcelsListingsSkipLimit,
    setParcelsListingsSorting,
    setParcelsListingsIsSortingUpdated,
    setParcelsListingsFilters,
    setParcelsListingsIsFiltersUpdated
} = parcelsListingsSlice.actions;

export const parcelsListingsReducer = parcelsListingsSlice.reducer;
