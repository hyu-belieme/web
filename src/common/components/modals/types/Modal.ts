import type { Component } from 'vue';

export interface Modal {
  component: Component;
  props?: {};
  resolve?: (value: any, key: string) => void;
  reject?: (reason: any, key: string) => void;
}

export interface ModalWithKey extends Modal {
  key: string;
}

export default Modal;
