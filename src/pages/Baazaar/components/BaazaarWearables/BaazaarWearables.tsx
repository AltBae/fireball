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
import { CardListing } from 'shared/components/CardListing/CardListing';
import { CardBalance, CardGroup, CardImage, CardName, CardSlot, CardStats } from 'components/ItemCard/components';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { WarehouseIcon } from 'components/Icons/Icons';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { GraphFiltersUtils, RouteUtils } from 'utils';

import { WearableListingFilterTypes } from '../../constants';
import { WearableListingFilters, WearableListingVM } from '../../models';
import {
    getWearablesListings,
    getWearablesListingsFilters,
    getWearablesListingsGraphQueryParams,
    getWearablesListingsLimitPerLoad,
    getWearablesListingsDefaultSorting,
    getWearablesListingsSorting,
    getWearablesListingsQueryParamsOrder,
    onLoadBaazaarWearablesListings,
    loadBaazaarWearablesListings,
    resetWearablesListingsData,
    resetWearablesListingsFilters,
    setWearablesListingsSkipLimit,
    setWearablesListingsSorting,
    setWearablesListingsIsSortingUpdated,
    setWearablesListingsFilters,
    setWearablesListingsIsFiltersUpdated,
    updateWearablesListingsFilterByKey
} from '../../store';
import { wearablesListingsSortings } from '../../static/sortings';

import { styles } from './styles';

export function BaazaarWearables() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(
        location.search,
        { arrayFormat: 'comma' }
    ) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

    const dispatch = useAppDispatch();
    const wearablesListings: WearableListingVM[] = useAppSelector(getWearablesListings);
    const wearablesListingsGraphQueryParams: GraphQueryParams = useAppSelector(getWearablesListingsGraphQueryParams);
    const wearablesListingsDefaultSorting: SortingItem = useAppSelector(getWearablesListingsDefaultSorting);
    const wearablesListingsSorting: SortingItem = useAppSelector(getWearablesListingsSorting);
    const wearablesListingsFilters: WearableListingFilters = useAppSelector(getWearablesListingsFilters);
    const wearablesListingsLimitPerLoad: number = useAppSelector(getWearablesListingsLimitPerLoad);
    const WearablesListingsQueryParamsOrder: string[] = useAppSelector(getWearablesListingsQueryParamsOrder);

    useEffect(() => {
        const updatedFilters: WearableListingFilters =
            GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, { ...wearablesListingsFilters });
        dispatch(setWearablesListingsFilters(updatedFilters));

        const { sort, dir } = queryParams;

        if (sort && dir) {
            const key: Undefinable<string> = wearablesListingsSortings
                .find((sorting: SortingListItem) => sorting.paramKey === sort)?.key;

            if (key) {
                onSortingChange(key, dir as string);
            }
        }

        return () => {
            dispatch(resetWearablesListingsData());
        };
    }, []);

    useEffect(() => {
        let params: CustomParsedQuery<GraphFiltersQueryParamTypes> =
            GraphFiltersUtils.getFiltersQueryParams(queryParams, { ...wearablesListingsFilters });

        const paramKey: Undefinable<string> = wearablesListingsSortings
            .find(sorting => sorting.key === wearablesListingsSorting.type)?.paramKey;

        if (paramKey) {
            if (
                wearablesListingsSorting.dir === wearablesListingsDefaultSorting.dir &&
                wearablesListingsSorting.type === wearablesListingsDefaultSorting.type
            ) {
                delete params['sort'];
                delete params['dir'];

                params = { ...params };
            } else {
                params = { ...params, sort: paramKey, dir: wearablesListingsSorting.dir };
            }
        }

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, WearablesListingsQueryParamsOrder);

        dispatch(onLoadBaazaarWearablesListings());
    }, [wearablesListingsFilters, wearablesListingsSorting]);

    useEffect(() => {
        dispatch(setWearablesListingsIsFiltersUpdated(true));
    }, [wearablesListingsFilters]);

    useEffect(() => {
        dispatch(setWearablesListingsIsSortingUpdated(true));
    }, [wearablesListingsSorting]);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(setWearablesListingsSorting({ type: sortBy, dir: sortDir }));
    };

    const onHandleReachedEnd = (): void => {
        const skipLimit: number = wearablesListingsGraphQueryParams.skip + wearablesListingsLimitPerLoad;

        if (skipLimit <= wearablesListings.length) {
            dispatch(setWearablesListingsSkipLimit(skipLimit));
            dispatch(loadBaazaarWearablesListings());
        }
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        dispatch(updateWearablesListingsFilterByKey({ key, value } as { key: WearableListingFilterTypes, value: GraphFiltersValueTypes }));
    };

    const onResetFilters = useCallback(() => {
        dispatch(resetWearablesListingsFilters());
    }, []);

    return (
        <ContentWrapper paddingZero>
            <>
                <SortFilterPanel
                    sorting={{
                        sortingList: wearablesListingsSortings,
                        sortingDefaults: wearablesListingsSorting,
                        onSortingChange: onSortingChange
                    }}
                    itemsLength={wearablesListings.length}
                    placeholder={
                        <WarehouseIcon width={20} height={20} />
                    }
                />
                <ContentInner dataLoading={false} offset={257}>
                    <ItemsLazy
                        items={wearablesListings}
                        component={(wearableListing: WearableListingVM) =>
                            <ItemCard
                                id={wearableListing.id}
                                category={wearableListing.category}
                                type={wearableListing.rarity}
                            >
                                <CardGroup name='header' className={classes.wearableHeader}>
                                    <CardSlot id={wearableListing.erc1155TypeId} className={classes.overridedSlot}/>
                                    <CardBalance balance={`${wearableListing.quantity}`} holders={[]} />
                                </CardGroup>
                                <CardGroup name='body'>
                                    <CardImage id={wearableListing.erc1155TypeId} />
                                    <CardName children={wearableListing.name} />
                                    <CardStats stats={wearableListing.traitModifiers} />
                                    <div className={classes.benefits}>
                                        <span className={classes.itemTypeValue}>{wearableListing.itemType}</span>
                                        <span className={classes.benefitValue}>{wearableListing.benefit.first}, {wearableListing.benefit.second}</span>
                                    </div>
                                </CardGroup>
                                <CardGroup name='footer'>
                                    <CardListing
                                        currentListing={wearableListing.currentListing}
                                        lastSoldListing={wearableListing.lastSoldListing}
                                    />
                                </CardGroup>
                            </ItemCard>
                        }
                        onHandleReachedEnd={onHandleReachedEnd}
                    />
                </ContentInner>
            </>
            <div className={classes.sidebar}>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={wearablesListingsFilters}
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
            </div>
        </ContentWrapper>
    );
}
