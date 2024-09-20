import correctSentence from './correctSentence';

test('returns empty string', () => {
  expect(correctSentence(1231)).toBe("")
  expect(correctSentence(null)).toBe("")
  expect(correctSentence(undefined)).toBe("")
  expect(correctSentence(NaN)).toBe("")
})

test('returns correct sentence', () => {
  expect(correctSentence("greetings, friends")).toBe("Greetings, friends.")
  expect(correctSentence("Greetings, friends")).toBe("Greetings, friends.")
  expect(correctSentence("Greetings, friends.")).toBe("Greetings, friends.")
})
