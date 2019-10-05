export const getUrlAction = (oldImage, type) => {
    if(type === "audio") return "http://localhost:5200/file/audios/" + oldImage;
    else if (type === "image") return "http://localhost:5200/file/images/" + oldImage;
    else return "";
}


export const getDurationFormat = (duration) => {
    return parseInt(duration / 60, 10) + ":" + parseInt(duration % 60);
}