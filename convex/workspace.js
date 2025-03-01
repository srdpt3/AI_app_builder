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

export const updateFiles = mutation({
  args: {
    workspaceId: v.id("workspace"),
    files: v.any(),
  },
  handler: async (ctx, args) => {
    const { workspaceId, files } = args;

    // Log the inputs to help with debugging
    console.log("Updating fileData for workspace:", workspaceId);

    try {
      // Check if workspace exists
      const workspace = await ctx.db.get(workspaceId);
      if (!workspace) {
        throw new Error("Workspace not found");
      }

      // Update the workspace with the files using the correct field name 'fileData'
      const result = await ctx.db.patch(workspaceId, { fileData: files });

      console.log("Update result:", result);
      return result;
    } catch (error) {
      console.error("Error updating fileData:", error);
      throw error;
    }
  },
});

export const GetAllWorkspaceHistory = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("workspace")
      .filter((q) => q.eq(q.field("user"), args.userId))
      .collect();
  },
});
