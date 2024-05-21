import { z } from "zod";

export class VideosValidators{
    static VideoValidatorId = z.object({
        id: z.string().cuid()
    })
    static VideoPostValidator = z.object({
        name: z.string(),
        url: z.string(),
        time: z.string(),
        userId: z.string().cuid()
    })
    static VideoPostFileValidator = z.object({
        name: z.string(),
        time: z.string(),
        userId: z.string().cuid()
    })
    static VideoPutValidator = z.object({
        name: z.string(),
        time: z.string(),
    })
    
}