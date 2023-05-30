export const stuffKeys = {
  all: () => ["stuffs"] as const,
  list: (deptId?: string) => {
    if (deptId === undefined) return [...stuffKeys.all(), "list"] as const;
    return [...stuffKeys.all(), "list", deptId] as const;
  },
  detail: (id?: string) => {
    if (id === undefined) return [...stuffKeys.all(), "detail"] as const;
    return [...stuffKeys.all(), "detail", id] as const;
  }
};

export const historyKeys = {
  all: () => ["histories"] as const,
  list: () => [...historyKeys.all(), "list"] as const,
  detail: (id?: string) => {
    if (id === undefined) return [...historyKeys.all(), "detail"] as const;
    return [...historyKeys.all(), "detail", id] as const;
  }
};
