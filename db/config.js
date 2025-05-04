import { defineDb, defineTable, column } from 'astro:db';

export const Recipe = defineTable({
  columns: {
    id: column.number({ primaryKey: true, autoIncrement: true }),
    title: column.text(),
    ingredients: column.json(),
    instructions: column.json(),
    sourceUrl: column.text(),
    dateSaved: column.date()
  }
});

export default defineDb({
  tables: { Recipe },
});