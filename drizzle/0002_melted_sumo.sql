ALTER TABLE "group_invitations" RENAME COLUMN "invited_id" TO "sender_id";--> statement-breakpoint
ALTER TABLE "group_invitations" RENAME COLUMN "invited_email" TO "receiver_id";--> statement-breakpoint
ALTER TABLE "group_invitations" DROP CONSTRAINT "group_invitations_invited_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "groups" ADD COLUMN "members" integer[] DEFAULT '{}'::integer[] NOT NULL;--> statement-breakpoint
ALTER TABLE "groups" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "group_invitations" ADD CONSTRAINT "group_invitations_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_invitations" ADD CONSTRAINT "group_invitations_receiver_id_users_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_invitations" DROP COLUMN "invited_token";