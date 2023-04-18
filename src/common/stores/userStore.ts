import { defineStore } from "pinia";
import { NIL as NILL_UUID } from "uuid";
import { computed, readonly, ref } from "vue";

import { type Loading, loading } from "@common/types/Loading";
import type { UserWithSecureInfo } from "@common/types/Models";

type UserMode = "USER" | "STAFF" | "MASTER";

export const useUserStore = defineStore("user", () => {
  const user = ref<UserWithSecureInfo | Loading | undefined>({
    university: {
      code: "DEV",
      name: "DEV"
    },
    studentId: "DEV3",
    name: "개발자1",
    authorities: [
      {
        department: {
          university: {
            code: "DEV",
            name: "DEV"
          },
          code: "DEV",
          name: "DEV",
          baseMajors: []
        },
        permission: "DEVELOPER"
      }
    ],
    token: "2aa35846-913a-47b5-ac44-b47a9481f2fa",
    createdAt: 1680146837,
    approvedAt: 1680146837
  });

  const userMode = ref<UserMode>("USER");

  const userToken = computed(() => {
    if (user.value === undefined || user.value === loading) return NILL_UUID;
    return user.value.token;
  });

  function updateUserMode(_userMode: UserMode) {
    userMode.value = _userMode;
  }

  function updateUser(_user: UserWithSecureInfo) {
    user.value = _user;
  }

  const $user = readonly(user);
  const $userMode = readonly(userMode);
  return {
    user: $user,
    userMode: $userMode,
    userToken,
    updateUser,
    updateUserMode
  };
});
