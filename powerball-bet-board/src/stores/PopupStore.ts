import { defineStore } from "pinia";

export const usePopupStore = defineStore("popup", {
  state: () => ({
    userPopup: false,
    historyPopup: false,
    vertiPopup: false,
  }),
  actions: {},
});
