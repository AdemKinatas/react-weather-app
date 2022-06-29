export default function WeatherReducer(state, action) {
    switch (action.type) {
        case 'GET_CITY_NAME':
            return {
                ...state,
                city: action.payload,
            };
        case 'GET_LAN_AND_LON':
            
            return {
                ...state,
                lat: action.payload.newLat,
                lon: action.payload.newLon,
            }
        case 'GET_WEATHER_INFO':
            return {
                ...state,
                weather: action.payload,
            }
        case 'WRONG_CITY_NAME' :
            return {
                ...state,
                weather : []
            }
        default:
            return state;
    }
}
