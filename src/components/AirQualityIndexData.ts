export const AIR_QUALITY_INDEX_DATA = {
    SO2: {
        Good: { level: 1, min: 0, max: 20 },
        Fair: { level: 2, min: 20, max: 80 },
        Moderate: { level: 3, min: 80, max: 250 },
        Poor: { level: 4, min: 250, max: 350 },
        "Very Poor": { level: 5, min: 350, max: Infinity }
    },
    NO2: {
        Good: { level: 1, min: 0, max: 40 },
        Fair: { level: 2, min: 40, max: 70 },
        Moderate: { level: 3, min: 70, max: 150 },
        Poor: { level: 4, min: 150, max: 200 },
        "Very Poor": { level: 5, min: 200, max: Infinity }
    },
    PM10: {
        Good: { level: 1, min: 0, max: 20 },
        Fair: { level: 2, min: 20, max: 50 },
        Moderate: { level: 3, min: 50, max: 100 },
        Poor: { level: 4, min: 100, max: 200 },
        "Very Poor": { level: 5, min: 200, max: Infinity }
    },
    PM2_5: {
        Good: { level: 1, min: 0, max: 10 },
        Fair: { level: 2, min: 10, max: 25 },
        Moderate: { level: 3, min: 25, max: 50 },
        Poor: { level: 4, min: 50, max: 75 },
        "Very Poor": { level: 5, min: 75, max: Infinity }
    },
    O3: {
        Good: { level: 1, min: 0, max: 60 },
        Fair: { level: 2, min: 60, max: 100 },
        Moderate: { level: 3, min: 100, max: 140 },
        Poor: { level: 4, min: 140, max: 180 },
        "Very Poor": { level: 5, min: 180, max: Infinity }
    },
    CO: {
        Good: { level: 1, min: 0, max: 4400 },
        Fair: { level: 2, min: 4400, max: 9400 },
        Moderate: { level: 3, min: 9400, max: 12400 },
        Poor: { level: 4, min: 12400, max: 15400 },
        "Very Poor": { level: 5, min: 15400, max: Infinity }
    }
} as const;