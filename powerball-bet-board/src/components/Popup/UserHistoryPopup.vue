<template>
  <div
    :class="`fixed top-0 left-0 overflow-hidden ${
      show ? 'w-full h-full' : 'w-0 h-0'
    }`"
  >
    <div
      :class="`absolute top-0 left-0 bottom-0 right-0 bg-background transition duration-500 ${
        show ? 'opacity-50' : 'opacity-0'
      } `"
      @click.prevent="hidePopup"
    ></div>
    <div
      :class="`absolute top-[5vh] left-1/2 -translate-x-1/2 h-[90vh] flex flex-col justify-start items-center bg-mainFrame rounded-[12px] p-[24px] min-w-[50vw] transition duration-500 ${
        show ? 'opacity-100' : 'opacity-0'
      }`"
    >
      <div class="flex justify-between items-center mb-[24px] w-full">
        <h3 class="font-inter font-bold text-white text-[24px]">
          {{ USERHISTORYPOPUPTITLE }}
        </h3>
        <button
          class="flex justify-center items-center rounded-[4px] p-[8px] hover:bg-green-900 transition duration-300"
          @click.prevent="hidePopup"
        >
          <img :src="esc" alt="" class="w-[12px] h-[12px]" />
        </button>
      </div>
      <ul class="grid grid-cols-7 gap-[8px] w-full">
        <li class="col-span-7 grid grid-cols-7 px-[24px] mr-[12px]">
          <h6
            v-for="(item, index) in USERHISTORYPOPUP"
            :key="index"
            :class="`select-none font-inter font-semibold text-[18px] text-white opacity-80 ${
              index === 1 || index === 2
                ? 'text-center col-span-2'
                : index === 0
                ? 'text-left col-span-1'
                : 'text-right col-span-2'
            }`"
          >
            {{ item }}
          </h6>
        </li>
      </ul>
      <ul class="grid grid-cols-7 gap-[8px] w-full overflow-y-auto scrollBar">
        <li
          v-for="(item, index) in RESULT"
          :key="index"
          :class="`col-span-7 grid grid-cols-7 rounded-[8px] py-[16px] px-[24px] mr-[12px] select-none transition duration-300 opacity-80 hover:opacity-100 ${
            Math.random() > 0.5 ? 'bg-commentList' : 'bg-red-400'
          }`"
        >
          <p class="font-inter font-semibold text-white text-[16px] text-left">
            {{ item.round }}
          </p>
          <p
            class="font-inter font-semibold text-white text-[16px] text-center col-span-2"
          >
            {{ item.resultGame }}
          </p>
          <p
            class="font-inter font-semibold text-white text-[16px] text-center col-span-2"
          >
            {{ item.yourBet }}
          </p>
          <div class="flex items-center justify-end col-span-2">
            <span
              class="mr-[8px] font-inter font-semibold text-white text-[16px]"
              >{{ item.amount }}</span
            >
            <img :src="coinAmount" alt="" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { USERHISTORYPOPUP, USERHISTORYPOPUPTITLE } from "@/locales/Popup";
import { usePopupStore } from "@/stores/PopupStore";
import { computed } from "vue";

const esc = "images/Esc.svg";
const coinAmount = "images/CoinAmount.svg";

const popupStore = usePopupStore();

const show = computed(() => popupStore.userPopup);

const hidePopup = () => {
  popupStore.userPopup = false;
};

const RESULT = [
  {
    round: 30,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 29,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 28,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 27,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 26,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 25,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 24,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 23,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 22,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 21,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 20,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 19,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 18,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 17,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 16,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 15,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 14,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 13,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 12,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 11,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 10,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 9,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 8,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 7,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 6,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 5,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 4,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 3,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 2,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
  {
    round: 1,
    resultGame: "5 15 28 2 7 3",
    yourBet: "파워볼 오버",
    amount: 2000000,
  },
];
</script>

<style scoped>
.scrollBar::-webkit-scrollbar {
  width: 8px;
}

.scrollBar::-webkit-scrollbar-button {
  display: none;
}

.scrollBar::-webkit-scrollbar-track {
  background: transparent;
}

.scrollBar::-webkit-scrollbar-thumb {
  @apply bg-white;
  border-radius: 4px;
}
</style>
