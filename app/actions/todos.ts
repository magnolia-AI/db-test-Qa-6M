'use server'

import { revalidatePath } from 'next/cache';
import db from '@/lib/db';
import { todos } from '@/lib/schema';
import { eq, desc } from 'drizzle-orm';

export async function getTodos() {
  const allTodos = await db.select().from(todos).orderBy(desc(todos.createdAt));
  return allTodos;
}

export async function addTodo(formData: FormData) {
  const text = formData.get('text') as string;

  if (!text || text.trim() === '') {
    return;
  }

  await db.insert(todos).values({
    text: text,
  });

  revalidatePath('/');
}

export async function toggleTodo(id: number) {
  const todo = await db.select().from(todos).where(eq(todos.id, id)).limit(1);
  
  if (todo.length > 0) {
    await db.update(todos)
      .set({ completed: !todo[0].completed })
      .where(eq(todos.id, id));
    
    revalidatePath('/');
  }
}

export async function deleteTodo(id: number) {
  await db.delete(todos).where(eq(todos.id, id));
  revalidatePath('/');
}

