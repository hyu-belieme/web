export const stuffKeys = {
  all: ["stuffs"] as const,
  list: () => [...stuffKeys.all, "list"] as const,
  detail: () => [...stuffKeys.all, "detail"] as const
};

export const historyKeys = {
  all: ["histories"] as const,
  list: () => [...historyKeys.all, "list"] as const,
  detail: () => [...historyKeys.all, "detail"] as const
};
