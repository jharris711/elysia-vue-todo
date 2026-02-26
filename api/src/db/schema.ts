import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core"
import { createId } from '@paralleldrive/cuid2'


export const todo = pgTable("todos", {
    id: varchar('id')
        .$defaultFn(() => createId())
        .primaryKey(),
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull()
})

export const table = {
	todo
} as const

export type Table = typeof table