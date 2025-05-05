import { db, Recipe } from 'astro:db';

export async function POST({ request }) {
  try {
    const recipe = await request.json();
    
    if (
       typeof recipe.title !== 'string'   || recipe.title.trim() === '' ||
        !Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0 ||
        !Array.isArray(recipe.instructions)|| recipe.instructions.length === 0
      ) {
         return new Response(
           JSON.stringify({ error: 'Missing required recipe data' }), 
           { status: 400, headers: { 'Content-Type': 'application/json' } }
         );
    }
    
    // Insert the new recipe
    await db.insert(Recipe).values({
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      sourceUrl: recipe.sourceUrl || '',
      dateSaved: new Date()
    });
    
    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error saving recipe:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to save recipe',
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