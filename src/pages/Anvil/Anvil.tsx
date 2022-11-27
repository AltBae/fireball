import { useState } from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { CardImage } from 'components/ItemCard/components';
import { InstallationsUtils } from 'utils';
import installations from 'data/installations.data.json';

import { AnvilCalculator } from './components/AnvilCalculator';
import { AnvilItem, AnvilOptions } from './models';

import { styles } from './styles';

const options: AnvilOptions[] = [
    { index: 10, levels: 9 }, // altar
    { index: 56, levels: 9 }, // fud harvester
    { index: 65, levels: 9 }, // fomo harvester
    { index: 92, levels: 9 } // fud reservoir
];

const items = options.map((item: AnvilOptions): AnvilItem => {
    const metadata = InstallationsUtils.getMetadataById(item.index);
    const levels = [...installations].splice(item.index, item.levels);

    return {
        id: item.index,
        name: metadata.name.toLowerCase(),
        type: metadata.type,
        width: metadata.width,
        height: metadata.height,
        levels: levels.map((_, i) => {
            const instIndex = item.index + i;

            return { id: instIndex, ...InstallationsUtils.getMetadataById(instIndex) };
        })
    };
});

export function Anvil() {
    const classes = styles();

    const [anvil, setAnvil] = useState(items[0].name);

    const handleAnvil = (event: SelectChangeEvent) => {
        setAnvil(event.target.value as string);
    };

    const findSelectedAnvil = (name: string) => {
        return items.find((item) => item.name === name);
    };

    const selectedAnvil = findSelectedAnvil(anvil);

    return (
        <div className={classes.anvilWrapper}>
            <div className={classes.anvilTitle}>
                <h1>Anvil</h1>
                <Select
                    id='anvil'
                    value={anvil}
                    size='small'
                    onChange={handleAnvil}
                    className={classes.anvilSelectWrapper}
                >
                    {items.map((option) => (
                        <MenuItem value={option.name} key={option.id}>
                            <CardImage id={option.id} className={classes.anvilSelectImage} category='4' />
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>

            {selectedAnvil && <AnvilCalculator anvil={selectedAnvil} />}
        </div>
    );
}