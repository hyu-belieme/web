import type { Component } from 'vue';

interface Modal {
  key: string;
  component: Component;
  props?: unknown;
  resolve?: (value: any, key: string) => void;
  reject?: (reason: any, key: string) => void;
}

export default Modal;
