<template>
  <ul
    :class="`grow bg-frame2 px-[24px] rounded-[8px] flex items-center justify-between ${
      cd >= 45 ? 'select-none pointer-events-none opacity-20' : ''
    }`"
  >
    <li>
      <button
        type="button"
        @click.prevent="backup"
        class="p-[20px] bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition duration-300"
      >
        <img :src="back" alt="" />
      </button>
    </li>
    <li v-for="(item, index) in coinList" :key="item">
      <CoinButton
        :content="item"
        :active="currentBetStore.coinBtn === index"
        @click.prevent="coinClick(index)"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CoinButton from "./CoinButton.vue";
import { useCurrentBetStore } from "@/stores/Powerball/CurrentBetStore";
import { useCountdownStore } from "@/stores/Powerball/CountdownStore";
import { useMessageStore } from "@/stores/Message";

const back = "images/Back.svg";

let save = true;

const countdownStore = useCountdownStore();

const coinList = ["1K", "5K", "25K", "100K", "500K", "1M", "x2"];
const priceList = [1000, 5000, 25000, 100000, 500000, 1000000];

const currentBetStore = useCurrentBetStore();
const messageStore = useMessageStore();

const betBtn = computed(() => currentBetStore.betBtn);

const coinClick = (index: number) => {
  if (currentBetStore.coinBtn === index) {
    if (betBtn.value !== -1) {
      let price = 0;

      if (index < priceList.length) {
        price = priceList[index];
      } else {
        if (currentBetStore.coins.length > 0) {
          price = currentBetStore.coins.reduce(
            (sum, coin) => sum + coin.price,
            0
          );
        }
      }

      if (price === 0) return;

      if (price <= currentBetStore.currentAmount) {
        currentBetStore.coins.push({ price, src: coinList[index] });
        currentBetStore.currentAmount -= price;
        currentBetStore.betAmount += price;
      } else {
        messageStore.showMessage("Not enough money", "red-500");
      }
    } else currentBetStore.coinBtn = -1;
  } else currentBetStore.coinBtn = index;
};

const backup = () => {
  if (currentBetStore.coins.length > 0) {
    let data = currentBetStore.coins.pop();

    if (data) {
      currentBetStore.currentAmount += data.price;
      currentBetStore.betAmount -= data.price;
    }
  }
};

const cd = computed(() => {
  if (countdownStore.countdown === 46) {
    if (currentBetStore.coins.length > 0 && save) {
      currentBetStore.addHistory(
        currentBetStore.result,
        currentBetStore.betAmount
      );
      currentBetStore.result = "";

      save = false;
    }

    const coinPopInterval = setInterval(() => {
      backup();
      if (currentBetStore.coins.length === 0) {
        clearInterval(coinPopInterval);
        currentBetStore.coinBtn = -1;
        currentBetStore.betBtn = -1;
        save = true;
      }
    }, 1000 / currentBetStore.coins.length);
  }
  return countdownStore.countdown;
});
</script>

<style scoped></style>
