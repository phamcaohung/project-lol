export const tier = [
    "Legendary",
    "Epic",
    "Mythic",
    "Ultimate",
]

export const filters = [
    {
        id: "tier",
        name: "Tier",
        options: [
            { value: "ultimate", label: "Ultimate", image: "https://www.skinexplorer.lol/_next/image?url=https%3A%2F%2Fraw.communitydragon.org%2Fpbe%2Fplugins%2Frcp-be-lol-game-data%2Fglobal%2Fdefault%2Fv1%2Frarity-gem-icons%2Fultimate.png&w=32&q=75" },
            { value: "mythic", label: "Mythic", image: "https://www.skinexplorer.lol/_next/image?url=https%3A%2F%2Fraw.communitydragon.org%2Fpbe%2Fplugins%2Frcp-be-lol-game-data%2Fglobal%2Fdefault%2Fv1%2Frarity-gem-icons%2Fmythic.png&w=32&q=75" },
            { value: "legendary", label: "Legendary", image: "https://www.skinexplorer.lol/_next/image?url=https%3A%2F%2Fraw.communitydragon.org%2Fpbe%2Fplugins%2Frcp-be-lol-game-data%2Fglobal%2Fdefault%2Fv1%2Frarity-gem-icons%2Flegendary.png&w=32&q=75" },
            { value: "epic", label: "Epic", image: "https://www.skinexplorer.lol/_next/image?url=https%3A%2F%2Fraw.communitydragon.org%2Fpbe%2Fplugins%2Frcp-be-lol-game-data%2Fglobal%2Fdefault%2Fv1%2Frarity-gem-icons%2Fepic.png&w=32&q=75" },
            
        ]
    },
]

export const singleFilter = [
    {
        id: "price",
        name: "Price",
        options: [
            { value: "1-520", label: "1 RP To 520 RP" },
            { value: "520-975", label: "520 RP To 975 RP" },
            { value: "975-1350", label: "975 RP To 1350 RP" },
            { value: "1350-1820", label: "1350 RP To 1820 RP" },
            { value: "1820-9999", label: "1820 RP To 9999 RP" },
        ]
    },
    {
        id: "discount",
        name: "Disccount Range",
        options: [
            { value: "10", label: "10% And Above" },
            { value: "20", label: "20% And Above" },
            { value: "30", label: "30% And Above" },
            { value: "40", label: "40% And Above" },
            { value: "50", label: "50% And Above" },
            { value: "60", label: "60% And Above" },
            { value: "70", label: "70% And Above" },
            { value: "80", label: "80% And Above" },
        ]
    },
    {
        id: "stock",
        name: "Availability",
        options: [
            { value: "in_stock", label: "In Stock" },
            { value: "out_of_stock", label: "Out Of Stock" },
        ]
    }
]

export const initialColor = [
    { name: "Default", quantity: 1, color: "", image: null, inStock: true },
]

export const initialTier = [
    {
        id: 1,
        name: "Ultimate",
        image: "https://www.skinexplorer.lol/_next/image?url=https%3A%2F%2Fraw.communitydragon.org%2Fpbe%2Fplugins%2Frcp-be-lol-game-data%2Fglobal%2Fdefault%2Fv1%2Frarity-gem-icons%2Fultimate.png&w=32&q=75"
    },
    {
        id: 2,
        name: "Mythic",
        image: "https://www.skinexplorer.lol/_next/image?url=https%3A%2F%2Fraw.communitydragon.org%2Fpbe%2Fplugins%2Frcp-be-lol-game-data%2Fglobal%2Fdefault%2Fv1%2Frarity-gem-icons%2Fmythic.png&w=32&q=75"
    },
    {
        id: 3,
        name: "Legendary",
        image: "https://www.skinexplorer.lol/_next/image?url=https%3A%2F%2Fraw.communitydragon.org%2Fpbe%2Fplugins%2Frcp-be-lol-game-data%2Fglobal%2Fdefault%2Fv1%2Frarity-gem-icons%2Flegendary.png&w=32&q=75"
    },
    {
        id: 4,
        name: "Epic",
        image: "https://www.skinexplorer.lol/_next/image?url=https%3A%2F%2Fraw.communitydragon.org%2Fpbe%2Fplugins%2Frcp-be-lol-game-data%2Fglobal%2Fdefault%2Fv1%2Frarity-gem-icons%2Fepic.png&w=32&q=75"
    },
    {
        id: 5,
        name: "Exalted",
        image: "https://lolskin.info/Exalted.webp"
    },
    {
        id: 6,
        name: "Transcendent",
        image: "https://lolskin.info/Transcendent.webp"
    },
    {
        id: 7,
        name: "Normal",
        image: ""
    },
]

