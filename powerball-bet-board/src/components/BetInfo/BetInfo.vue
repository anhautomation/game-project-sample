<template>
  <div
    class="min-w-[275px] max-w-[300px] bg-currentAmount rounded-[8px] py-[13px] px-[16px] overflow-hidden"
  >
    <p class="font-inter font-semibold text-white text-[18px] select-none">
      {{ BETINFO.currentAmount }}:
      <span class="text-yellow-700">{{ currentAmount.toLocaleString() }}</span>
    </p>
    <p class="font-inter font-semibold text-white text-[18px] select-none">
      {{ BETINFO.betMoney }}:
      <span class="text-yellow-700">{{ betMoney.toLocaleString() }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { BETINFO } from "@/locales/BetInfo";
import { useCurrentBetStore } from "@/stores/Powerball/CurrentBetStore";

const currentBetStore = useCurrentBetStore();

const currentAmount = computed(() => currentBetStore.currentAmount);
const betMoney = computed(() => currentBetStore.betAmount);
</script>

<style scoped></style>
