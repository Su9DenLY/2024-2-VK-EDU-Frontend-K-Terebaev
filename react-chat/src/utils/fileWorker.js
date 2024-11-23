export class FileWorker {
    convertToFileUrl(input) {
        if (!input) {
            return ''
        }
        if (input instanceof File) {
            return URL.createObjectURL(input);
        } else {

            const base64Data = input.includes(";base64,")
                ? input.split(";base64,")[1]
                : input;

            const binaryData = atob(base64Data);

            const byteArray = new Uint8Array(binaryData.length);
            for (let i = 0; i < binaryData.length; i++) {
                byteArray[i] = binaryData.charCodeAt(i);
            }
            const blob = new Blob([byteArray]);
            return URL.createObjectURL(blob);
        }
    }
}
