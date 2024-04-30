type responseType = { data: string[]; count: number; message?: string };
export const wordCount: any = (txt: string): responseType => {
  const arr = txt.trim().match(/\w+/g) || [];

  return { data: arr, count: arr?.length };
};
export const charCount: any = (txt: string): responseType => {
  const arr = txt.trim().match(/[a-zA-Z]/g) || [];
  return {
    data: arr,
    count: arr?.length,
  };
};

export const sentenceCount: any = (txt: string): responseType => {
  if (txt == "") return { data: [], count: 0 };
  const arr = txt.trim().match(/[.!?]+/g) || [];
  return { data: arr, count: arr.length };
};

export const paraCount: any = (txt: string): responseType => {
  if (txt == "") return { data: [], count: 0 };
  const arr = txt.trim().match(/\n{2,}/g) || [];
  return { data: arr, count: arr.length + 1 };
};

export const longestWord: any = (
  txt: string
): { data?: string; count?: number } => {
  const arr = txt
    .trim()
    .match(/\w+/g)
    ?.sort((a, b) => b.length - a.length);

  return { data: arr?.[0], count: arr?.[0].length };
};
export const index: any = (
  txt: string
): {
  cCount: number;
  wCount?: number;
  sCount?: number;
  pCount: number;
  lWord: number;
} => {
  const { count: cCount } = charCount(txt);
  const { count: wCount } = wordCount(txt);
  const { count: sCount } = sentenceCount(txt);
  const { count: pCount } = paraCount(txt);
  const { data: lWord } = longestWord(txt);
  return { cCount, wCount, sCount, pCount, lWord };
};
export default {
  wordCount,
  charCount,
  sentenceCount,
  paraCount,
  longestWord,
  index,
};
