import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import classNames from 'classnames';
import qs from 'query-string';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import {
    CustomParsedQuery,
    GraphFiltersQueryParamTypes,
    GraphFiltersValueTypes,
    GraphQueryParams,
    SortingItem,
    SortingListItem
} from 'shared/models';
import { Aavegotchi } from 'pages/BaazaarOld/components/BaazaarSidebar/components/ItemTypes/Aavegotchi';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { GotchiIcon } from 'components/Icons/Icons';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { GraphFiltersUtils, RouteUtils } from 'utils';

import { GotchiListingsFilterTypes } from '../../constants';
import { GotchiListingVM, GotchiListingsFilters } from '../../models';
import {
    getGotchisListings,
    getGotchisListingsFilters,
    getGotchisListingsGraphQueryParams,
    getGotchisDefaultListingsSorting,
    getGotchisListingsSorting,
    getGotchisListingsLimitPerLoad,
    getGotchisListingsQueryParamsOrder,
    onLoadBaazaarGotchisListings,
    loadBaazaarGotchisListings,
    resetGotchiListingsData,
    resetGotchiListingsFilters,
    setGotchisListingsSkipLimit,
    setGotchisListingsSorting,
    setGotchisListingsFilters,
    updateGotchiListingsFilterByKey,
    setGotchisListingsIsFiltersUpdated,
    setGotchisListingsIsSortingUpdated
} from '../../store';
import { gotchisListingsSortings } from '../../static/sortings';

import { styles } from './styles';

export function BaazaarGotchis() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(
        location.search,
        { arrayFormat: 'comma' }
    ) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

    const dispatch = useAppDispatch();
    const gotchiListings: GotchiListingVM[] = useAppSelector(getGotchisListings);
    const gotchisListingsGraphQueryParams: GraphQueryParams = useAppSelector(getGotchisListingsGraphQueryParams);
    const gotchisListingsFilters: GotchiListingsFilters = useAppSelector(getGotchisListingsFilters);
    const gotchisDefaultListingsSorting: SortingItem = useAppSelector(getGotchisDefaultListingsSorting);
    const gotchisListingsSorting: SortingItem = useAppSelector(getGotchisListingsSorting);
    const gotchisListingsLimitPerLoad: number = useAppSelector(getGotchisListingsLimitPerLoad);
    const gotchisListingsQueryParamsOrder: string[] = useAppSelector(getGotchisListingsQueryParamsOrder);

    useEffect(() => {
        const updatedFilters: GotchiListingsFilters =
            GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, { ...gotchisListingsFilters });
        dispatch(setGotchisListingsFilters(updatedFilters));

        const { sort, dir } = queryParams as CustomParsedQuery<GraphFiltersQueryParamTypes>;

        if (sort && dir) {
            const key: Undefinable<string> = gotchisListingsSortings
                .find((sorting: SortingListItem) => sorting.paramKey === sort)?.key;

            if (key) {
                onSortingChange(key, dir as string);
            }
        }

        return () => {
            dispatch(resetGotchiListingsData());
        };
    }, []);

    useEffect(() => {
        let params: CustomParsedQuery<GraphFiltersQueryParamTypes> =
            GraphFiltersUtils.getFiltersQueryParams(queryParams, { ...gotchisListingsFilters });

        const paramKey: Undefinable<string> = gotchisListingsSortings
            .find(sorting => sorting.key === gotchisListingsSorting.type)?.paramKey;

        if (paramKey) {
            if (
                gotchisListingsSorting.dir === gotchisDefaultListingsSorting.dir &&
                gotchisListingsSorting.type === gotchisDefaultListingsSorting.type
            ) {
                delete params['sort'];
                delete params['dir'];

                params = { ...params };
            } else {
                params = { ...params, sort: paramKey, dir: gotchisListingsSorting.dir };
            }
        }

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, gotchisListingsQueryParamsOrder);

        dispatch(onLoadBaazaarGotchisListings());
    }, [gotchisListingsFilters, gotchisListingsSorting]);

    useEffect(() => {
        dispatch(setGotchisListingsIsFiltersUpdated(true));
    }, [gotchisListingsFilters]);

    useEffect(() => {
        dispatch(setGotchisListingsIsSortingUpdated(true));
    }, [gotchisListingsSorting]);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(setGotchisListingsSorting({ type: sortBy, dir: sortDir }));
    };

    const onHandleReachedEnd = (): void => {
        const skipLimit: number = gotchisListingsGraphQueryParams.skip + gotchisListingsLimitPerLoad;

        if (skipLimit <= gotchiListings.length) {
            dispatch(setGotchisListingsSkipLimit(skipLimit));
            dispatch(loadBaazaarGotchisListings());
        }
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        dispatch(updateGotchiListingsFilterByKey({ key, value } as { key: GotchiListingsFilterTypes, value: GraphFiltersValueTypes }));
    };

    const onResetFilters = useCallback(() => {
        dispatch(resetGotchiListingsFilters());
    }, []);

    return (
        <ContentWrapper>
            <>
                <SortFilterPanel
                    sorting={{
                        sortingList: gotchisListingsSortings,
                        sortingDefaults: gotchisListingsSorting,
                        onSortingChange: onSortingChange
                    }}
                    itemsLength={gotchiListings.length}
                    placeholder={
                        <GotchiIcon width={20} height={20} />
                    }
                />
                <ContentInner dataLoading={false}>
                    <ItemsLazy
                        items={gotchiListings}
                        component={(gotchiListing: GotchiListingVM) => <Aavegotchi item={gotchiListing} />}
                        onHandleReachedEnd={onHandleReachedEnd}
                    />
                </ContentInner>
            </>
            <>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={gotchisListingsFilters}
                    onSetSelectedFilters={onSetSelectedFilters}
                />

                <div className={classes.buttonsWrapper}>
                    <Button
                        variant='contained'
                        color='warning'
                        size='small'
                        onClick={onResetFilters}
                    >
                        Reset
                    </Button>
                </div>
            </>
        </ContentWrapper>
    );
}
