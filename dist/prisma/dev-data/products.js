"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products = [
    // Electronics
    {
        id: "61918e71-7f6d-403c-b612-5bc702a2b305",
        categoryId: "7f8d9ddf-a4d9-45c7-ba7a-b9be288de892",
        name: "Laptop",
        description: "Powerful laptop for all your computing needs",
        price: 1200,
        countInStock: 50,
        images: [
            "https://example.com/laptop_image1.jpg",
            "https://example.com/laptop_image2.jpg",
        ],
    },
    {
        id: "349eb5a4-45bc-4fb4-ba8c-20f47714ff5c",
        categoryId: "7f8d9ddf-a4d9-45c7-ba7a-b9be288de892",
        name: "Wireless Earbuds",
        description: "Sleek and lightweight wireless earbuds for music enthusiasts",
        price: 80,
        countInStock: 100,
        images: [
            "https://example.com/earbuds_image1.jpg",
            "https://example.com/earbuds_image2.jpg",
        ],
    },
    {
        id: "ff1eb4d1-5dc2-41cb-bf6c-1bfe1192c1ae",
        categoryId: "7f8d9ddf-a4d9-45c7-ba7a-b9be288de892",
        name: "Smart Watch",
        description: "Feature-rich smartwatch for tracking your fitness and notifications",
        price: 150,
        countInStock: 80,
        images: [
            "https://example.com/smartwatch_image1.jpg",
            "https://example.com/smartwatch_image2.jpg",
        ],
    },
    // Food and Drinks
    {
        id: "c732e2e3-9982-40d1-b914-79f02f1c0b8f",
        categoryId: "a16a5211-1d32-4b7f-af64-7d51b44a38c6", // Food category ID
        name: "Coffee Beans",
        description: "Freshly roasted coffee beans for your morning brew",
        price: 20,
        countInStock: 50,
        images: [
            "https://example.com/coffee_beans_image1.jpg",
            "https://example.com/coffee_beans_image2.jpg",
        ],
    },
    {
        id: "d9e0f1a2-b3c4-4d5e-a6f7-7c8d9e0f1a2b",
        categoryId: "a16a5211-1d32-4b7f-af64-7d51b44a38c6", // Food category ID
        name: "Organic Honey",
        description: "Pure organic honey for natural sweetness",
        price: 10,
        countInStock: 100,
        images: [
            "https://example.com/organic_honey_image1.jpg",
            "https://example.com/organic_honey_image2.jpg",
        ],
    },
    {
        id: "g1h2i3j4-k5l6-4m7n-o8p9-q0r1s2t3u4v",
        categoryId: "a16a5211-1d32-4b7f-af64-7d51b44a38c6", // Food category ID
        name: "Extra Virgin Olive Oil",
        description: "Premium quality extra virgin olive oil for cooking and dressing",
        price: 15,
        countInStock: 80,
        images: [
            "https://example.com/olive_oil_image1.jpg",
            "https://example.com/olive_oil_image2.jpg",
        ],
    },
    {
        id: "w5x6y7z8-a1b2-3c4d-e5f6-6g7h8i9j0k1l",
        categoryId: "a16a5211-1d32-4b7f-af64-7d51b44a38c6", // Food category ID
        name: "Granola Bars",
        description: "Healthy and delicious granola bars for a quick snack",
        price: 8,
        countInStock: 120,
        images: [
            "https://example.com/granola_bars_image1.jpg",
            "https://example.com/granola_bars_image2.jpg",
        ],
    },
    {
        id: "m2n3o4p5-q6r7-8s9t-u0v1-w2x3y4z5a6b",
        categoryId: "a16a5211-1d32-4b7f-af64-7d51b44a38c6", // Food category ID
        name: "Quinoa",
        description: "Nutritious quinoa grains for salads, bowls, and sides",
        price: 10,
        countInStock: 100,
        images: [
            "https://example.com/quinoa_image1.jpg",
            "https://example.com/quinoa_image2.jpg",
        ],
    },
    {
        id: "c5v6b7n8-m2l3-4k5j-o6h7-a8s9d0f1g2",
        categoryId: "a16a5211-1d32-4b7f-af64-7d51b44a38c6",
        name: "Almonds",
        description: "Premium almonds for snacking and cooking",
        price: 12,
        countInStock: 150,
        images: [
            "https://example.com/almonds_image1.jpg",
            "https://example.com/almonds_image2.jpg",
        ],
    },
    // Drinks
    {
        id: "e7f8a9b0-c1d2-4e3f-a4b5-6c7d8e9f0a1b",
        categoryId: "b2cd3e4f-5a6b-4c7d-e8f9-0a1b2c3d4e5f", // Drinks category ID
        name: "Sparkling Water",
        description: "Refreshing sparkling water for hydration",
        price: 2,
        countInStock: 200,
        images: [
            "https://example.com/sparkling_water_image1.jpg",
            "https://example.com/sparkling_water_image2.jpg",
        ],
    },
    {
        id: "f0a1b2c3-d4e5-4f6a-a7b8-c9d0e1f2a3b4",
        categoryId: "b2cd3e4f-5a6b-4c7d-e8f9-0a1b2c3d4e5f", // Drinks category ID
        name: "Iced Tea",
        description: "Refreshing iced tea for a cool treat",
        price: 3,
        countInStock: 150,
        images: [
            "https://example.com/iced_tea_image1.jpg",
            "https://example.com/iced_tea_image2.jpg",
        ],
    },
    // Clothing
    {
        id: "95b2d024-2aeb-443f-b885-0d6d17984e9a",
        categoryId: "4d65400d-2f5a-473d-abf2-665b2775873f",
        name: "Dress",
        description: "Elegant dress for special occasions",
        price: 80,
        countInStock: 100,
        images: [
            "https://example.com/dress_image1.jpg",
            "https://example.com/dress_image2.jpg",
        ],
    },
    {
        id: "12f4c1c1-34d6-4a95-912d-1b35d7e63fe3",
        categoryId: "4d65400d-2f5a-473d-abf2-665b2775873f", // Clothing category ID
        name: "Hoodie",
        description: "Warm and stylish hoodie for all occasions",
        price: 45,
        countInStock: 150,
        images: [
            "https://example.com/hoodie_image1.jpg",
            "https://example.com/hoodie_image2.jpg",
        ],
    },
    {
        id: "5bf43214-9a5e-4a98-b7e4-763fbabc3a89",
        categoryId: "4d65400d-2f5a-473d-abf2-665b2775873f",
        name: "Jeans",
        description: "Classic denim jeans for everyday wear",
        price: 50,
        countInStock: 200,
        images: [
            "https://example.com/jeans_image1.jpg",
            "https://example.com/jeans_image2.jpg",
        ],
    },
    // Books
    {
        id: "cfe8e79d-2891-4d89-bb45-d2eb29ec4f34",
        categoryId: "0d488fe3-da55-4fbf-ac74-718fbf2cb2c6",
        name: "Mystery Novel",
        description: "Thrilling mystery novel to keep you on edge",
        price: 15,
        countInStock: 80,
        images: [
            "https://example.com/mystery_book_image1.jpg",
            "https://example.com/mystery_book_image2.jpg",
        ],
    },
    // Furniture
    {
        id: "8c7a2357-5ec9-45d0-8f69-3cfc400d12c1",
        categoryId: "3c7a6764-a773-4070-9176-50b31e3383ef",
        name: "Coffee Table",
        description: "Stylish coffee table for your living room",
        price: 200,
        countInStock: 40,
        images: [
            "https://example.com/coffee_table_image1.jpg",
            "https://example.com/coffee_table_image2.jpg",
        ],
    },
    {
        id: "dfa5187a-0b5d-42a0-865f-c4a694eb58a3",
        categoryId: "00bd6611-468a-4c04-9b3e-519f2b2b94cf",
        name: "Basketball",
        description: "Official size basketball for indoor and outdoor play",
        price: 25,
        countInStock: 30,
        images: [
            "https://example.com/basketball_image1.jpg",
            "https://example.com/basketball_image2.jpg",
        ],
    },
    // Home Appliances
    {
        id: "3c368e38-1d8d-409e-bc38-df2ed9f09e8a",
        categoryId: "9658cf03-f87c-4b9c-b8f7-7c516fa1cacd",
        name: "Microwave Oven",
        description: "Convenient microwave oven for quick cooking",
        price: 150,
        countInStock: 20,
        images: [
            "https://example.com/microwave_image1.jpg",
            "https://example.com/microwave_image2.jpg",
        ],
    },
    // Toys
    {
        id: "7506d33a-8fd0-490f-8fb1-f1eae4445e04",
        categoryId: "e25a7e7e-3f3e-4b77-bf5f-837b03e2c1f6",
        name: "Action Figure",
        description: "Collectible action figure for fans of all ages",
        price: 10,
        countInStock: 50,
        images: [
            "https://example.com/action_figure_image1.jpg",
            "https://example.com/action_figure_image2.jpg",
        ],
    },
    // Beauty
    {
        id: "d98c35d8-6d53-4c84-b33e-43c7e231bc59",
        categoryId: "69c01dfc-8b9a-492b-bba6-4a7d1c7f01e7",
        name: "Lipstick Set",
        description: "Assortment of vibrant lipsticks for every mood",
        price: 30,
        countInStock: 60,
        images: [
            "https://example.com/lipstick_set_image1.jpg",
            "https://example.com/lipstick_set_image2.jpg",
        ],
    },
    // Pet Supplies
    {
        id: "80a75e21-8181-4ff6-a15d-35a4446fd6e3",
        categoryId: "d97a6c31-7d3f-4c29-9f65-d3a49a6242f5",
        name: "Dog Food",
        description: "Nutritious dog food for your furry friend",
        price: 40,
        countInStock: 100,
        images: [
            "https://example.com/dog_food_image1.jpg",
            "https://example.com/dog_food_image2.jpg",
        ],
    },
    // Outdoor Gear
    {
        id: "d6d618d7-1d4e-4fe3-8f85-3155b4f48519",
        categoryId: "13c55f8e-64da-48c8-a3d2-6a04960fc672",
        name: "Tent",
        description: "Spacious tent for camping adventures",
        price: 150,
        countInStock: 30,
        images: [
            "https://example.com/tent_image1.jpg",
            "https://example.com/tent_image2.jpg",
        ],
    },
    // Health & Wellness
    {
        id: "22b33a3a-2d2d-4ab2-9614-24e8a86db688",
        categoryId: "14f40a68-9df7-489d-8f15-757b8cb3cfea",
        name: "Yoga Mat",
        description: "High-quality yoga mat for your daily practice",
        price: 20,
        countInStock: 50,
        images: [
            "https://example.com/yoga_mat_image1.jpg",
            "https://example.com/yoga_mat_image2.jpg",
        ],
    },
    // Kitchenware
    {
        id: "4fd84825-56eb-4681-bec2-1b1565c9b73d",
        categoryId: "7a4b9a5e-f00d-4c44-bff3-aa6fe31a2f30",
        name: "Cookware Set",
        description: "Complete cookware set for your kitchen",
        price: 100,
        countInStock: 20,
        images: [
            "https://example.com/cookware_set_image1.jpg",
            "https://example.com/cookware_set_image2.jpg",
        ],
    },
    // Office Supplies
    {
        id: "bd07cf96-7420-487e-b8ee-5485e802a7e5",
        categoryId: "c2a71ac2-fb1e-4c68-a05d-564a1079e439",
        name: "Desk Organizer",
        description: "Organize your office space with this desk organizer",
        price: 25,
        countInStock: 50,
        images: [
            "https://example.com/desk_organizer_image1.jpg",
            "https://example.com/desk_organizer_image2.jpg",
        ],
    },
    // Garden & Outdoor
    {
        id: "8f1876c2-7a46-40f7-898d-9c37a05c8eb6",
        categoryId: "5792f7ac-daf0-4d1a-8254-14d5c40d5c9e",
        name: "Garden Hose",
        description: "Durable garden hose for watering your plants",
        price: 30,
        countInStock: 100,
        images: [
            "https://example.com/garden_hose_image1.jpg",
            "https://example.com/garden_hose_image2.jpg",
        ],
    },
    // Travel Accessories
    {
        id: "d4e5f6a1-b2c3-4d4e-a1b2-d4e5f6a1b2c3",
        categoryId: "a1b2c3d4-e5f6-4a3b-b2c1-a1b2c3d4e5f6",
        name: "Travel Backpack",
        description: "Versatile backpack for all your travel needs",
        price: 50,
        countInStock: 50,
        images: [
            "https://example.com/travel_backpack_image1.jpg",
            "https://example.com/travel_backpack_image2.jpg",
        ],
    },
    {
        id: "a1b2c3d4-e5f6-4a3b-b2c1-a1b2c3d4e5f6",
        categoryId: "a1b2c3d4-e5f6-4a3b-b2c1-a1b2c3d4e5f6",
        name: "Travel Neck Pillow",
        description: "Comfortable neck pillow for long journeys",
        price: 20,
        countInStock: 100,
        images: [
            "https://example.com/travel_neck_pillow_image1.jpg",
            "https://example.com/travel_neck_pillow_image2.jpg",
        ],
    },
    // Art & Crafts
    {
        id: "e5f6a1b2-c3d4-4e5f-a1b2-e5f6a1b2c3d4",
        categoryId: "b2c1a1b2-c3d4-4e5f-a3b4-b2c1a1b2c3d4",
        name: "Sketchbook",
        description: "Blank sketchbook for drawing and sketching",
        price: 15,
        countInStock: 80,
        images: [
            "https://example.com/sketchbook_image1.jpg",
            "https://example.com/sketchbook_image2.jpg",
        ],
    },
    {
        id: "b2c1a1b2-c3d4-4e5f-a3b4-b2c1a1b2c3d4",
        categoryId: "b2c1a1b2-c3d4-4e5f-a3b4-b2c1a1b2c3d4", // Art & Crafts category ID
        name: "Acrylic Paint Set",
        description: "Vibrant acrylic paints for artists",
        price: 25,
        countInStock: 50,
        images: [
            "https://example.com/acrylic_paints_image1.jpg",
            "https://example.com/acrylic_paints_image2.jpg",
        ],
    },
    // Automotive
    {
        id: "f6a1b2c3-d4e5-4f6a-a1b2-f6a1b2c3d4e5",
        categoryId: "c3d4e5f6-a1b2-4c3d-b2c1-c3d4e5f6a1b2",
        name: "Car Seat Covers",
        description: "Protective seat covers for your car interior",
        price: 40,
        countInStock: 100,
        images: [
            "https://example.com/car_seat_covers_image1.jpg",
            "https://example.com/car_seat_covers_image2.jpg",
        ],
    },
    {
        id: "c3d4e5f6-a1b2-4c3d-b2c1-c3d4e5f6a1b2",
        categoryId: "c3d4e5f6-a1b2-4c3d-b2c1-c3d4e5f6a1b2",
        name: "Car Air Freshener",
        description: "Long-lasting air freshener for your car",
        price: 10,
        countInStock: 200,
        images: [
            "https://example.com/car_air_freshener_image1.jpg",
            "https://example.com/car_air_freshener_image2.jpg",
        ],
    },
];
exports.default = products;
//# sourceMappingURL=products.js.map