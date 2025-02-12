import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    pciture: v.optional(v.string()),
    // Timestamp for when the user was created
    createdAt: v.number(),

    // You can store the auth provider's user ID if using authentication
    uid: v.string(),
  })
    .index("by_email", ["email"])
    .index("uid", ["uid"]),
});
