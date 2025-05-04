import { db, Recipe, eq } from 'astro:db';

export async function DELETE({ request }) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return new Response(
        JSON.stringify({ error: 'Recipe ID is required' }), 
        { status: 400 }
      );
    }
    
    // Delete the recipe
    await db.delete(Recipe).where(eq(Recipe.id, id));
    
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
    console.error('Error deleting recipe:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to delete recipe',
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