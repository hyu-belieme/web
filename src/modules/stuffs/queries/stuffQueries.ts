import type { List } from "immutable";
import { storeToRefs } from "pinia";
import { type UseQueryReturnType, useQuery } from "vue-query";

import { getAllStuffsInDept, getStuff } from "@common/apis/beliemeApis";
import { stuffKeys } from "@common/apis/queryKeys";
import { useDeptStore } from "@common/stores/deptStore";
import type { Stuff, StuffWithItems } from "@common/types/Models";

import { useStuffStore } from "@^stuffs/stores/stuffStore";

const deptStore = useDeptStore();
const { deptId } = storeToRefs(deptStore);

const stuffStore = useStuffStore();
const { selectedId } = storeToRefs(stuffStore);

let stuffListQuery: undefined | UseQueryReturnType<List<Stuff>, unknown> = undefined;
let stuffDetailQuery: undefined | UseQueryReturnType<StuffWithItems, unknown> = undefined;

export const getStuffListQuery = () => {
  if (stuffListQuery === undefined) {
    stuffListQuery = useQuery<List<Stuff>>(stuffKeys.list(), () =>
      getAllStuffsInDept(deptId.value)
    );
  }
  return stuffListQuery;
};

export const getStuffDetailQuery = () => {
  if (stuffDetailQuery === undefined) {
    stuffDetailQuery = useQuery<StuffWithItems>(stuffKeys.detail(), () =>
      getStuff(selectedId.value)
    );
  }
  return stuffDetailQuery;
};
