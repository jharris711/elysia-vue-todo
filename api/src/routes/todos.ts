import { Elysia, t } from "elysia";

import { Todo } from "../db/model";
import { createTodo, retrieveTodos } from "../controllers/todos";


const TODOS_API_ENDPOINT = "/api/todos"
const TODOS_VIEWS_ENDPOINT = "/todos"

const { todos } = Todo.insert

const todosRouter = new Elysia();

todosRouter
  .onRequest(({ request }) => {
    console.log(`${request.method} ${request.url}`)
  })
  .get(TODOS_VIEWS_ENDPOINT, "This is the todos page")
  .get(TODOS_API_ENDPOINT, retrieveTodos)
  .post(TODOS_API_ENDPOINT, createTodo, {
    body: t.Object({
      title: todos.title,
      description: todos.description
    })
  })

export {
  todosRouter
}
