import { createInsertSchema, createSelectSchema } from 'drizzle-typebox'
import { table } from './schema'
/**
 * utility from Elysia docs
 * @see https://elysiajs.com/integrations/drizzle.html#utility
 */
import { spreads } from './utils'


export const Todo = {
    insert: spreads({
        todos: createInsertSchema(table.todo),
    }, 'insert'),
    select: spreads({
        todos: createSelectSchema(table.todo)
    }, 'select')
} as const
