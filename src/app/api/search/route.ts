// app/api/products/search/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

// Category keywords for filtering
const categoryKeywords = {
  "development-boards": [
    "arduino",
    "esp32",
    "mega",
    "uno",
    "board",
    "microcontroller",
    "starter",
    "kit",
  ],
  sensors: [
    "sensor",
    "ultrasonic",
    "dht",
    "mq-",
    "temperature",
    "humidity",
    "gas",
    "ir",
    "motion",
    "light",
  ],
  "motors-robotics": [
    "motor",
    "servo",
    "robot",
    "chassis",
    "wheel",
    "2wd",
    "4wd",
    "l298n",
    "driver",
    "stepper",
  ],
  components: [
    "jumper",
    "wire",
    "capacitor",
    "resistor",
    "relay",
    "breadboard",
    "button",
    "led",
    "diode",
    "transistor",
  ],
  "tools-accessories": [
    "soldering",
    "iron",
    "solder",
    "wire",
    "oled",
    "display",
    "lcd",
    "tool",
    "multimeter",
    "probe",
  ],
};

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const inStock = searchParams.get("inStock");
    const rating = searchParams.get("rating");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Build query
    let query: any = {};

    // Category filtering using keywords
    if (category && category !== "all") {
      const keywords =
        categoryKeywords[category as keyof typeof categoryKeywords];
      if (keywords) {
        const regexQueries = keywords.map((keyword) => ({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { tags: { $in: [new RegExp(keyword, "i")] } },
          ],
        }));
        query.$or = regexQueries;
      }
    }

    // Search filtering
    if (search) {
      const searchQuery = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { sku: { $regex: search, $options: "i" } },
          { tags: { $in: [new RegExp(search, "i")] } },
        ],
      };

      if (query.$or) {
        // Combine category and search filters
        query = {
          $and: [{ $or: query.$or }, searchQuery],
        };
      } else {
        query = searchQuery;
      }
    }

    // Price filtering
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Stock filtering
    if (inStock === "true") {
      query.stock = { $gt: 0 };
    }

    // Rating filtering
    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    // Build sort
    let sort: any = { createdAt: -1 }; // Default sort

    switch (sortBy) {
      case "name-asc":
        sort = { name: 1 };
        break;
      case "name-desc":
        sort = { name: -1 };
        break;
      case "price-asc":
        sort = { price: 1 };
        break;
      case "price-desc":
        sort = { price: -1 };
        break;
      case "stock-asc":
        sort = { stock: 1 };
        break;
      case "stock-desc":
        sort = { stock: -1 };
        break;
      case "rating-desc":
        sort = { rating: -1, reviewCount: -1 };
        break;
      case "createdAt":
      default:
        sort = { createdAt: -1 };
        break;
    }

    // Execute query with aggregation for better performance
    const pipeline = [
      { $match: query },
      { $sort: sort },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          name: 1,
          price: 1,
          originalPrice: 1,
          description: 1,
          image: 1,
          stock: 1,
          rating: 1,
          reviewCount: 1,
          sku: 1,
          tags: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ];

    const products = await Product.aggregate(pipeline);

    // Get total count for pagination
    const totalPipeline = [{ $match: query }, { $count: "total" }];

    const totalResult = await Product.aggregate(totalPipeline);
    const total = totalResult.length > 0 ? totalResult[0].total : 0;

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
      filters: {
        category,
        search,
        sortBy,
        minPrice,
        maxPrice,
        inStock,
        rating,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}
