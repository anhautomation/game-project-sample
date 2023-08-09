<template>
  <button
    type="button"
    :class="`bg-bet hover:bg-betHover transition duration-300 pb-[5px] border border-third rounded-[4px] flex flex-col justify-center items-center w-full betBtn relative overflow-hidden px-[26px] h-full shadow-[0_0_26px_0_rgba(0,0,0,0.24)] ${
      currentBetStore.betBtn === index ? 'active' : ''
    }`"
    @click.prevent="betClick"
  >
    <p class="font-inter font-bold text-white text-[18px]">{{ name }}</p>
    <div class="w-[60px] h-[60px] relative">
      <transition-group
        name="addCoin"
        tag="ul"
        class="w-full h-full absolute top-0 left-0"
      >
        <li
          v-for="(coin, index) in coins"
          :key="index"
          class="absolute top-0 left-0 h-full w-full"
        >
          <img
            :src="`images/coins/Coin${coin.src}.svg`"
            alt=""
            class="w-full h-full"
          />
        </li>
      </transition-group>
      <img
        v-if="coins?.length"
        :src="btnInfo.src"
        alt=""
        class="absolute top-0 left-0 w-full h-full"
      />
      <span
        v-if="coins?.length"
        :class="`${btnInfo.color} font-squada font-bold text-[15px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`"
        >{{ btnInfo.total }}</span
      >
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCurrentBetStore } from "@/stores/Powerball/CurrentBetStore";
import { useMessageStore } from "@/stores/Message";

const coinList = ["1K", "5K", "25K", "100K", "500K", "1M", "x2"];
const priceList = [1000, 5000, 25000, 100000, 500000, 1000000];

const props = defineProps<{
  name: string;
  index: number;
}>();

const currentBetStore = useCurrentBetStore();
const messageStore = useMessageStore();

const coins = computed(() => {
  if (props.index === currentBetStore.betBtn) {
    return currentBetStore.coins;
  }

  return [];
});

const btnInfo = computed(() => {
  const result = { total: "", color: "", src: "" };

  if (coins.value) {
    const total = coins.value.reduce((sum, coin) => (sum += coin.price), 0);

    if (total < 1000000) {
      result.total = `${Math.floor(total / 1000)}K`;
    } else {
      result.total = `${Math.floor(total / 100000) / 10}M`;
    }

    if (total >= 1000) {
      result.color = "text-coin1K";
      result.src = "images/coins/Coin1K.svg";
    }
    if (total >= 5000) {
      result.color = "text-coin5K";
      result.src = "images/coins/Coin5K.svg";
    }
    if (total >= 25000) {
      result.color = "text-coin25K";
      result.src = "images/coins/Coin25K.svg";
    }
    if (total >= 100000) {
      result.color = "text-coin100K";
      result.src = "images/coins/Coin100K.svg";
    }
    if (total >= 500000) {
      result.color = "text-coin500K";
      result.src = "images/coins/Coin500K.svg";
    }
    if (total >= 1000000) {
      result.color = "text-coin1M";
      result.src = "images/coins/Coin1M.svg";
    }
  }

  return result;
});

const betClick = () => {
  if (currentBetStore.betBtn === props.index) {
    if (currentBetStore.coinBtn !== -1) {
      let price = 0;

      if (currentBetStore.coinBtn < priceList.length) {
        price = priceList[currentBetStore.coinBtn];
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
        currentBetStore.coins.push({
          price,
          src: coinList[currentBetStore.coinBtn],
        });
        currentBetStore.currentAmount -= price;
        currentBetStore.betAmount += price;
      } else {
        messageStore.showMessage("Not enough money", "red-500");
      }
    } else {
      currentBetStore.betBtn = -1;
      currentBetStore.result = "";
    }
  } else {
    if (currentBetStore.coinBtn !== -1 && currentBetStore.coins.length > 0) {
      messageStore.showMessage(
        "Please return all the coins before changed bet type"
      );
    } else {
      currentBetStore.betBtn = props.index;
      currentBetStore.result = props.name;
    }
  }
};
</script>

<style scoped>
.active {
  @apply bg-betHover;
}
.betBtn:hover::after,
.active::after {
  content: "";
  @apply block w-full h-full rounded-[4px] border-2 border-yellow-900 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2;
}
.addCoin-enter-active,
.addCoin-leave-active {
  opacity: 0;
  transition: all 1s;
}

.addCoin-enter-from,
.addCoin-leave-to {
  transform: translateY(200%) scale(1.5);
  opacity: 1;
}

.addCoin-enter-to,
.addCoin-leave-from {
  transform: translateY(0) scale(1);
  opacity: 0;
}
</style>
