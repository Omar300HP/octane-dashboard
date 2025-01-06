"use client";

import { z } from "zod";

export const roles = ["Admin", "User", "Guest"] as const;

export const rolesOptions = roles.map((role) => ({
  value: role,
  label: role,
}));

export const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  role: z.enum(roles),
  isActive: z.boolean(),
});
