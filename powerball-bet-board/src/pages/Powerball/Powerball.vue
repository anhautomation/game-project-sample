<template>
  <board-layout :summary="summary" :iframe="iframe" :header="header">
    <template v-slot:historyInformation>
      <bet-countdown />
    </template>
    <template v-slot:resultHistory>
      <result-history />
    </template>
    <template v-slot:betList>
      <bet-list />
    </template>
    <template v-slot:historyResultPopup>
      <history-result-popup />
    </template>
    <template v-slot:userHistoryPopup>
      <verification />
    </template>
    <template v-slot:previousResultPopup>
      <user-history-popup />
    </template>
  </board-layout>
</template>

<script setup lang="ts">
import BoardLayout from "@/layouts/BoardLayout.vue";
import BetCountdown from "./components/BetCountdown/BetCountdown.vue";
import ResultHistory from "./components/ResultHistory/ResultHistory.vue";
import BetList from "./components/BetList/BetList.vue";
import HistoryResultPopup from "@/components/Popup/HistoryResultPopup.vue";
import Verification from "@/components/Popup/Verification.vue";
import UserHistoryPopup from "@/components/Popup/UserHistoryPopup.vue";
import { QUERYKEY } from "@/configs/QueryKey";

const queryKey = QUERYKEY.powerballLatestResult;
const queryUrl = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_RESULT;
const iframe = import.meta.env.VITE_IFRAME_POWERBALL;

const header: BetHeaderProps = {
  url: "#",
  logo: "파워볼",
  tabs: [
    {
      name: "Tab 1",
      url: "#",
    },
    {
      name: "Tab 2",
      url: "#",
    },
    {
      name: "Tab 3",
      url: "#",
    },
  ],
};

const summary: BetSummaryProps = { queryKey, queryUrl };
</script>

<style scoped></style>
