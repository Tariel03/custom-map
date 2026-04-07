import {MapContainer, Marker, TileLayer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type {CoordinatesProps} from "../types.ts";

type MapProps = {
    coordinates: CoordinatesProps,
    onMapClick: (lat: number, lon: number) => void
}
export default function CustomMap({coordinates, onMapClick}: MapProps){
    const {lat, lon} = coordinates
    return(
        <MapContainer center={[lat, lon]} zoom={5} style={{height: '30rem', width: '100%'}}>
            <MapClick onMapClick={onMapClick}/>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lon]}>
            </Marker>
        </MapContainer>
    )
}
 function MapClick({onMapClick}:{onMapClick: (lat: number, lon: number) => void}) {
    const map = useMap()

     map.on('click', (e) => {
         const {lat, lng} = e.latlng
         map.panTo([lat, lng])
         onMapClick(lat, lng)
     })
     return null
 }