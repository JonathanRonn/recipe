import { db, Recipe, eq } from 'astro:db';

export async function DELETE({ request }) {
  try {
    const body = await request.json();
    const id = Number(body?.id);

    if (!Number.isInteger(id) || id <= 0) {
      return new Response(
        JSON.stringify({ error: 'Valid recipe ID is required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
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