import { boolean, integer, pgEnum, pgTable,timestamp,varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const statusEnum = pgEnum("status_type", [
    "invited",
    "accepted",
    "rejected",
    "expired"
]);
// technically speaking -> user_id as member, is_owner: true/false
export const groupTable = pgTable("groups", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  group_name: varchar({length: 255}).notNull(),
    member: integer().notNull().references(() => usersTable.id),
    is_owner: boolean().notNull().default(true)
});

export const groupMembershipsTable = pgTable("group_memberships", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    group_id: integer().notNull().references(() => groupTable.id),
    user_id: integer().notNull().references(() => usersTable.id),
    is_owner: boolean().default(false).notNull(),
  });

export const groupInvitationsTable = pgTable("group_invitations", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    group_id: integer().notNull().references(() => groupTable.id),
    invited_id: integer().notNull().references(() => usersTable.id),
    invited_email: varchar({length: 255}).notNull(),
    invited_token: varchar({length: 255}).notNull(),
    status: statusEnum(),
    created_at: timestamp().defaultNow().notNull(),
    expires_at: timestamp().notNull()
})

export type InsertGroupTable = typeof groupTable.$inferInsert;


export type InsertInvitationType = typeof groupInvitationsTable.$inferInsert;

export type InsertMembershipType = typeof groupMembershipsTable.$inferInsert;