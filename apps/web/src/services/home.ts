import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const APIGetAirport = async () => {
    const response = await axios.get(`${API_URL}/api_get_airport`);

    const data = response.data;

    if (data.error != null) throw new Error(data.error);

    return data;
};