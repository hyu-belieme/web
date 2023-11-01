export type UserDiffType = 'ADDED' | 'DELETED' | 'MODIFIED' | 'NIL';

export function compare(a: UserDiffType, b: UserDiffType): number {
  if (a === 'ADDED') {
    if (b === 'ADDED') return 0;
    return -1;
  }

  if (a === 'DELETED') {
    if (b === 'ADDED') return 1;
    if (b === 'DELETED') return 0;
    return -1;
  }

  if (a === 'MODIFIED') {
    if (b === 'ADDED' || b === 'DELETED') return 1;
    if (b === 'MODIFIED') return 0;
    return -1;
  }

  if (b === 'NIL') return 0;
  return -1;
}
