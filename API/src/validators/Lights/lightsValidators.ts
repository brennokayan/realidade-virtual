import { z } from "zod";

export class LightsValidators {
    static lightValidatorId = z.object({
        id: z.string().cuid()
    });

    static lightPostValidator = z.object({
        name: z.string(),
        ilumminence: z.number(),
        range: z.number(),
        color: z.string(),
        userId: z.string().cuid()
    });
    static lightPutValidator = z.object({
        id: z.string().cuid(),
        ilumminence: z.number(),
        range: z.number(),
        color: z.string()
    });
}