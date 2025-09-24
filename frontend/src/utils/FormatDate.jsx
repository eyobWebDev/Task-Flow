import { formatDistanceToNow } from "date-fns"


export function FormatDateRelative(date){
   if(!date) return ""

    return formatDistanceToNow(new Date(date), {addSuffix: true})
}

export function FormatDate(dateString) {
    if(!dateString) return ""
    const date = new Date(dateString)

    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    }).format(date)
}

export function FormatDateShort(dateString){
    if(!dateString) return ""
    const date = new Date(dateString)

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
    }).format(date)
}