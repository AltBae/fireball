import { CardGroup, CardImage, CardName, CardSize, CardSlot } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { AlchemicaPrice } from 'components/Items/common/AlchemicaPrice/AlchemicaPrice';
import { InstallationItem } from 'shared/models';

import { anvilSectionStyles } from '../styles';

export function AnvilSection({ item, imageIndex }: { item: InstallationItem; imageIndex: number }) {
    const classes = anvilSectionStyles();

    return (
        <div className={classes.anvilItem}>
            <ItemCard type='golden'>
                <CardGroup name='header'>
                    <CardSlot>{item.type}</CardSlot>
                    <CardSize>
                        {item.width}x{item.height}
                    </CardSize>
                </CardGroup>
                <CardGroup name='body'>
                    <CardImage id={imageIndex} category='4' />
                    <CardName>{item.name}</CardName>
                    <div className={classes.anvilItemInfo}>
                        Level: <span>{item.level}</span>
                    </div>
                    <div className={classes.anvilItemInfo}>
                        Spill radius: <span>{item.spillRadius}</span>
                    </div>
                    <div className={classes.anvilItemInfo}>
                        Spill rate: <span>{item.spillRate / 100}%</span>
                    </div>
                    <div className={classes.anvilItemInfo}>
                        Craft time: <span>{item.craftTime}</span>
                    </div>
                    <div className={classes.anvilItemInfo}>
                        Cooldown: <span>{`${item.cooldown} hour${item.cooldown > 1 ? 's' : ''}`}</span>
                    </div>
                    <AlchemicaPrice
                        alchemica={[
                            item.alchemicaCost[0],
                            item.alchemicaCost[1],
                            item.alchemicaCost[2],
                            item.alchemicaCost[3]
                        ]}
                    />
                </CardGroup>
            </ItemCard>
        </div>
    );
}