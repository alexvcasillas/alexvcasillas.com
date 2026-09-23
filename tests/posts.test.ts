import { describe, it, expect } from 'vitest';
import { publishedOnly, sortNewestFirst, allTags, formatDate } from '../src/lib/posts';

const post = (id: string, date: string, tags: string[] = [], draft = false) => ({
  id,
  data: { title: id, description: '', date: new Date(date), tags, draft },
});

describe('posts helpers', () => {
  it('filters out drafts', () => {
    const result = publishedOnly([post('a', '2025-01-01'), post('b', '2025-01-02', [], true)]);
    expect(result.map((p) => p.id)).toEqual(['a']);
  });
  it('sorts newest first without mutating input', () => {
    const input = [post('old', '2023-05-31'), post('new', '2025-07-12')];
    const result = sortNewestFirst(input);
    expect(result.map((p) => p.id)).toEqual(['new', 'old']);
    expect(input[0].id).toBe('old');
  });
  it('collects unique sorted tags', () => {
    expect(allTags([post('a', '2025-01-01', ['node', 'memory']), post('b', '2025-01-02', ['node'])])).toEqual(['memory', 'node']);
  });
  it('formats dates as day month year', () => {
    expect(formatDate(new Date('2025-07-12T00:00:00Z'))).toBe('12 July 2025');
  });
});
