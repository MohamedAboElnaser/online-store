import categories from "./categories";
// Sample products data with category IDs and image URLs
const products = [
    // Electronics
    {
        categoryId: categories[0].id,
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
        categoryId: categories[0].id,
        name: "Smartphone",
        description: "Advanced smartphone with cutting-edge features",
        price: 800,
        countInStock: 100,
        images: [
            "https://example.com/phone_image1.jpg",
            "https://example.com/phone_image2.jpg",
        ],
    },
    // Clothing
    {
        categoryId: categories[1].id,
        name: "T-Shirt",
        description: "Comfortable cotton t-shirt in various colors",
        price: 25,
        countInStock: 200,
        images: [
            "https://example.com/tshirt_image1.jpg",
            "https://example.com/tshirt_image2.jpg",
        ],
    },
    {
        categoryId: categories[1].id,
        name: "Jeans",
        description: "Classic denim jeans for everyday wear",
        price: 50,
        countInStock: 150,
        images: [
            "https://example.com/jeans_image1.jpg",
            "https://example.com/jeans_image2.jpg",
        ],
    },
    // Books
    {
        categoryId: categories[2].id,
        name: "Fantasy Novel",
        description: "Exciting fantasy novel for adventure lovers",
        price: 20,
        countInStock: 100,
        images: [
            "https://example.com/fantasy_book_image1.jpg",
            "https://example.com/fantasy_book_image2.jpg",
        ],
    },
    {
        categoryId: categories[2].id,
        name: "Cookbook",
        description: "Delicious recipes for every occasion",
        price: 30,
        countInStock: 80,
        images: [
            "https://example.com/cookbook_image1.jpg",
            "https://example.com/cookbook_image2.jpg",
        ],
    },
    // Furniture
    {
        categoryId: categories[3].id,
        name: "Sofa",
        description: "Comfortable sofa for your living room",
        price: 500,
        countInStock: 30,
        images: [
            "https://example.com/sofa_image1.jpg",
            "https://example.com/sofa_image2.jpg",
        ],
    },
    {
        categoryId: categories[3].id,
        name: "Bed",
        description: "Stylish bed for a good night's sleep",
        price: 800,
        countInStock: 20,
        images: [
            "https://example.com/bed_image1.jpg",
            "https://example.com/bed_image2.jpg",
        ],
    },
    // Sports Equipment
    {
        categoryId: categories[4].id,
        name: "Football",
        description: "High-quality football for recreational play",
        price: 30,
        countInStock: 50,
        images: [
            "https://example.com/football_image1.jpg",
            "https://example.com/football_image2.jpg",
        ],
    },
    {
        categoryId: categories[4].id,
        name: "Tennis Racket",
        description: "Professional tennis racket for competitive play",
        price: 100,
        countInStock: 20,
        images: [
            "https://example.com/tennis_racket_image1.jpg",
            "https://example.com/tennis_racket_image2.jpg",
        ],
    },
    // Home Appliances
    {
        categoryId: categories[5].id,
        name: "Refrigerator",
        description: "Energy-efficient refrigerator for food storage",
        price: 1200,
        countInStock: 10,
        images: [
            "https://example.com/refrigerator_image1.jpg",
            "https://example.com/refrigerator_image2.jpg",
        ],
    },
    {
        categoryId: categories[5].id,
        name: "Washing Machine",
        description: "Automatic washing machine for laundry",
        price: 800,
        countInStock: 15,
        images: [
            "https://example.com/washing_machine_image1.jpg",
            "https://example.com/washing_machine_image2.jpg",
        ],
    },
];

export default products;
