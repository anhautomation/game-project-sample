import { defineStore } from "pinia";

export const useCurrentBetStore = defineStore("currentBet", {
  state: () => ({
    avatar: "images/Avatar.png",
    userName: "Tester",
    result: "",
    currentAmount: 2000000,
    betAmount: 0,
    betBtn: -1,
    coinBtn: -1,
    coins: [] as { price: number; src: string }[],
    history: [] as {
      result: string;
      amount: number;
    }[],
  }),
  actions: {
    addHistory(result: string, amount: number) {
      this.history.unshift({ result, amount });
    },
  },
});
