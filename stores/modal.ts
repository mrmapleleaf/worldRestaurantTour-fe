import { defineStore } from 'pinia';

interface ModalState {
  isVisible: boolean;
  resolveCallback: ((value: boolean) => void) | null;
}

export const useModalStore = defineStore('modal', {
  state: (): ModalState => ({
    isVisible: false,
    resolveCallback: null,
  }),
  actions: {
    showModal() {
      this.isVisible = true;
      return new Promise((resolve) => {
        this.resolveCallback = resolve;
      });
    },
    closeModal() {
      this.isVisible = false;
      this.resolveCallback = null;
    },
  },
});
