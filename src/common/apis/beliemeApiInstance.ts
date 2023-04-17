import axios from "axios";
import { storeToRefs } from "pinia";

import { useUserTokenStore } from "@common/stores/userTokenStore";

const userTokenStore = useUserTokenStore();
const { userToken } = storeToRefs(userTokenStore);

const createInstance = () =>
  axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 1000,
    headers: { "user-token": userToken.value }
  });

export default createInstance;
