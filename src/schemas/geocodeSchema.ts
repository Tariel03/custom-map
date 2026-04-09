import { z } from "zod";

export const LocalNamesSchema = z.record(z.string(), z.string());

export const LocationSchema = z.object({
    name: z.string(),
    local_names: LocalNamesSchema.optional(), // Some might not have local names
    lat: z.number(),
    lon: z.number(),
    country: z.string().length(2), // ISO 3166 country code
    state: z.string().optional(),   // Useful if you search outside the UK
});

// The top-level response is an array of these objects
export const GeocodingResponseSchema = z.array(LocationSchema);

// Export types for use in your components
export type Location = z.infer<typeof LocationSchema>;
export type GeocodingResponse = z.infer<typeof GeocodingResponseSchema>;