import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    authId: v.string(),
    createdAt: v.number(),
  }),
  workspace: defineTable({
    message: v.any(),
    fileData: v.optional(v.any()),
    user: v.id("users"),
  }),
});
