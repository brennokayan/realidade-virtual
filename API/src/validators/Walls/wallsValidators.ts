import { z } from "zod"

export class wallsValidators {
    static wallValidatorId = z.object({
        id: z.string().cuid()
    })
    static wallPostValidator = z.object({
        name: z.string(),
        color: z.string(),
        userId: z.string().cuid()
    })
    static wallPutValidator = z.object({
        id: z.string().cuid(),
        name: z.string(),
        color: z.string(),
    })
}