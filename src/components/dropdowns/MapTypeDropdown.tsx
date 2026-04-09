import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import type {Dispatch, SetStateAction} from "react";
import {MAP_LAYER_STYLES} from "@/components/MapLayerStyles.ts";

type MapTypeDropdownProps = {
    mapType: string
    setMapType: Dispatch<SetStateAction<string>>
}

export default  function MapTypeDropdown({mapType, setMapType}: MapTypeDropdownProps) {
    return(
        <Select key = {mapType} value={mapType} onValueChange={(value) => setMapType(value)}>
    <SelectTrigger className="w-45">
    <SelectValue placeholder="City" />
        </SelectTrigger>
        <SelectContent className="z-1001">
        <SelectGroup>
            {mapLayers.map((layer) => (
                    <SelectItem key={layer} value={layer} className="capitalize">{MAP_LAYER_STYLES[layer].label}</SelectItem>
))}
    </SelectGroup>
    </SelectContent>
    </Select>
)
}

const mapLayers = Object.keys(MAP_LAYER_STYLES)
