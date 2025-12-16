'use client'

import { Todo } from '@/lib/schema'
import { toggleTodo, deleteTodo } from '@/app/actions/todos'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useTransition } from 'react'

export function TodoItem({ todo }: { todo: Todo }) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="flex items-center space-x-3 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
      <Checkbox
        checked={todo.completed}
        onCheckedChange={() => {
          startTransition(async () => {
            await toggleTodo(todo.id)
          })
        }}
        disabled={isPending}
        id={`todo-${todo.id}`}
      />
      
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-1 text-sm font-medium leading-none cursor-pointer ${
          todo.completed ? 'line-through text-muted-foreground' : ''
        }`}
      >
        {todo.text}
      </label>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          startTransition(async () => {
            await deleteTodo(todo.id)
          })
        }}
        disabled={isPending}
        className="text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  )
}

