import { z } from "zod";

export const AirPollutionSchema = z.object({
    // Correcting from array to object to match the API response
    coord: z.object({
        lat: z.number(),
        lon: z.number()
    }),

    list: z.array(
        z.object({
            dt: z.number(),
            main: z.object({
                aqi: z.number().min(1).max(5),
            }),
            components: z.object({
                co: z.number(),
                no2: z.number(),
                o3: z.number(),
                so2: z.number(),
                pm2_5: z.number(),
                pm10: z.number(),
            }),
        })
    ),
});
// Extract the TypeScript type from the schema
export type AirPollutionResponse = z.infer<typeof AirPollutionSchema>;