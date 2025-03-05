import axios from "axios";
import { delay } from "../app/function";

const API_URL = "http://127.0.0.1:8000";

export const APICheckout = async (flight_id: string) => {
    await delay(1000);
    const response = await axios.post(`${API_URL}/api_checkout`, {
        id: flight_id,
    });

    const data = response.data;

    if (data.error != null) throw new Error(data.error);

    console.log(data);

    return data;
};