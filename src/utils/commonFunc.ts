export const extractPublicId = (url:any) => {
    return url.split("/").slice(-2, -1).concat(url.split("/").pop()?.split(".")[0]).join("/")
}