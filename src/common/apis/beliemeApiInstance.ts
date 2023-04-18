import axios from "axios";
import { storeToRefs } from "pinia";

import { useUserStore } from "@common/stores/userStore";

const userStore = useUserStore();
const { userToken } = storeToRefs(userStore);

const createInstance = () =>
  axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 1000,
    headers: { "user-token": userToken.value }
  });

export default createInstance;
