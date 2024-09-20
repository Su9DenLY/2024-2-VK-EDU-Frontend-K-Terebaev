/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
  if (bytes < 0 || typeof bytes !== "number" || isNaN(bytes)) {
      return false
  }
  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
  let counter = 0
  while (bytes >= 1024) {
      bytes /= 1024
      counter++
  }
  return `${parseInt(bytes) < bytes ? bytes.toFixed(2) : bytes}` + ' ' + units[counter] 
}
