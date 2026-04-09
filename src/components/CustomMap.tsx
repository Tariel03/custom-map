import {MapContainer, Marker, TileLayer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type {CoordinatesProps} from "../types.ts";
import {useEffect} from "react";
import {MaptilerLayer} from "@maptiler/leaflet-maptilersdk";
import MapLegend from "@/components/MapLegend.tsx";
import {MAP_LAYER_STYLES} from "@/components/MapLayerStyles.ts";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

type MapProps = {
    coordinates: CoordinatesProps,
    onMapClick: (lat: number, lon: number) => void,
    mapType: string
}
export default function CustomMap({coordinates, onMapClick, mapType}: MapProps){
    const {lat, lon} = coordinates
    const layerOpacity = MAP_LAYER_STYLES[mapType]?.opacity ?? 0.7;

    return(
        <div className="relative">
            <MapContainer center={[lat, lon]}  key={`${lat}-${lon}`} zoom={5} style={{height: '30rem', width: '100%'}}>
                <MapClick onMapClick={onMapClick}/>
                <MapTileLayer/>
                <TileLayer
                    opacity={layerOpacity}
                    url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
                />
                <Marker position={[lat, lon]} />
            </MapContainer>
            <MapLegend mapType={mapType}/>
        </div>
    )
}

function MapClick({onMapClick}:{onMapClick: (lat: number, lon: number) => void}) {
    const map = useMap()

    useEffect(() => {
        const handleClick = (e: { latlng: { lat: number; lng: number } }) => {
            const {lat, lng} = e.latlng
            map.panTo([lat, lng])
            onMapClick(lat, lng)
        };

        map.on('click', handleClick)

        return () => {
            map.off('click', handleClick)
        }
    }, [map, onMapClick])

    return null
}

function MapTileLayer() {
    const map = useMap()

    useEffect(() => {
        const tileLayer = new MaptilerLayer({style: "basic-dark", apiKey : "m95DfaEILeAMMdYJmVNG"})
        tileLayer.addTo(map)

        return () => {map.removeLayer(tileLayer)}
    }, [map])

    return null
}
