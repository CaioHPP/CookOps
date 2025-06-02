import { z } from "zod";

export const BoardRequestAddSchema = z.object({
  titulo: z.string(),
});

export const BoardRequestUpdateSchema = z.object({
  titulo: z.string().optional(),
});

export type BoardRequestAddDto = z.infer<typeof BoardRequestAddSchema>;
export type BoardRequestUpdateDto = z.infer<typeof BoardRequestUpdateSchema>;
