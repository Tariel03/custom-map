export const POLLUTANT_NAMES: Record<string, { full: string; abbr: string }> = {
    CO: { full: "Carbon Monoxide", abbr: "CO" },
    NO2: { full: "Nitrogen Dioxide", abbr: "NO₂" },
    O3: { full: "Ozone", abbr: "O₃" },
    SO2: { full: "Sulphur Dioxide", abbr: "SO₂" },
    PM2_5: { full: "Fine Particulate", abbr: "PM₂.₅" },
    PM10: { full: "Coarse Particulate", abbr: "PM₁₀" },
} as const;