import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createWorkspace = mutation({
  args: {
    message: v.any(),
    user: v.id("users"),
  },
  handler: async (ctx, args) => {
    const workspaceId = await ctx.db.insert("workspace", {
      message: args.message,
      user: args.user,
    });
    return workspaceId;
  },
});

export const GetWorkspace = query({
  args: {
    workspaceId: v.id("workspace"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.workspaceId);
  },
});
