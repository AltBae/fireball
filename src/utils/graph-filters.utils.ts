import { FilterDomainType, GraphComparatorOptions, GraphFiltersDataType, GraphFiltersHelperType } from 'shared/constants';
import {
    FilterGraphItemOption,
    GraphFiltersTypes,
    GraphFiltersValueTypes,
    GraphInputFilter,
    GraphInputFilterValue,
    GraphMultiAutocompleteFilter,
    GraphMultiButtonSelectionFilter,
    GraphMultipleSelectionFilterValue,
    GraphRangeSliderFilter,
    GraphRangeSliderFilterValue
} from 'shared/models';

import { GraphFiltersHelper } from './graph-filters.helpers';

export class GraphFiltersUtils {
    public static onGetUpdatedSelectedGraphFilter(
        filter: GraphFiltersTypes,
        value: GraphFiltersValueTypes
    ): GraphFiltersTypes {
        switch (filter.dataType) {
            case GraphFiltersDataType.Input:
                return GraphFiltersUtils.getUpdatedSelectedFilter<GraphInputFilter, GraphInputFilterValue>(
                    filter,
                    value as GraphInputFilterValue,
                    GraphFiltersHelper.getIsInputFilterValid,
                    GraphFiltersHelper.getResetedInputFilter,
                    GraphFiltersHelper.getUpdatedInputFromFilter
                );
            case GraphFiltersDataType.MultiAutocomplete:
                return GraphFiltersUtils.getUpdatedSelectedFilter<GraphMultiAutocompleteFilter, GraphMultipleSelectionFilterValue>(
                    filter,
                    value as GraphMultipleSelectionFilterValue,
                    GraphFiltersHelper.getIsMultipleAutocompleteFilterValid,
                    GraphFiltersHelper.getResetedMultipleAutocompleteFilter,
                    GraphFiltersHelper.getUpdatedMultipleAutocompleteFromFilter
                );
            case GraphFiltersDataType.MultiButtonSelection:
                return GraphFiltersUtils.getUpdatedSelectedFilter<GraphMultiButtonSelectionFilter, GraphMultipleSelectionFilterValue>(
                    filter,
                    value as GraphMultipleSelectionFilterValue,
                    GraphFiltersHelper.getIsMultipleSelectionFilterValid,
                    GraphFiltersHelper.getResetedMultipleSelectionFilter,
                    GraphFiltersHelper.getUpdatedMultipleSelectionFromFilter
                );
            case GraphFiltersDataType.RangeSlider:
                return GraphFiltersUtils.getUpdatedSelectedFilter<GraphRangeSliderFilter, GraphRangeSliderFilterValue>(
                    filter,
                    value as GraphRangeSliderFilterValue,
                    GraphFiltersHelper.getIsRangeSliderFilterValid,
                    GraphFiltersHelper.getResetedRangeSliderFilter,
                    GraphFiltersHelper.getUpdatedRangeSliderFromFilter
                );
        }
    }

    public static getResetedFilterByType(filter: GraphFiltersTypes): GraphFiltersTypes {
        switch (filter.dataType) {
            case GraphFiltersDataType.Input:
                return GraphFiltersHelper.getResetedInputFilter(filter);
            case GraphFiltersDataType.MultiAutocomplete:
                return GraphFiltersHelper.getResetedMultipleAutocompleteFilter(filter);
            case GraphFiltersDataType.MultiButtonSelection:
                return GraphFiltersHelper.getResetedMultipleSelectionFilter(filter);
            case GraphFiltersDataType.RangeSlider:
                return GraphFiltersHelper.getResetedRangeSliderFilter(filter);
        }
    }

    public static onHandleFilterHelper(helperType: GraphFiltersHelperType, value: any): string {
        switch (helperType) {
            case GraphFiltersHelperType.Price:
                return GraphFiltersUtils.priceToWeiHelper(value);
        }
    }

    public static priceToWeiHelper(value: any): string {
        return value ? `"${value}000000000000000000"` : '0';
    }

    public static getGraphWhereParam(filter: GraphFiltersTypes): string {
        let param: string = '';

        switch (filter.dataType) {
            case GraphFiltersDataType.Input:
                switch (filter.filterDomainType) {
                    case FilterDomainType.Equals:
                        param = '';

                        break;
                    case FilterDomainType.SingleRange: {
                        const targetValue = filter.helperType ? GraphFiltersUtils.onHandleFilterHelper(filter.helperType, filter.value) : filter.value;

                        param = `\n ${filter.key}_${filter.graphComparatorOptions[0]}: ${targetValue}`;

                        break;
                    }
                    case FilterDomainType.Range:
                        param = '';

                        break;
                }

                return param;
            case GraphFiltersDataType.MultiAutocomplete:
                switch (filter.filterDomainType) {
                    case FilterDomainType.Equals:
                        param = `\n ${filter.key}_${filter.graphComparatorOptions[0]}: [${
                            filter.items
                                .filter((item: FilterGraphItemOption) => item.isSelected)
                                .map((item: FilterGraphItemOption) => {
                                    if (item.graphValues) {
                                        return item.graphValues.map((val: string) => `"${val}"`);
                                    } else {
                                        return `"${item.value}"`;
                                    }
                                })
                        }]`;

                        break;
                    case FilterDomainType.SingleRange:
                        param = '';

                        break;
                    case FilterDomainType.Range:
                        param = '';

                        break;
                }

                return param;
            case GraphFiltersDataType.MultiButtonSelection:
                switch (filter.filterDomainType) {
                    case FilterDomainType.Equals:
                        param = `\n ${filter.key}_${filter.graphComparatorOptions[0]}: [${
                            filter.items
                                .filter((item: FilterGraphItemOption) => item.isSelected)
                                .map((item: FilterGraphItemOption) => {
                                    if (item.graphValues) {
                                        return item.graphValues.map((val: string) => `"${val}"`);
                                    } else {
                                        return `"${item.value}"`;
                                    }
                                })
                        }]`;

                        break;
                    case FilterDomainType.SingleRange:
                        param = '';

                        break;
                    case FilterDomainType.Range:
                        param = '';

                        break;
                }

                return param;
            case GraphFiltersDataType.RangeSlider:
                switch (filter.filterDomainType) {
                    case FilterDomainType.Equals:
                        param = '';

                        break;
                    case FilterDomainType.SingleRange:
                        param = '';

                        break;
                    case FilterDomainType.Range:
                        filter.graphComparatorOptions.forEach((option: GraphComparatorOptions, index: number) => {
                            const targetValue = filter.helperType ? GraphFiltersUtils.onHandleFilterHelper(filter.helperType, filter.value[index]) : filter.value[index];

                            param += `\n ${filter.key}_${option}: ${targetValue}`;
                        });

                        break;
                }

                return param;
        }
    }

    private static getUpdatedSelectedFilter<T extends GraphFiltersTypes, K extends GraphFiltersValueTypes>(
        filter: T,
        value: K,
        getIsFilterValid: (value: K, filter: T) => boolean,
        getResetedFilter: (filter: T) => T,
        getUpdatedFromFilter: (filter: T, value: K) => T
    ): T {
        let filterCopy: T;

        if (getIsFilterValid(value, filter)) {
            filterCopy = getUpdatedFromFilter(filter, value);
        } else {
            filterCopy = getResetedFilter(filter);
        }

        return filterCopy;
    }
}
