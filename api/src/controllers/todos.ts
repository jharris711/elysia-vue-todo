import { db } from "../db";
import { table } from '../db/schema';


interface request {
    body: {
        title: string,
        description: string,
    }
}


const createTodo = async ({ body }: request) => {
  const result = await db.insert(table.todo).values({
      title: body.title,
      description: body.description
    }).returning();
    
    return result[0];
};

const retrieveTodos = async ({}) => {
    const result = await db.select().from(table.todo)

    return result
};


export { 
    createTodo,
    retrieveTodos
};
