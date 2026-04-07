export function convertToCelsius(temperature: number){
    return Math.round((temperature - 32) * 5 / 9);
}