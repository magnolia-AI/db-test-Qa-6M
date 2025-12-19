'use server';

import db from '@/lib/db';
import { techLogs } from '@/lib/schema';
import { revalidatePath } from 'next/cache';
import { desc } from 'drizzle-orm';
import { ActionResult } from '@/types/actions';

export async function getLogs() {
  try {
    const logs = await db.select().from(techLogs).orderBy(desc(techLogs.timestamp)).limit(50);
    return { success: true, data: logs };
  } catch (error) {
    console.error('Failed to fetch logs:', error);
    return { success: false, error: 'Failed to fetch system logs' };
  }
}

export async function createLogEntry(event: string, details: string, severity: string = 'info') {
  try {
    const [newEntry] = await db.insert(techLogs).values({
      event,
      details,
      severity
    }).returning();
    
    revalidatePath('/');
    return { success: true, data: newEntry };
  } catch (error) {
    console.error('Failed to create log entry:', error);
    return { success: false, error: 'Database synchronization failed' };
  }
}

