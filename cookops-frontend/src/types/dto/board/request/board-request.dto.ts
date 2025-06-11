import { z } from "zod";

export const BoardRequestAddSchema = z.object({
  titulo: z.string(),
  status: z.array(z.string()).optional(),
});

export const BoardRequestUpdateSchema = z.object({
  titulo: z.string().optional(),
  status: z.array(z.string()).optional(),
});

export type BoardRequestAddDto = z.infer<typeof BoardRequestAddSchema>;
export type BoardRequestUpdateDto = z.infer<typeof BoardRequestUpdateSchema>;
