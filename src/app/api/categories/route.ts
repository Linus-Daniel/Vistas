// app/api/categories/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Product from "@/models/Product";

// Category mapping based on keywords
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

function categorizeProduct(productText: string): string | null {
  const text = productText.toLowerCase();

  for (const [categorySlug, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword.toLowerCase()))) {
      return categorySlug;
    }
  }

  return null;
}

export async function GET(req: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const includeCount = searchParams.get("includeCount") === "true";
    const category = searchParams.get("category");

    if (category && category !== "all") {
      // Get products for specific category
      const keywords =
        categoryKeywords[category as keyof typeof categoryKeywords];

      if (!keywords) {
        return NextResponse.json(
          { message: "Invalid category" },
          { status: 400 }
        );
      }

      // Build regex query for category keywords
      const regexQueries = keywords.map((keyword) => ({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
          { tags: { $in: [new RegExp(keyword, "i")] } },
        ],
      }));

      const products = await Product.find({
        $or: regexQueries,
      }).lean();

      return NextResponse.json({
        category,
        products,
        count: products.length,
      });
    }

    // Get all categories with counts
    const categories = [];

    // Get total products count
    const totalProducts = await Product.countDocuments();
    categories.push({
      name: "All Categories",
      slug: "all",
      count: totalProducts,
    });

    // Get count for each category if requested
    if (includeCount) {
      for (const [categorySlug, keywords] of Object.entries(categoryKeywords)) {
        const regexQueries = keywords.map((keyword) => ({
          $or: [
            { name: { $regex: keyword, $options: "i" } },
            { description: { $regex: keyword, $options: "i" } },
            { tags: { $in: [new RegExp(keyword, "i")] } },
          ],
        }));

        const count = await Product.countDocuments({
          $or: regexQueries,
        });

        categories.push({
          name: categorySlug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          slug: categorySlug,
          count,
        });
      }
    } else {
      // Return categories without counts for faster response
      Object.keys(categoryKeywords).forEach((categorySlug) => {
        categories.push({
          name: categorySlug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          slug: categorySlug,
          count: 0,
        });
      });
    }

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { message: "Error fetching categories" },
      { status: 500 }
    );
  }
}
