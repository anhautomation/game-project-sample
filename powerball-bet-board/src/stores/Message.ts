import { defineStore } from "pinia";

export const useMessageStore = defineStore("message", {
  state: () => ({
    messageList: [] as string[],
    colorList: [] as string[],
    idList: [] as number[],
    index: 0,
  }),
  actions: {
    showMessage(message: string, color?: string) {
      this.messageList.push(message);
      this.idList.push(this.index);
      this.index++;

      if (color) {
        this.colorList.push(`bg-${color}`);
      } else {
        this.colorList.push("bg-yellow-700");
      }

      setTimeout(() => {
        this.messageList.shift();
        this.colorList.shift();
        this.idList.shift();

        if (this.messageList.length === 0) {
          this.index = 0;
        }
      }, 3000);
    },
  },
});
