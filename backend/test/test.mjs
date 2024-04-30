// test/test.js
import { expect } from "chai";
import textAnalyzer from "../dist/service/textAnalyzer.js";
const txt =
  "The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.";
describe(`textAnalyzer:"${txt}"`, () => {
  it("Char count should be '58'", () => {
    const result = textAnalyzer.charCount(txt);
    expect(result.count).to.equal(58);
  });

  it("Word count should be '16'", () => {
    const result = textAnalyzer.wordCount(txt);
    expect(result.count).to.equal(16);
  });

  it("Sentence count should be '2'", () => {
    const result = textAnalyzer.sentenceCount(txt);
    expect(result.count).to.equal(2);
  });

  it("Paragraph count should be '1'", () => {
    const result = textAnalyzer.paraCount(txt);
    expect(result.count).to.equal(1);
  });

  it("Longest word should be 'quick'", () => {
    const result = textAnalyzer.longestWord(txt);
    expect(result.data).to.equal("quick");
  });

  it("Longest word count should be '5'", () => {
    const result = textAnalyzer.longestWord(txt);
    expect(result.count).to.equal(5);
  });
});
