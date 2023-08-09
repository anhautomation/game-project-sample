import { defineStore } from "pinia";
import { io } from "socket.io-client";

export const useCountdownStore = defineStore("countdown", {
  state: () => ({
    time: "" as string,
    timeUnix: 0 as number,
    countdown: 0 as number,
  }),
  actions: {
    getCountdown() {
      const socket = io(import.meta.env.VITE_SOCKET_URL);

      socket.on(import.meta.env.VITE_SOCKET_SYNC, (data: any) => {
        const dataObject = JSON.parse(data);

        this.time = dataObject.time;
        this.timeUnix = dataObject.timeUnix;
        this.countdown = dataObject.countdown;
      });
    },
  },
});
