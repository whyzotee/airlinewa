import { delay } from "@/app/function";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const APISearchFlight = async (src: string, dest: string, date: string) => {
    await delay(1000);
    try {
        const response = await axios.get(`${API_URL}/api_search_flight`, {
            params: { src, dest, date },
        });

        const data = response.data;

        if (data.error) throw new Error(data.error);

        return data.flights; // คืนค่าเฉพาะ flights
    } catch (error) {
        console.error("Error fetching flights:", error);
        return [];
    }
};
