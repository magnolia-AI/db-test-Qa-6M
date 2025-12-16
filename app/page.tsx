import { getTodos } from '@/app/actions/todos'
import { AddTodoForm } from '@/components/add-todo-form'
import { TodoItem } from '@/components/todo-item'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const todos = await getTodos()

  return (
    <main className="min-h-screen w-full bg-background flex flex-col items-center pt-20 pb-10 px-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Todos</h1>
          <p className="text-muted-foreground">
            Shared database-backed task list.
          </p>
        </div>

        <div className="bg-card border rounded-xl shadow-sm p-6 space-y-6">
          <AddTodoForm />
          
          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed rounded-lg border-muted">
                <p className="text-muted-foreground text-sm">
                  No tasks yet. Add one to get started.
                </p>
              </div>
            ) : (
              todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

