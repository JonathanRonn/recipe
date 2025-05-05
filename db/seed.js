import { db } from 'astro:db';
import { Recipe } from './config.js';

export default async function() {
  // Optional: Add some sample recipes during development
  await db.insert(Recipe).values([
    {
      title: "Sample Pasta Recipe",
      ingredients: ["200g pasta", "100g cheese", "2 tbsp olive oil", "Salt and pepper to taste"],
      instructions: ["Boil pasta according to package instructions", "Drain and mix with cheese and oil", "Season with salt and pepper"],
      sourceUrl: "https://example.com/pasta",
      dateSaved: new Date()
    }
  ]);
} 