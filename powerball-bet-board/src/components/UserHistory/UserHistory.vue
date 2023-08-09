<template>
  <div class="bg-mainFrame rounded-[12px] p-[24px] h-[78vh] w-[500px]">
    <div class="grid grid-cols-3">
      <p
        class="font-inter font-semibold text-white text-[18px] opacity-70 cursor-default select-none text-center"
      >
        {{ USERHISTORY.user }}
      </p>
      <p
        class="font-inter font-semibold text-white text-[18px] opacity-70 cursor-default select-none text-center"
      >
        {{ USERHISTORY.result }}
      </p>
      <p
        class="font-inter font-semibold text-white text-[18px] opacity-70 cursor-default select-none text-center"
      >
        {{ USERHISTORY.amount }}
      </p>
    </div>
    <transition-group
      name="addHistory"
      tag="ul"
      class="flex flex-col items-center gap-[8px] h-full overflow-y-auto w-full scrollBar"
    >
      <user-history-item
        v-if="result"
        :avatar="avatar"
        :user-name="userName"
        :result="result"
        :amount="betAmount"
      />
      <user-history-item
        v-for="(item, index) in currentBetStore.history"
        :key="index"
        :avatar="avatar"
        :user-name="userName"
        :result="item.result"
        :amount="item.amount"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import UserHistoryItem from "@/components/UserHistory/UserHistoryItem.vue";
import { USERHISTORY } from "@/locales/UserHistory";
import { useCurrentBetStore } from "@/stores/Powerball/CurrentBetStore";
import { computed } from "vue";

const currentBetStore = useCurrentBetStore();

const avatar = computed(() => currentBetStore.avatar);

const userName = computed(() => currentBetStore.userName);

const result = computed(() => currentBetStore.result);

const betAmount = computed(() => currentBetStore.betAmount);
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

.addHistory-enter-active,
.addHistory-move {
  transition: all 1s;
}

.addHistory-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.addHistory-enter-to {
  transform: translateY(0);
}
</style>
