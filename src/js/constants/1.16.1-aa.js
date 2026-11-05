export const VERSION = "1.16.1";

export const ADVANCEMENTS = {
    // Minecraft: 16
    "story/root": "Minecraft",
    "story/mine_stone": "Stone Age",
    "story/upgrade_tools": "Getting an Upgrade",
    "story/smelt_iron": "Acquire Hardware",
    "story/obtain_armor": "Suit Up",
    "story/lava_bucket": "Hot Stuff",
    "story/iron_tools": "Isn't It Iron Pick",
    "story/deflect_arrow": "Not Today, Thank You",
    "story/form_obsidian": "Ice Bucket Challenge",
    "story/mine_diamond": "Diamonds!",
    "story/enter_the_nether": "We Need to Go Deeper",
    "story/shiny_gear": "Cover Me With Diamonds",
    "story/enchant_item": "Enchanter",
    "story/cure_zombie_villager": "Zombie Doctor",
    "story/follow_ender_eye": "Eye Spy",
    "story/enter_the_end": "The End?",

    // Nether: 23
    "nether/root": "Nether",
    "nether/return_to_sender": "Return to Sender",
    "nether/find_bastion": "Those Were the Days",
    "nether/obtain_ancient_debris": "Hidden in the Depths",
    "nether/fast_travel": "Subspace Bubble",
    "nether/find_fortress": "A Terrible Fortress",
    "nether/obtain_crying_obsidian": "Who is Cutting Onions?",
    "nether/distract_piglin": "Oh Shiny",
    "nether/ride_strider": "This Boat Has Legs",
    "nether/uneasy_alliance": "Uneasy Alliance",
    "nether/loot_bastion": "War Pigs",
    "nether/use_lodestone": "Country Lode, Take Me Home",
    "nether/netherite_armor": "Cover Me in Debris",
    "nether/get_wither_skull": "Spooky Scary Skeleton",
    "nether/obtain_blaze_rod": "Into Fire",
    "nether/charge_respawn_anchor": "Not Quite \"Nine\" Lives",
    "nether/explore_nether": "Hot Tourist Destinations",
    "nether/summon_wither": "Withering Heights",
    "nether/brew_potion": "Local Brewery",
    "nether/create_beacon": "Bring Home the Beacon",
    "nether/all_potions": "A Furious Cocktail",
    "nether/create_full_beacon": "Beaconator",
    "nether/all_effects": "How Did We Get Here?",

    // The End: 9
    "end/root": "The End",
    "end/kill_dragon": "Free the End",
    "end/dragon_egg": "The Next Generation",
    "end/enter_end_gateway": "Remote Getaway",
    "end/respawn_dragon": "The End... Again...",
    "end/dragon_breath": "You Need a Mint",
    "end/find_end_city": "The City at the End of the Game",
    "end/elytra": "Sky's the Limit",
    "end/levitate": "Great View From Up Here",

    // Adventure: 20
    "adventure/root": "Adventure",
    "adventure/voluntary_exile": "Voluntary Exile",
    "adventure/kill_a_mob": "Monster Hunter",
    "adventure/trade": "What a Deal!",
    "adventure/honey_block_slide": "Sticky Situation",
    "adventure/ol_betsy": "Ol' Betsy",
    "adventure/sleep_in_bed": "Sweet Dreams",
    "adventure/hero_of_the_village": "Hero of the Village",
    "adventure/throw_trident": "A Throwaway Joke",
    "adventure/shoot_arrow": "Take Aim",
    "adventure/kill_all_mobs": "Monsters Hunted",
    "adventure/totem_of_undying": "Postmortal",
    "adventure/summon_iron_golem": "Hired Help",
    "adventure/two_birds_one_arrow": "Two Birds, One Arrow",
    "adventure/whos_the_pillager_now": "Who's the Pillager Now?",
    "adventure/arbalistic": "Arbalistic",
    "adventure/adventuring_time": "Adventuring Time",
    "adventure/very_very_frightening": "Very Very Frightening",
    "adventure/sniper_duel": "Sniper Duel",
    "adventure/bullseye": "Bullseye",

    // Husbandry: 12
    "husbandry/root": "Husbandry",
    "husbandry/safely_harvest_honey": "Bee Our Guest",
    "husbandry/breed_an_animal": "The Parrots and the Bats",
    "husbandry/tame_an_animal": "Best Friends Forever",
    "husbandry/fishy_business": "Fishy Business",
    "husbandry/silk_touch_nest": "Total Beelocation",
    "husbandry/plant_seed": "A Seedy Place",
    "husbandry/bred_all_animals": "Two by Two",
    "husbandry/complete_catalogue": "A Complete Catalogue",
    "husbandry/tactical_fishing": "Tactical Fishing",
    "husbandry/balanced_diet": "A Balanced Diet",
    "husbandry/obtain_netherite_hoe": "Serious Dedication",
};

