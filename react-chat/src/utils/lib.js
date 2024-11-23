import {Toast} from "./toast.js";

export function errorHandler(error) {
    if (error.response) {
        Object.keys(error.response.data)?.forEach((key) => {
            error.response.data[key].forEach(errorMessage => Toast.error(errorMessage))
        })
    }
}

export function formatDate(input, type = 'year') {
    const date = new Date(input);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    if (type === 'time') {
        return `${hours}:${minutes}`;
    }
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}