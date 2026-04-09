import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import type {Dispatch, SetStateAction} from "react";
type LocationDropdownProps = {
    location: string
    setLocation: Dispatch<SetStateAction<string>>
}
export default  function LocationDropdown({location, setLocation}: LocationDropdownProps) {
    return(
        <Select value={location} onValueChange={(value) => setLocation(value)}>
            <SelectTrigger className="w-45">
                <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent className="z-1001">
                <SelectItem value='custom'>Custom</SelectItem>
                <SelectGroup>
                    {locations.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

const locations = [
    'Toronto',
    'New York',
    'London',
    'Paris',
    'Sydney',
    'Moscow',
    'Bishkek',
    'Beijing',
    'Tokyo',
    'Mumbai',
    'Delhi',
    'Rome'
]