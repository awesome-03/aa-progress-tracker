export const SYMBOLS = {
    done: "✅",
    notDone: "❌",
    partial: "🟨",
    notYet: "-",
    separator: " · ",
};

export const TEMPLATE = `
**{player}'s TrAAcker**
IGT: {igt} · {advancements} (Last Updated {updated})
Elytra: {elytra}

**Items:**
God Apple: {godApple}  Trident: {trident}  VVF: {vvf}
Shells: {shells}  Skulls: {skulls}  Debris: {debris}  Gold: {goldBlocks}  Bees: {bees}

**Biomes:** {count:biomes}
Mesa: {mesa}  Snowy: {snowy}  Jungle: {jungle}  Mega Taiga: {megaTaiga}  Mushroom: {mushroom}
Left: {missing:biomes:5}

**Animals:** {count:animalsBred}
HDM: {hdm}  Llamas: {llamas}  Foxes: {foxes}  Ocelots: {ocelots}  Pandas: {pandas}
Left: {missing:animalsBred:3}

**Goals:**
Endermite: {endermite}  Phantoms: {phantoms}  Zombie Doctor: {zombieDoctor}  Lodestone: {lodestone}

**Progress:**
Mobs: {monstersHunted}  Food: {balancedDiet}  Cats: {completeCatalogue}
Mobs left: {missing:monstersKilled:5}
Food left: {missing:foodEaten:5}
Cats left: {missing:catsTamed:3}
Advancements left: {missing:advancements:8}

-# [TrAAcker](<https://awesomedev.site/aa-progress-tracker>)
`;
