'use client'

import { useRef } from 'react'
import { Plus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { addTodo } from '@/app/actions/todos'

export function AddTodoForm() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addTodo(formData)
        formRef.current?.reset()
      }}
      className="flex space-x-2"
    >
      <Input
        type="text"
        name="text"
        placeholder="Add a new todo..."
        className="flex-1"
        autoComplete="off"
        required
      />
      <Button type="submit" size="icon">
        <Plus className="h-4 w-4" />
        <span className="sr-only">Add Todo</span>
      </Button>
    </form>
  )
}

