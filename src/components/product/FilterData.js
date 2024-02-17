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
            { value: "1-1350", label: "1 RP To 1350 RP" },
            { value: "1350-1820", label: "1350 RP To 1820 RP" },
            { value: "1820-3250", label: "1820 RP To 3250 RP" },
            { value: "3250-9999", label: "3250 RP To 9999 RP" },
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

export const sortOptions = [
    { id: "sort", value: "price_low", name: "Price: Low to High" },
    { id: "sort", value: "price_high", name: "Price: High to Low" },
]