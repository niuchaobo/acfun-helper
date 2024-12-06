import dayjs from "dayjs";

export const timeTagRegexp = new RegExp("[0-9]{1,3}[:时]?[0-9]{1,3}[:分][0-9]{1,2}秒?");
export const timeTagToTimeSecond = (timeTag: string): number => {
    const raw = timeTagRegexp.exec(timeTag);
    if (!raw || raw?.length <= 0) {
        return 0
    }
    // "01:02:03" => [3,2,1];"02:03" => [3,2]
    const rawGroups = raw[0].split(":").map((v, i, a) => parseInt(v)).reverse()
    return dayjs.duration({
        seconds: rawGroups[0],
        minutes: rawGroups[1],
        hours: rawGroups[2],
    }).asSeconds()
}