<template>
  <div class="bg-frame2 rounded-[8px] p-[16px] flex flex-col gap-[8px]">
    <div
      :class="`grid grid-cols-3 gap-[4px] p-[6px] border border-bet rounded-[4px]  ${
        cd >= 45 ? 'select-none pointer-events-none opacity-20' : ''
      }`"
    >
      <normal-button
        v-for="(item, index) in BETLIST"
        :key="index"
        :content="item.name"
        @btn-click="btnClick(index)"
        :active="currentList !== index"
      />
    </div>
    <div class="overflow-x-hidden">
      <div
        :class="`grid grid-cols-3 w-[300%] ${translateList} transition duration-300`"
      >
        <ul
          :class="`grid grid-cols-4 gap-[4px] transition duration-300 ${
            cd >= 45 ? 'select-none pointer-events-none opacity-20' : ''
          } `"
          v-for="(list, listIndex) in BETLIST"
          :key="listIndex"
        >
          <li
            v-for="(item, index) in list.list"
            :key="item.index"
            :class="`${listIndex === 0 && index === 0 ? 'row-span-2' : ''} ${
              listIndex === 2 ? 'col-span-2' : ''
            }`"
          >
            <bet-button :name="item.title" :index="item.index" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import BetButton from "@/components/BetButton/BetButton.vue";
import { useCountdownStore } from "@/stores/Powerball/CountdownStore";
import NormalButton from "@/components/NormalButton/NormalButton.vue";
import { useCurrentBetStore } from "@/stores/Powerball/CurrentBetStore";
import { useMessageStore } from "@/stores/Message";

const countdownStore = useCountdownStore();

const currentBetStore = useCurrentBetStore();

const messageStore = useMessageStore();

const currentList = ref(0);

const translateList = computed(() => {
  if (currentList.value === 0) return "";
  if (currentList.value === 1) return "-translate-x-1/3";
  return "-translate-x-2/3";
});

const cd = computed(() => countdownStore.countdown);

const btnClick = (index: number) => {
  const left = index * 8;
  const right = (index + 1) * 8;

  if (currentBetStore.betAmount === 0) {
    currentList.value = index;
    currentBetStore.betBtn = -1;
    currentBetStore.result = "";
    return;
  }

  if (currentBetStore.betBtn <= left || currentBetStore.betBtn > right) {
    messageStore.showMessage(
      "Please remove all coins before choose another bet"
    );
  }
};

const BETLIST = [
  {
    name: "일반볼",
    list: [
      { title: "파워볼 홀", index: 0 },
      { title: "파워볼 짝", index: 1 },
      { title: "파워볼 오버", index: 2 },
      { title: "파워볼 언더", index: 3 },
      { title: "소 (15~64)", index: 4 },
      { title: "중 (65~80)", index: 5 },
      { title: "대 (81~130)", index: 6 },
    ],
  },
  {
    name: "파워볼",
    list: [
      { title: "파워볼 홀", index: 8 },
      { title: "파워볼 짝", index: 9 },
      { title: "파워볼 오버", index: 10 },
      { title: "파워볼 언더", index: 11 },
      { title: "구간A (0~2)", index: 12 },
      { title: "구간B (3~4)", index: 13 },
      { title: "구간C (5~6)", index: 14 },
      { title: "구간D (7~9)", index: 15 },
    ],
  },
  {
    name: "조합",
    list: [
      { title: "Text", index: 16 },
      { title: "Text", index: 17 },
      { title: "Text", index: 18 },
      { title: "Text", index: 19 },
    ],
  },
];
</script>

<style scoped></style>
