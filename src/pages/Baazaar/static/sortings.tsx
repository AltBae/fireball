import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GrainIcon from '@mui/icons-material/Grain';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import HeightIcon from '@mui/icons-material/Height';
import HouseIcon from '@mui/icons-material/House';
import ScienceIcon from '@mui/icons-material/Science';

import { SortingListItem } from 'shared/models';
import { AlphaIcon, FomoIcon, FudIcon, KekIcon } from 'components/Icons/Icons';

export const gotchiListingsSortings: SortingListItem[] = [
    {
        name: 'price',
        key: 'priceInWei',
        tooltip: 'price',
        icon: <AttachMoneyIcon fontSize='small' />
    },
    {
        name: 'time created',
        key: 'timeCreated',
        tooltip: 'time created',
        icon: <AccessTimeIcon fontSize='small' />
    },
    {
        name: 'id',
        key: 'tokenId',
        tooltip: 'gotchi id',
        icon: <Grid3x3Icon fontSize='small' />
    },
    {
        name: 'mrs',
        key: 'modifiedRarityScore',
        tooltip: 'rarity score',
        icon: <EmojiEventsOutlinedIcon fontSize='small' />
    },
    {
        name: 'brs',
        key: 'baseRarityScore',
        tooltip: 'base rarity score',
        icon: <FormatListNumberedIcon fontSize='small' />
    },
    {
        name: 'kin',
        key: 'kinship',
        tooltip: 'kinship',
        icon: <FavoriteBorderIcon fontSize='small' />
    },
    {
        name: 'experience',
        key: 'experience',
        tooltip: 'experience',
        icon: <ScienceIcon fontSize='small' />
    }
];

export const parcelsListingsSortings: SortingListItem[] = [
    {
        name: 'size',
        key: 'size',
        paramKey: 'size',
        tooltip: 'size',
        icon: <HeightIcon fontSize='small' />
    },
    {
        name: 'district',
        key: 'district',
        paramKey: 'district',
        tooltip: 'district',
        icon: <HouseIcon fontSize='small' />
    },
    {
        name: 'price',
        key: 'priceInWei',
        tooltip: 'price',
        icon: <AttachMoneyIcon fontSize='small' />
    },
    {
        name: 'time created',
        key: 'timeCreated',
        tooltip: 'time created',
        icon: <AccessTimeIcon fontSize='small' />
    },
    {
        name: 'id',
        key: 'tokenId',
        tooltip: 'parcel id',
        icon: <Grid3x3Icon fontSize='small' />
    },
    {
        name: 'fudBoost',
        key: 'fudBoost',
        paramKey: 'fud',
        tooltip: 'fud boost',
        icon: <FudIcon height={18} width={18} />
    },
    {
        name: 'fomoBoost',
        key: 'fomoBoost',
        paramKey: 'fomo',
        tooltip: 'fomo boost',
        icon: <FomoIcon height={18} width={18} />
    },
    {
        name: 'alphaBoost',
        key: 'alphaBoost',
        paramKey: 'alpha',
        tooltip: 'alpha boost',
        icon: <AlphaIcon height={18} width={18} />
    },
    {
        name: 'kekBoost',
        key: 'kekBoost',
        paramKey: 'kek',
        tooltip: 'kek boost',
        icon: <KekIcon height={18} width={18} />
    }
];

export const closedPortalsListingsSortings: SortingListItem[] = [
    {
        name: 'price',
        key: 'priceInWei',
        tooltip: 'price',
        icon: <AttachMoneyIcon fontSize='small' />
    },
    {
        name: 'time created',
        key: 'timeCreated',
        tooltip: 'time created',
        icon: <AccessTimeIcon fontSize='small' />
    },
    {
        name: 'id',
        key: 'tokenId',
        tooltip: 'portal id',
        icon: <Grid3x3Icon fontSize='small' />
    }
];

export const wearablesListingsSortings: SortingListItem[] = [
    {
        name: 'rarity',
        key: 'rarityLevel',
        paramKey: 'rarity',
        tooltip: 'rarity',
        icon: <GrainIcon fontSize='small' />
    },
    {
        name: 'price',
        key: 'priceInWei',
        tooltip: 'price',
        icon: <AttachMoneyIcon fontSize='small' />
    },
    {
        name: 'time created',
        key: 'timeCreated',
        tooltip: 'time created',
        icon: <AccessTimeIcon fontSize='small' />
    }
];

export const consumablesListingsSortings: SortingListItem[] = [
    {
        name: 'rarity',
        key: 'rarityLevel',
        paramKey: 'rarity',
        tooltip: 'rarity',
        icon: <GrainIcon fontSize='small' />
    },
    {
        name: 'price',
        key: 'priceInWei',
        tooltip: 'price',
        icon: <AttachMoneyIcon fontSize='small' />
    },
    {
        name: 'time created',
        key: 'timeCreated',
        tooltip: 'time created',
        icon: <AccessTimeIcon fontSize='small' />
    }
];
