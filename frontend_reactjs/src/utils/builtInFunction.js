export const getUrlAction = (oldImage, type) => {
    if(type === "audio") return "http://localhost:5200/file/audios/" + oldImage;
    else if (type === "image") return "http://localhost:5200/file/images/" + oldImage;
    else return "";
}

export const getDurationFormat = second  => {
    let i = 0;
    let h = 0;
    let s = parseInt(second);

    if (s > 60) {
        i = parseInt(s / 60);
        s = parseInt(s % 60);

        if (i > 60) {
            h = parseInt(i / 60);
            i = parseInt(i % 60);
        }
    }
    let zero = v => v >> 0 < 10 ? "0".concat(v) : v;

    if (h > 0) return [zero(h), zero(i), zero(s)].join(":");
    else return [zero(i), zero(s)].join(":");
}
