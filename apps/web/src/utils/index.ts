import dayjs from "dayjs";

const URL = import.meta.env.BASE_URL;

export const isDev = import.meta.env.DEV;
export const isProd = import.meta.env.PROD;

export const LOGO_PATH = URL + "logo.jpg";
export const LOTTIE_SUCCESS_PATH = URL + "public/success.json";

export function formatDate(date?: dayjs.ConfigType) {
  return dayjs(date).format("DD/MM/BBBB");
}

export function formatDatetime(date?: dayjs.ConfigType) {
  return dayjs(date).format("DD/MM/BBBB hh:mm:ss");
}
