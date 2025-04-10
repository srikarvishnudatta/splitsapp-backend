import { integer, pgTable,varchar, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "../db/schemas/users";

export const sessionTable = pgTable("session_table", {
    id:integer("session_id").primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer().notNull().references(() => usersTable.id),
    userAgent: varchar({length: 255}),
    created_at: timestamp().defaultNow().notNull(),
    expires_at: timestamp().notNull()
});
