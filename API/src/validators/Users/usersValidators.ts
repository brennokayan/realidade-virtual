import { z } from "zod";

export class UsersValidators {
    static userValidatorId = z.object({
        id: z.string().cuid()
    });
    static userPostValidator = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string()
    });
    static userPutValidator = z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        password: z.string()
    });
    static userLoginValidator = z.object({
        email: z.string(),
        password: z.string()
    });
    static authToken = z.object({
        token: z.string().uuid()
      })
}