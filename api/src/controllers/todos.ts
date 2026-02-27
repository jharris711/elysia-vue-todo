import { db } from "../db";
import { table } from '../db/schema';
import { Context } from "elysia";
import { eq } from "drizzle-orm";


const createTodo = async ({ body }: { body: { title: string, description: string } }) => {
  const result = await db.insert(table.todo).values({
      title: body.title,
      description: body.description
    }).returning();
    
    return result[0];
};

const retrieveTodos = async ({}) => {
    const result = await db.select().from(table.todo);

    return result;
};

const retrieveTodo = async ({ params }: Context) => {
    const result = await db.select()
        .from(table.todo)
        .where(eq(table.todo.id, params.id));

    return result[0];
};


export { 
    createTodo,
    retrieveTodo,
    retrieveTodos
};
