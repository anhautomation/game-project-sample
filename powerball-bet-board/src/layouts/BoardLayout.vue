<template>
  <main class="bg-background w-full h-screen">
    <bet-header :header="header" />
    <bet-summary :summary="summary" />
    <slot name="historyInformation"></slot>
    <div
      class="flex justify-between items-stretch container mx-auto gap-[24px]"
    >
      <div
        class="flex flex-col gap-[16px] p-[16px] rounded-[12px] bg-mainFrame w-full h-full"
      >
        <div class="flex gap-[16px]">
          <slot name="resultHistory"></slot>
          <div class="grow flex flex-col gap-[16px]">
            <iframe
              :src="iframe"
              frameborder="0"
              class="rounded-[8px] grow"
              ref="iframeCheck"
            ></iframe>
            <slot name="betList"></slot>
          </div>
        </div>
        <div class="flex gap-[16px]">
          <bet-info />
          <coin-list />
        </div>
      </div>
      <user-history />
    </div>
  </main>
  <transition-group
    name="messageShow"
    tag="ul"
    class="fixed top-5 right-5 flex flex-col-reverse gap-[16px] items-end"
  >
    <li
      v-for="(item, index) in listMessage"
      :key="listId[index]"
      :class="`${listColor[index]} px-[16px] py-[8px] rounded-[4px] font-inter font-semibold text-bet h-[45px]`"
    >
      {{ item }}
    </li>
  </transition-group>
  <slot name="historyResultPopup"></slot>
  <slot name="previousResultPopup"></slot>
  <slot name="userHistoryPopup"></slot>
</template>

<script setup lang="ts">
import BetHeader from "@/components/BetHeader/BetHeader.vue";
import BetSummary from "@/components/BetSummary/BetSummary.vue";
import BetInfo from "@/components/BetInfo/BetInfo.vue";
import UserHistory from "@/components/UserHistory/UserHistory.vue";
import CoinList from "@/components/CoinList/CoinList.vue";
import { useMessageStore } from "@/stores/Message";
import { computed, ref } from "vue";

defineProps<{
  header: BetHeaderProps;
  summary: BetSummaryProps;
  iframe: string;
}>();

const iframeCheck = ref<HTMLIFrameElement | null>(null);

const messageStore = useMessageStore();

const listMessage = computed(() => messageStore.messageList);

const listColor = computed(() => {
  return messageStore.colorList;
});

const listId = computed(() => {
  return messageStore.idList;
});
</script>

<style scoped>
.messageShow-move,
.messageShow-enter-active,
.messageShow-leave-active {
  transition: all 0.5s ease;
}

.messageShow-enter-from,
.messageShow-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.messageShow-enter-to,
.messageShow-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.messageShow-leave-active {
  position: absolute;
}

.backgroundImage {
  background-image: url("/src/assets/BackgroundImg.png");
  background-size: cover;
}
</style>
