<template>
  <li
    class="p-[15px] mx-[16px] rounded-[8px] bg-bet flex flex-col items-center shadow-[0_0_26px_0_rgba(0,0,0,0.24)]"
  >
    <p class="font-inter font-semibold text-yellow-700 text-[16px]">
      {{ `${RESULTHISTORY.round}: ${round}` }}
    </p>
    <p class="font-inter font-normal text-white text-[14px]">
      {{ `${RESULTHISTORY.date} ${dateTemplate}` }}
    </p>
    <div class="w-full h-[1px] bg-third my-[15px]"></div>
    <ul class="grid grid-cols-3 w-full gap-[8px]">
      <li
        :class="`w-[32px] h-[32px] ${
          index == 5 ? 'bg-white' : 'bg-red-500'
        } relative rounded-full `"
        v-for="(result, index) in resultsArray"
        :key="index"
      >
        <span
          :class="`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-inter font-bold ${
            index == 5 ? 'text-black' : 'text-white'
          } text-[18px]`"
          >{{ result }}</span
        >
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import moment from "moment";
import { computed } from "vue";
import { RESULTHISTORY } from "@/locales/ResultHistory";

const props = defineProps<{
  round: number;
  results: string;
  date: string;
}>();

const dateTemplate = computed(() => {
  return moment(props.date).format("DD/MM/YYYY");
});

const resultsArray = computed(() => JSON.parse(props.results));
</script>

<style scoped></style>
