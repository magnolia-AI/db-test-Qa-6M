import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const techLogs = pgTable('tech_logs', {
  id: serial('id').primaryKey(),
  event: varchar('event', { length: 255 }).notNull(),
  details: text('details').notNull(),
  severity: varchar('severity', { length: 50 }).default('info').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

export type TechLog = typeof techLogs.$inferSelect;
export type NewTechLog = typeof techLogs.$inferInsert;

