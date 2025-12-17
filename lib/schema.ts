import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-core';

// Keeping a simple schema for future use, but todos are removed from the app logic
export const logs = pgTable('logs', {
  id: serial('id').primaryKey(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

