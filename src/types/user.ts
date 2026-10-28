import { ZodNullable } from "zod";

export interface IUser {
  user: {
    id: number;
    name: string;
    email: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
  };
  token: string;
}
