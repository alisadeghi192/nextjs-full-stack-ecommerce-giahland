import connectToDB from "@/lib/db/connect";
import Product from "@/lib/db/models/Product";
import { fakeProducts } from "@/data/products";

export async function seedProducts() {
  try {
    await connectToDB();
    
    console.log("🗑️  Removing all existing products...");
    await Product.deleteMany({});
    
    console.log("📦 Inserting new products...");
    const result = await Product.insertMany(fakeProducts);
    
    console.log(`✅ ${result.length} products seeded successfully!`);
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  }
}