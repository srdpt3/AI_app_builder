import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    authId: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      image: args.image,
      authId: args.authId,
      createdAt: Date.now(),
    });

    return userId;
  },
});

export const GetUser = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // if user already exists
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    if (user) {
      return user;
    }
    // if not exists create new user
    return await ctx.runMutation(createUser, {
      name: args.name,
      email: args.email,
      image: args.image,
      authId: args.authId,
      token: 50000,
    });
  },
});
