import axios from 'axios';
import * as cheerio from 'cheerio';

// Helper function to clean text
const cleanText = (text) => {
  return text
    .replace(/\s+/g, ' ')
    .trim();
};

export async function POST({ request }) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({ error: 'URL is required' }), 
        { status: 400 }
      );
    }
    
    // Fetch the HTML content of the URL
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    // Extract recipe information (this is a basic implementation)
    // Recipe websites vary widely, so this is a simplistic approach
    
    // Try to find the recipe title
    const titleSelectors = [
      'h1',
      '.recipe-title',
      '.recipe-name',
      '.recipe-header h1',
      'article h1',
      'header h1',
      '.post-title',
      '[itemprop="name"]'
    ];
    
    let title = '';
    for (const selector of titleSelectors) {
      const element = $(selector).first();
      if (element.length > 0) {
        title = cleanText(element.text());
        break;
      }
    }
    
    if (!title) {
      title = 'Untitled Recipe';
    }
    
    // Try to find the ingredients
    const ingredientSelectors = [
      '.ingredients li',
      '.ingredient-list li',
      '[itemprop="recipeIngredient"]',
      '.recipe-ingredients li',
      '.ingredients-section li',
      '.wprm-recipe-ingredient'
    ];
    
    let ingredients = [];
    for (const selector of ingredientSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        elements.each((i, el) => {
          const ingredient = cleanText($(el).text());
          if (ingredient) {
            ingredients.push(ingredient);
          }
        });
        break;
      }
    }
    
    // Try to find the instructions
    const instructionSelectors = [
      '.instructions li',
      '.recipe-instructions li',
      '.recipe-directions li',
      '.recipe-steps li',
      '[itemprop="recipeInstructions"] li',
      '.wprm-recipe-instruction'
    ];
    
    let instructions = [];
    for (const selector of instructionSelectors) {
      const elements = $(selector);
      if (elements.length > 0) {
        elements.each((i, el) => {
          const instruction = cleanText($(el).text());
          if (instruction) {
            instructions.push(instruction);
          }
        });
        break;
      }
    }
    
    // For websites with different markup, try an alternative approach
    if (ingredients.length === 0) {
      // Look for paragraphs or divs containing ingredients
      $('p, div').each((i, el) => {
        const text = $(el).text().toLowerCase();
        if (text.includes('ingredient') && text.length < 1000) {
          const lines = text.split('\n').filter(line => line.trim().length > 0);
          ingredients = lines.map(line => cleanText(line));
        }
      });
    }
    
    if (instructions.length === 0) {
      // Look for paragraphs or divs containing instructions
      $('p, div').each((i, el) => {
        const text = $(el).text().toLowerCase();
        if ((text.includes('instruction') || text.includes('direction')) && text.length < 1000) {
          const lines = text.split('\n').filter(line => line.trim().length > 0);
          instructions = lines.map(line => cleanText(line));
        }
      });
    }
    
    // Return the extracted recipe data
    return new Response(
      JSON.stringify({
        title,
        ingredients,
        instructions,
        sourceUrl: url
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Error scraping recipe:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to scrape recipe',
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