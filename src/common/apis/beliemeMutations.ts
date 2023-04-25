import { List } from "immutable";
import { useMutation, useQueryClient } from "vue-query";

import {
  addNewItem,
  approveItem,
  cancelItem,
  editStuff,
  postNewStuff,
  rentItem,
  rentStuff,
  reportLostItem,
  returnItem
} from "@common/apis/beliemeApis";
import { historyKeys, stuffKeys } from "@common/apis/queryKeys";
import type {
  DepartmentId,
  HistoryId,
  ItemId,
  Stuff,
  StuffId,
  StuffInfoOnly,
  StuffPostRequestBody,
  StuffWithItems
} from "@common/types/Models";

const queryClient = useQueryClient();

export const usePostNewStuffMutation = (deptId: DepartmentId) => {
  return useMutation((newStuff: StuffPostRequestBody) => postNewStuff(deptId, newStuff), {
    onSuccess: (data) => _addNewStuffToListCache(deptId, data),
    onError: () => queryClient.invalidateQueries(stuffKeys.list(deptId))
  });
};

export const useEditStuffMutation = (stuffId: StuffId) => {
  return useMutation((newStuff: StuffInfoOnly) => editStuff(stuffId, newStuff), {
    onSuccess: (data) => {
      _updateStuffOnListCache(stuffId, data);
      _updateStuffDetailCache(stuffId, data);
    },
    onError: () => {
      queryClient.invalidateQueries(stuffKeys.list(stuffId));
      queryClient.invalidateQueries(stuffKeys.detail(stuffId));
    }
  });
};

export const useAddItemMutation = (stuffId: StuffId) => {
  return useMutation(() => addNewItem(stuffId), {
    // TODO: addNewItem의 response가 바뀌면 바꾸기
    // onSuccess: (data) => {
    //   _updateStuffOnListCache(stuffId, data);
    //   _updateStuffDetailCache(stuffId, data);
    // },
    onSettled: () => {
      queryClient.invalidateQueries(stuffKeys.list(stuffId));
      queryClient.invalidateQueries(stuffKeys.detail(stuffId));
    }
  });
};

export const useRentStuffMutation = (stuffId: StuffId) => {
  return useMutation(() => rentStuff(stuffId), {
    onSettled: () => {
      queryClient.invalidateQueries(stuffKeys.list(stuffId));
      queryClient.invalidateQueries(stuffKeys.detail(stuffId));
    }
  });
};

export const useRentItemMutation = (itemId: ItemId) => {
  return useMutation(() => rentItem(itemId), {
    onSettled: () => {
      queryClient.invalidateQueries(stuffKeys.list(itemId));
      queryClient.invalidateQueries(stuffKeys.detail(itemId));
    }
  });
};

export const useReportLostItemMutation = (itemId: ItemId) => {
  return useMutation(() => reportLostItem(itemId), {
    onSettled: () => {
      queryClient.invalidateQueries(stuffKeys.list(itemId));
      queryClient.invalidateQueries(stuffKeys.detail(itemId));
    }
  });
};

export const useApproveItemMutation = (historyId: HistoryId) => {
  return useMutation(() => approveItem(historyId), {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: stuffKeys.list(historyId),
        exact: true
      });
      queryClient.invalidateQueries({
        queryKey: stuffKeys.detail(historyId),
        exact: true
      });
      queryClient.invalidateQueries(historyKeys.list(historyId));
      queryClient.invalidateQueries(historyKeys.detail(historyId));
    }
  });
};

export const useReturnItemMutation = (historyId: HistoryId) => {
  return useMutation(() => returnItem(historyId), {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: stuffKeys.list(historyId),
        exact: true
      });
      queryClient.invalidateQueries({
        queryKey: stuffKeys.detail(historyId),
        exact: true
      });
      queryClient.invalidateQueries(historyKeys.list(historyId));
      queryClient.invalidateQueries(historyKeys.detail(historyId));
    }
  });
};

export const useCancelItemMutation = (historyId: HistoryId) => {
  return useMutation(() => cancelItem(historyId), {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: stuffKeys.list(historyId),
        exact: true
      });
      queryClient.invalidateQueries({
        queryKey: stuffKeys.detail(historyId),
        exact: true
      });
      queryClient.invalidateQueries(historyKeys.list(historyId));
      queryClient.invalidateQueries(historyKeys.detail(historyId));
    }
  });
};

const _addNewStuffToListCache = (deptId: DepartmentId, data: Stuff) => {
  queryClient.setQueryData(stuffKeys.list(deptId), (prev: List<Stuff> | undefined) => {
    if (prev === undefined) return List<Stuff>([data]);
    return prev.push(data);
  });
};

const _updateStuffOnListCache = (deptId: DepartmentId, data: Stuff) => {
  queryClient.setQueryData(stuffKeys.list(deptId), (prev: List<Stuff> | undefined) => {
    if (prev === undefined) return List<Stuff>([data]);
    return prev.map((target) => (target.name === data.name ? data : target));
  });
};

const _updateStuffDetailCache = (stuffId: StuffId, data: StuffWithItems) => {
  queryClient.setQueryData(stuffKeys.detail(stuffId), data);
};
