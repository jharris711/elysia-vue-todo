import { Elysia, t } from "elysia";

import { Todo } from "../db/model";
import { createTodo, retrieveTodos } from "../controllers/todos";


const todosRouter = new Elysia({ prefix: '/todos'});

const { todos } = Todo.insert

todosRouter.get('/', retrieveTodos)

todosRouter.post('/', createTodo, {
  body: t.Object({
      title: todos.title,
      description: todos.description
  })
})

export { todosRouter }