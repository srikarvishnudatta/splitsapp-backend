import { boolean, integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  is_verified: boolean().notNull().default(false)
});

export const verificationTable = pgTable("verification_table", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  expiresAt: timestamp().notNull()
})

export type InsertVerificationTable = typeof verificationTable.$inferInsert;

export type InsertUserType = typeof usersTable.$inferInsert;
export type SelectUserType = {
  email:string,
  password:string;
}