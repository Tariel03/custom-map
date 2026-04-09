import {MAP_LAYER_STYLES} from "@/components/MapLayerStyles.ts";

type MapLegendProps = {
    mapType: string;
};

export default function MapLegend({mapType}: MapLegendProps) {
    const config = MAP_LAYER_STYLES[mapType];

    if (!config) {
        return null;
    }
    const maxValue = config.stops[config.stops.length - 1].value;

    const gradient = `linear-gradient(to right, ${config.stops
        .map((stop) => `${stop.color} ${(stop.value /maxValue) * 100}%`)
        .join(", ")})`;

    return (
        <div className="absolute right-4 bottom-4 z-1000 w-64 rounded-lg border border-white/20 bg-black/70 p-4 text-white shadow-lg backdrop-blur-sm">
            <div className="mb-2 flex items-center justify-between gap-2">
                <h4 className="text-sm font-semibold">{config.label}</h4>
                <span className="text-xs text-white/70">{config.unit}</span>
            </div>
            <div
                className="h-3 w-full rounded-full border border-white/10"
                style={{backgroundImage: gradient}}
            />
            <div className="mt-2 flex justify-between gap-2 text-[11px] text-white/75">
                {config.stops.map((stop) => (
                    <span key={`${config.id}-${stop.value}`}>{stop.value}</span>
                ))}
            </div>
        </div>
    );
}