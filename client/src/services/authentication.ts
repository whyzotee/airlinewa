import axios from "axios";
import { delay } from "../app/function";

const API_URL = "http://127.0.0.1:8000";

export const APILogin = async (username: string, password: string) => {
    await delay(1000);
    if (!username.trim() || !password.trim()) {
        throw Error("Error: username or password mustn't be null value");
    }

    const response = await axios.post(`${API_URL}/api_login`, {
        username: username,
        password: password
    });

    if (response.status > 201) throw Error(`Error: status code ${response.status}`);

    const data = response.data;

    if (data.error != null) throw Error(data.error);

    return data.id;
}