import dayjs from "dayjs";
import buddhistEraPlugin from "dayjs/plugin/buddhistEra";
import relativeTimePlugin from "dayjs/plugin/relativeTime";

dayjs.extend(buddhistEraPlugin);
dayjs.extend(relativeTimePlugin);
