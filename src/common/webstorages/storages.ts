import type UserWithSecureInfo from '@common/models/UserWithSecureInfo';

export const deptIdStorage = {
  storageArea: localStorage,
  key: 'dept-id',
  get() {
    return this.storageArea.getItem(this.key) || undefined;
  },
  set(newItem: string) {
    this.storageArea.setItem(this.key, newItem);
  },
  remove() {
    this.storageArea.removeItem(this.key);
  },
};

export const userTokenStorage = {
  storageArea: localStorage,
  key: 'user-token',
  get() {
    return this.storageArea.getItem(this.key) || undefined;
  },
  set(newItem: string) {
    this.storageArea.setItem(this.key, newItem);
  },
  remove() {
    this.storageArea.removeItem(this.key);
  },
};

export const userInfoStorage = {
  storageArea: sessionStorage,
  key: 'user-info',
  get(): UserWithSecureInfo | undefined {
    const jsonString = this.storageArea.getItem(this.key) || undefined;
    if (jsonString === undefined) return undefined;
    return JSON.parse(jsonString);
  },
  set(newItem: UserWithSecureInfo) {
    this.storageArea.setItem(this.key, JSON.stringify(newItem));
  },
  remove() {
    this.storageArea.removeItem(this.key);
  },
};
