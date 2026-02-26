import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'
import { table } from './schema'
import { spreads } from './utils' // utility from docs

export const Todo = {
    insert: spreads({
        todos: createInsertSchema(table.todo),
    }, 'insert'),
    select: spreads({
        todos: createSelectSchema(table.todo)
    }, 'select')
} as const