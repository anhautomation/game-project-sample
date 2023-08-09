<template>
  <li
    class="grid grid-cols-3 font-inter font-semibold text-white text-[16px] py-[14px] bg-commentList rounded-[8px] w-full pl-[24px] select-none opacity-80 hover:opacity-100 transition duration-300"
  >
    <div class="flex items-center justify-center">
      <img :src="avatar" alt="" class="w-[16px] h-[16px]" />
      <span class="ml-[8px]">{{ userName }}</span>
    </div>
    <p class="mx-[4px] text-center">{{ result }}</p>
    <div class="flex items-center justify-center">
      <span class="mr-[8px]">{{ currency }}</span>
      <img :src="coinAmount" alt="" />
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from "vue";

const coinAmount = "images/CoinAmount.svg";

const props = defineProps<{
  avatar: string;
  userName: string;
  result: string;
  amount: number;
}>();


const currency = computed(() => {
  return props.amount.toLocaleString();
});
</script>

<style scoped></style>
