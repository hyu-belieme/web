import type Department from '@common/models/Department';
import type User from '@common/models/User';

export const deptIdStorage = {
  storageArea: localStorage,
  key: 'dept-id',
  get() {
    return this.storageArea.getItem(this.key) || undefined;
  },
  set(newItem: string | undefined) {
    if (newItem === undefined) {
      this.storageArea.removeItem(this.key);
      return;
    }
    this.storageArea.setItem(this.key, newItem);
  },
  remove() {
    this.storageArea.removeItem(this.key);
  },
};

export const deptStorage = {
  storageArea: localStorage,
  key: 'dept',
  get(): Department | undefined {
    const jsonString = this.storageArea.getItem(this.key) || undefined;
    if (jsonString === undefined) return undefined;
    return JSON.parse(jsonString);
  },
  set(newItem: Department | undefined) {
    if (newItem === undefined) {
      this.storageArea.removeItem(this.key);
      return;
    }
    this.storageArea.setItem(this.key, JSON.stringify(newItem));
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
  set(newItem: string | undefined) {
    if (newItem === undefined) {
      this.storageArea.removeItem(this.key);
      return;
    }
    this.storageArea.setItem(this.key, newItem);
  },
  remove() {
    this.storageArea.removeItem(this.key);
  },
};

export const userInfoStorage = {
  storageArea: sessionStorage,
  key: 'user-info',
  get(): User | undefined {
    const jsonString = this.storageArea.getItem(this.key) || undefined;
    if (jsonString === undefined) return undefined;
    return JSON.parse(jsonString);
  },
  set(newItem: User | undefined) {
    if (newItem === undefined) {
      this.storageArea.removeItem(this.key);
      return;
    }
    this.storageArea.setItem(this.key, JSON.stringify(newItem));
  },
  remove() {
    this.storageArea.removeItem(this.key);
  },
};