export const initialDifficulty = [
    {
        id: 1,
        difficulty: "LOW"
    },
    {
        id: 2,
        difficulty: "MEDIUM"
    },
    {
        id: 3,
        difficulty: "HIGH"
    }
]

export const initialRole = [
    {
        id: 1,
        name: "Assassin",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/2/28/Slayer_icon.png"
    },
    {
        id: 2,
        name: "Mage",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/2/28/Mage_icon.png"
    },
    {
        id: 3,
        name: "Tank",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/5/5a/Tank_icon.png"
    },
    {
        id: 4,
        name: "Marksman",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/7/7f/Marksman_icon.png"
    },
    {
        id: 5,
        name: "Enchanter",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/5/58/Controller_icon.png"
    },
    {
        id: 6,
        name: "Juggernaut",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/8/8f/Fighter_icon.png"
    },
]

export const initialRegion = [
    {
        id: 1,
        name: "Bandle City",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/6/68/Bandle_City_Crest.png"
    },
    {
        id: 2,
        name: "Bilgewater",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/7/72/Bilgewater_LoR_Region.png"
    },
    {
        id: 3,
        name: "Demacia",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/3/3a/Demacia_profileicon.png"
    },
    {
        id: 4,
        name: "Freljord",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/f/fc/Freljord_profileicon.png"
    },
    {
        id: 5,
        name: "Ionia",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/0/04/Ionia_profileicon.png"
    },
    {
        id: 6,
        name: "Noxus",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/5/53/Noxus_profileicon.png"
    },
    {
        id: 7,
        name: "Piltover",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/9/99/Serpent_Crest_profileicon.png"
    },
    {
        id: 8,
        name: "Zaun",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/e/ea/Zaun_profileicon.png"
    },
    {
        id: 9,
        name: "Shadow Isles",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/4/43/Shadow_Isles_profileicon.png"
    },
    {
        id: 10,
        name: "Shurima",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/5/5d/Shurima_profileicon.png"
    },
    {
        id: 11,
        name: "Targon",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/b/bf/Mount_Targon_profileicon.png"
    },
    {
        id: 12,
        name: "Runeterra",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/2/2a/Runeterra_Map_profileicon.png"
    },
    {
        id: 13,
        name: "Void",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/7/7b/Void_profileicon.png"
    },
    {
        id: 14,
        name: "Ixtal",
        image: "https://static.wikia.nocookie.net/leagueoflegends/images/2/28/Qiyana_Supreme_Display_of_Talent_HD.png"
    },
]

export const initialSkill = [
    { name: null, image: null, description: null, keyboard: "Passive" },
    { name: null, image: null, description: null, keyboard: "Q" },
    { name: null, image: null, description: null, keyboard: "W" },
    { name: null, image: null, description: null, keyboard: "E" },
    { name: null, image: null, description: null, keyboard: "R" },
]

export const categories = ["skin", "champion", "chibi"];

export const initialSort = [
    {
        id: 1,
        name: "Sort By Title Low",
        value: "title_low"
    },
    {
        id: 2,
        name: "Sort By Title High",
        value: "title_high"
    },
    {
        id: 3,
        name: "Sort By Price Low",
        value: "price_low"
    },
    {
        id: 4,
        name: "Sort By Price High",
        value: "price_high"
    },
    {
        id: 5,
        name: "Sort By Quantity Low",
        value: "quantity_low"
    },
    {
        id: 6,
        name: "Sort By Quantity High",
        value: "quantity_high"
    },
    {
        id: 7,
        name: "Sort By Release Date Low",
        value: "releaseDate_low"
    },
    {
        id: 8,
        name: "Sort By Release Date High",
        value: "releaseDate_high"
    },
]