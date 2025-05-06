import { db, Recipe } from 'astro:db';

export async function GET() {
  try {
    // Get all recipes from the database
    const recipes = await db.select().from(Recipe).orderBy(recipe => recipe.dateSaved, 'desc');
    
    return new Response(
      JSON.stringify(recipes),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error getting recipes:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to get recipes',
        details: error.message 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
} 