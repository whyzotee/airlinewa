import dayjs from "dayjs";

const URL = import.meta.env.BASE_URL;

export const isDev = false; // import.meta.env.DEV;
export const isProd = import.meta.env.PROD;

export const LOGO_PATH = URL + "logo.png";
export const TITLE_PATH = URL + "title.webp";
export const LOTTIE_SUCCESS_PATH = URL + "public/success.json";

export function formatDate(date?: dayjs.ConfigType) {
  return dayjs(date).format("DD/MM/BBBB");
}

export function formatDatetime(date?: dayjs.ConfigType) {
  return dayjs(date).format("DD/MM/BBBB hh:mm:ss");
}
