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

export const updateMessage = mutation({
  args: {
    workspaceId: v.id("workspace"),
    message: v.any(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.workspaceId, {
      message: args.message,
    });
  },
});
