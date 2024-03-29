import type HistoryStatus from '@common/models/types/HistoryStatus';

export const univKeys = {
  all: () => ['univs'] as const,
};

export const deptKeys = {
  all: () => ['depts'] as const,
  list: (univId?: string) => {
    if (univId === undefined) return [...deptKeys.all(), 'list'] as const;
    return [...deptKeys.all(), 'list', univId] as const;
  },
  detail: (id?: string) => {
    if (id === undefined) return [...deptKeys.all(), 'detail'] as const;
    return [...deptKeys.all(), 'detail', id] as const;
  },
  accessible: (token: string) => {
    return [...deptKeys.all(), 'accessible', token] as const;
  },
};

export const userKeys = {
  all: () => ['users'] as const,
  list: (deptId?: string) => {
    if (deptId === undefined) return [...userKeys.all(), 'list'] as const;
    return [...userKeys.all(), 'list', deptId] as const;
  },
  detail: (id?: string) => {
    if (id === undefined) return [...userKeys.all(), 'detail'] as const;
    return [...userKeys.all(), 'detail', id] as const;
  },
  detailByIndex: (univId: string, studentId: string) => {
    return [...userKeys.all(), 'detailByIndex', univId, studentId] as const;
  },
  current: (token: string) => {
    return [...userKeys.all(), 'current', token] as const;
  },
};

export const stuffKeys = {
  all: () => ['stuffs'] as const,
  list: (deptId?: string) => {
    if (deptId === undefined) return [...stuffKeys.all(), 'list'] as const;
    return [...stuffKeys.all(), 'list', deptId] as const;
  },
  detail: (id?: string) => {
    if (id === undefined) return [...stuffKeys.all(), 'detail'] as const;
    return [...stuffKeys.all(), 'detail', id] as const;
  },
};

export const historyKeys = {
  all: () => ['histories'] as const,
  list: () => [...historyKeys.all(), 'list'] as const,
  listByDept: (
    deptId: string,
    requesterId: string | undefined,
    status: HistoryStatus | undefined
  ) => [...historyKeys.list(), deptId, requesterId ?? '-', status ?? '-'] as const,
  detail: (id?: string) => {
    if (id === undefined) return [...historyKeys.all(), 'detail'] as const;
    return [...historyKeys.all(), 'detail', id] as const;
  },
};
