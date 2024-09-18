/*
 * Необходимо покрыть все возможные
 * и невозможные кейсы. Например,
 * convertBytesToHuman(-1) === false,
 * convertBytesToHuman(-1) !== '1 B',
 * convertBytesToHuman('string') === false
 * convertBytesToHuman(5) === '5 B'
 */

import convertBytesToHuman from './convertBytesToHuman';

test('Возвращает false для неправильного типа данных', () => {
  expect(convertBytesToHuman(-1)).toBe(false)
  expect(convertBytesToHuman('string')).toBe(false)
  expect(convertBytesToHuman([1, 2, 3, 4, 5])).toBe(false)
  expect(convertBytesToHuman(-1)).not.toBe("1 B")
});

test('Возвращает корректное значение для чисел', () => {
  expect(convertBytesToHuman(0)).toBe("0 B")
  expect(convertBytesToHuman(567)).toBe("567 B")
  expect(convertBytesToHuman(1024)).toBe("1 KB")
  expect(convertBytesToHuman(1025)).toBe("1.00 KB")
  expect(convertBytesToHuman(1048276)).toBe("1023.71 KB")
  expect(convertBytesToHuman(23461345335)).toBe("21.85 GB")
  expect(convertBytesToHuman(9992346134533523461345335)).toBe("8.27 YB")
});
