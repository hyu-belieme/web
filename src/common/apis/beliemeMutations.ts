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
  Stuff,
  StuffInfoOnly,
  StuffPostRequestBody,
  StuffWithItems
} from "@common/types/Models";

const queryClient = useQueryClient();

export const usePostNewStuffMutation = (univCode: string, deptCode: string) => {
  return useMutation(
    (newStuff: StuffPostRequestBody) => postNewStuff(univCode, deptCode, newStuff),
    {
      onSuccess: (data) => _addNewStuffToListCache(univCode, deptCode, data),
      onError: () => queryClient.invalidateQueries(stuffKeys.list(univCode, deptCode))
    }
  );
};

export const useEditStuffMutation = (univCode: string, deptCode: string, stuffName: string) => {
  return useMutation(
    (newStuff: StuffInfoOnly) => editStuff(univCode, deptCode, stuffName, newStuff),
    {
      onSuccess: (data) => {
        _updateStuffOnListCache(univCode, deptCode, data);
        _updateStuffDetailCache(univCode, deptCode, stuffName, data);
      },
      onError: () => {
        queryClient.invalidateQueries(stuffKeys.list(univCode, deptCode));
        queryClient.invalidateQueries(stuffKeys.detail(univCode, deptCode, stuffName));
      }
    }
  );
};

export const useAddItemMutation = (univCode: string, deptCode: string, stuffName: string) => {
  return useMutation(() => addNewItem(univCode, deptCode, stuffName), {
    // TODO: addNewItem의 response가 바뀌면 바꾸기
    // onSuccess: (data) => {
    //   _updateStuffOnListCache(univCode, deptCode, data);
    //   _updateStuffDetailCache(univCode, deptCode, stuffName, data);
    // },
    onSettled: () => {
      queryClient.invalidateQueries(stuffKeys.list(univCode, deptCode));
      queryClient.invalidateQueries(stuffKeys.detail(univCode, deptCode, stuffName));
    }
  });
};

export const useRentStuffMutation = (univCode: string, deptCode: string, stuffName: string) => {
  return useMutation(() => rentStuff(univCode, deptCode, stuffName), {
    onSettled: () => {
      queryClient.invalidateQueries(stuffKeys.list(univCode, deptCode));
      queryClient.invalidateQueries(stuffKeys.detail(univCode, deptCode, stuffName));
    }
  });
};

export const useRentItemMutation = (
  univCode: string,
  deptCode: string,
  stuffName: string,
  itemNum: number
) => {
  return useMutation(() => rentItem(univCode, deptCode, stuffName, itemNum), {
    onSettled: () => {
      queryClient.invalidateQueries(stuffKeys.list(univCode, deptCode));
      queryClient.invalidateQueries(stuffKeys.detail(univCode, deptCode, stuffName));
    }
  });
};

export const useReportLostItemMutation = (
  univCode: string,
  deptCode: string,
  stuffName: string,
  itemNum: number
) => {
  return useMutation(() => reportLostItem(univCode, deptCode, stuffName, itemNum), {
    onSettled: () => {
      queryClient.invalidateQueries(stuffKeys.list(univCode, deptCode));
      queryClient.invalidateQueries(stuffKeys.detail(univCode, deptCode, stuffName));
    }
  });
};

export const useApproveItemMutation = (
  univCode: string,
  deptCode: string,
  stuffName: string,
  itemNum: number,
  historyNum: number
) => {
  return useMutation(() => approveItem(univCode, deptCode, stuffName, itemNum), {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: stuffKeys.list(univCode, deptCode),
        exact: true
      });
      queryClient.invalidateQueries({
        queryKey: stuffKeys.detail(univCode, deptCode, stuffName),
        exact: true
      });
      queryClient.invalidateQueries(historyKeys.list(univCode, deptCode));
      queryClient.invalidateQueries(
        historyKeys.detail(univCode, deptCode, stuffName, itemNum, historyNum)
      );
    }
  });
};

export const useReturnItemMutation = (
  univCode: string,
  deptCode: string,
  stuffName: string,
  itemNum: number,
  historyNum: number
) => {
  return useMutation(() => returnItem(univCode, deptCode, stuffName, itemNum), {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: stuffKeys.list(univCode, deptCode),
        exact: true
      });
      queryClient.invalidateQueries({
        queryKey: stuffKeys.detail(univCode, deptCode, stuffName),
        exact: true
      });
      queryClient.invalidateQueries(historyKeys.list(univCode, deptCode));
      queryClient.invalidateQueries(
        historyKeys.detail(univCode, deptCode, stuffName, itemNum, historyNum)
      );
    }
  });
};

export const useCancelItemMutation = (
  univCode: string,
  deptCode: string,
  stuffName: string,
  itemNum: number,
  historyNum: number
) => {
  return useMutation(() => cancelItem(univCode, deptCode, stuffName, itemNum), {
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: stuffKeys.list(univCode, deptCode),
        exact: true
      });
      queryClient.invalidateQueries({
        queryKey: stuffKeys.detail(univCode, deptCode, stuffName),
        exact: true
      });
      queryClient.invalidateQueries(historyKeys.list(univCode, deptCode));
      queryClient.invalidateQueries(
        historyKeys.detail(univCode, deptCode, stuffName, itemNum, historyNum)
      );
    }
  });
};

const _addNewStuffToListCache = (univCode: string, deptCode: string, data: Stuff) => {
  queryClient.setQueryData(stuffKeys.list(univCode, deptCode), (prev: List<Stuff> | undefined) => {
    if (prev === undefined) return List<Stuff>([data]);
    return prev.push(data);
  });
};

const _updateStuffOnListCache = (univCode: string, deptCode: string, data: Stuff) => {
  queryClient.setQueryData(stuffKeys.list(univCode, deptCode), (prev: List<Stuff> | undefined) => {
    if (prev === undefined) return List<Stuff>([data]);
    return prev.map((target) => (target.name === data.name ? data : target));
  });
};

const _updateStuffDetailCache = (
  univCode: string,
  deptCode: string,
  stuffName: string,
  data: StuffWithItems
) => {
  queryClient.setQueryData(stuffKeys.detail(univCode, deptCode, stuffName), data);
};
