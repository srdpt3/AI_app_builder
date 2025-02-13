import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    authId: v.string(),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_authId", ["authId"]),
});
