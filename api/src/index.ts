import 'dotenv/config';
import { Elysia } from "elysia";

import { todosRouter } from './routes/todos';


const app = new Elysia();

app.get("/", ({ redirect }) => redirect("/todos"))

// Use todos plugin
app.use(todosRouter)

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
