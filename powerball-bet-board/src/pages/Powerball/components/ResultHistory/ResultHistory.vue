<template>
  <div
    class="bg-frame2 rounded-[8px] flex flex-col justify-start items-center gap-[16px] h-[63.5vh] overflow-hidden min-w-[200px] select-none"
  >
    <p
      class="font-inter font-semibold text-white text-[18px] my-[10px] opacity-70"
    >
      {{ RESULTHISTORY.title }}
    </p>
    <transition-group
      name="addHistory"
      tag="ul"
      class="flex flex-col gap-y-[16px] w-full overflow-y-auto scrollBar"
    >
      <result-history-item
        v-for="item in data"
        :key="item.round"
        :round="item.round"
        :date="item.date"
        :results="item.card"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import ResultHistoryItem from "@/pages/Powerball/components/ResultHistory/ResultHistoryItem.vue";
import { RESULTHISTORY } from "@/locales/ResultHistory";
import { useQuery } from "@tanstack/vue-query";
import { QUERYKEY } from "@/configs/QueryKey";
import { axiosInstance } from "@/configs/API";

const { data } = useQuery({
  queryKey: [QUERYKEY.powerballResultHistory],
  queryFn: async () => {
    try {
      const response = await axiosInstance.get(
        import.meta.env.VITE_API_HISTORY
      );

      return response.data;
    } catch (err) {
      console.log("Fetching failed: ", err);
    }
  },
});
</script>

<style scoped>
.addHistory-enter-active,
.addHistory-leave-active,
.addHistory-move {
  transition: all 1s;
}

.addHistory-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.addHistory-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

.addHistory-enter-to,
.addHistory-leave-from {
  transform: translateY(0);
}

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
