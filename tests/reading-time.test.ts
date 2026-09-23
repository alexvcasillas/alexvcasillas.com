import { describe, it, expect } from 'vitest';
import { readingTime } from '../src/lib/reading-time';

describe('readingTime', () => {
  it('returns at least 1 minute for short text', () => {
    expect(readingTime('hello world')).toBe(1);
  });
  it('rounds up at 200 words per minute', () => {
    const words = Array.from({ length: 401 }, () => 'word').join(' ');
    expect(readingTime(words)).toBe(3);
  });
  it('ignores markdown punctuation and code fences', () => {
    const text = '# Title\n\n```js\nconst a = 1\n```\n\n' + Array.from({ length: 200 }, () => 'w').join(' ');
    expect(readingTime(text)).toBe(2);
  });
});