// Advancements with progress
export const CRITERIA = {
    // Adventuring Time: 42
    biomes: [
        "badlands", "badlands_plateau", "bamboo_jungle", "bamboo_jungle_hills", "beach",
        "birch_forest", "birch_forest_hills", "cold_ocean", "dark_forest", "deep_cold_ocean",
        "deep_frozen_ocean", "deep_lukewarm_ocean", "desert", "desert_hills", "forest",
        "frozen_river", "giant_tree_taiga", "giant_tree_taiga_hills", "jungle", "jungle_edge",
        "jungle_hills", "lukewarm_ocean", "mountains", "mushroom_field_shore", "mushroom_fields",
        "plains", "river", "savanna", "savanna_plateau", "snowy_beach",
        "snowy_mountains", "snowy_taiga", "snowy_taiga_hills", "snowy_tundra", "stone_shore",
        "swamp", "taiga", "taiga_hills", "warm_ocean", "wooded_badlands_plateau",
        "wooded_hills", "wooded_mountains",
    ],
    // Monsters Hunted: 33
    monstersKilled: [
        "blaze", "cave_spider", "creeper", "drowned", "elder_guardian",
        "ender_dragon", "enderman", "endermite", "evoker", "ghast",
        "guardian", "hoglin", "husk", "magma_cube", "phantom",
        "piglin", "pillager", "ravager", "shulker", "silverfish",
        "skeleton", "slime", "spider", "stray", "vex",
        "vindicator", "witch", "wither", "wither_skeleton", "zoglin",
        "zombie", "zombie_villager", "zombified_piglin",
    ],
    // Two by Two: 19
    animalsBred: [
        "bee", "cat", "chicken", "cow", "donkey", "fox", "hoglin", "horse", "llama", "mooshroom",
        "mule", "ocelot", "panda", "pig", "rabbit", "sheep", "strider", "turtle", "wolf",
    ],
    // A Complete Catalogue: 11
    catsTamed: [
        "all_black", "black", "british_shorthair", "calico", "jellie", "persian",
        "ragdoll", "red", "siamese", "tabby", "white",
    ],
    // A Balanced Diet: 39
    foodEaten: [
        "apple", "baked_potato", "beef", "beetroot", "beetroot_soup",
        "bread", "carrot", "chicken", "chorus_fruit", "cod",
        "cooked_beef", "cooked_chicken", "cooked_cod", "cooked_mutton", "cooked_porkchop",
        "cooked_rabbit", "cooked_salmon", "cookie", "dried_kelp", "enchanted_golden_apple",
        "golden_apple", "golden_carrot", "honey_bottle", "melon_slice", "mushroom_stew",
        "mutton", "poisonous_potato", "porkchop", "potato", "pufferfish",
        "pumpkin_pie", "rabbit", "rabbit_stew", "rotten_flesh", "salmon",
        "spider_eye", "suspicious_stew", "sweet_berries", "tropical_fish",
    ],
};

// speedrunigt events
export const EVENTS = {
    "rsg.obtain_iron_ingot": "Iron",
    "rsg.obtain_iron_pickaxe": "Iron Pickaxe",
    "rsg.obtain_lava_bucket": "Lava Bucket",
    "rsg.enter_nether": "Enter Nether",
    "rsg.distract_piglin": "Distract Piglin",
    "rsg.enter_bastion": "Enter Bastion",
    "rsg.loot_bastion": "Loot Bastion",
    "rsg.obtain_obsidian": "Obsidian",
    "rsg.obtain_crying_obsidian": "Crying Obsidian",
    "rsg.enter_fortress": "Enter Fortress",
    "rsg.obtain_blaze_rod": "Blaze Rod",
    "rsg.first_portal": "First Portal",
    "rsg.second_portal": "Second Portal",
    "rsg.enter_stronghold": "Enter Stronghold",
    "rsg.enter_end": "Enter End",
    "rsg.kill_dragon": "Kill Dragon",
    "rsg.credits": "Credits",
};

// paceman's "context" sections
export const SECTION_PARTS = {
    mesa:     ["biomes", "cave_spider"],
    snowy:    ["biomes", "stray", "zombie_doctor"],
    jungle:   ["biomes", "panda", "ocelot", "cookie"],
    mushroom: ["biomes", "mooshroom"],
    phantoms: ["phantom", "two_birds"],
    thunder:  ["trident", "vvf"],
    endgame:  ["god_apple", "skulls", "shells"],
};

// items collected
export const TARGETS = {
    shells: 8,
    skulls: 3,
    debris: 20,
};

// groups for the formatted output
export const BIOME_GROUPS = {
    mesa:      ["badlands", "badlands_plateau", "wooded_badlands_plateau"],
    megaTaiga: ["giant_tree_taiga", "giant_tree_taiga_hills"],
    mushroom:  ["mushroom_fields", "mushroom_field_shore"],
    snowy:     ["snowy_tundra", "snowy_mountains", "snowy_taiga", "snowy_taiga_hills", "snowy_beach", "frozen_river"],
    jungle:    ["jungle", "jungle_hills", "jungle_edge", "bamboo_jungle", "bamboo_jungle_hills"],
};
