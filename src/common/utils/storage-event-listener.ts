import useDeptStore from '@common/stores/dept-store';
import useUserStore from '@common/stores/user-store';
import { deptIdStorage, userInfoStorage } from '@common/webstorages/storages';

function setStorageEventListener() {
  window.addEventListener('storage', (event) => {
    if (event.storageArea === userInfoStorage.storageArea && event.key === userInfoStorage.key) {
      useUserStore().updateUser();
    }
    if (event.storageArea === deptIdStorage.storageArea && event.key === deptIdStorage.key) {
      useDeptStore().updateDeptId();
    }
  });
}

export default setStorageEventListener;
