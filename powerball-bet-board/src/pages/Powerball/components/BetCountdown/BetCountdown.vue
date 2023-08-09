<template>
  <section class="bg-background py-[15px]">
    <div class="container mx-auto grid grid-cols-3 items-center">
      <div
        :class="`col-span-2 flex items-center ${
          hide ? 'opacity-20' : ''
        } transition duration-1000`"
      >
        <p
          class="w-[80px] font-inter font-bold text-yellow-700 text-[24px] select-none"
        >
          {{ cdTemplate }}
        </p>
        <div
          class="relative border border-frame2 rounded-[18px] w-full h-[18px] ml-[16px] overflow-hidden"
        >
          <div
            :class="`h-full transition-all duration-1000 ease-linear ${
              cd <= 3
                ? 'bg-red-500'
                : cd <= 10
                ? 'bg-yellow-900'
                : 'bg-green-500'
            }`"
            :style="{ width: cdProgress + '%' }"
          ></div>
        </div>
      </div>
      <div class="col-span-1 flex items-center justify-end">
        <normal-button
          imgSrc="images/BarCode.svg"
          content="History"
          @btn-click="historyPopupShow"
        />
        <button
          type="button"
          :class="`w-[38px] h-[38px] ml-[16px] transition duration-300 ${
            volumeOn ? '' : 'opacity-20'
          }`"
          @click.prevent="volumeOn = !volumeOn"
        >
          <img :src="volume" alt="" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { QUERYKEY } from "@/configs/QueryKey";
import { usePopupStore } from "@/stores/PopupStore";
import { useQueryClient } from "@tanstack/vue-query";
import { useCountdownStore } from "@/stores/Powerball/CountdownStore";
import NormalButton from "@/components/NormalButton/NormalButton.vue";

const volume = "images/Volume.svg";

const countdownStore = useCountdownStore();

countdownStore.getCountdown();

const hide = ref(false);

const volumeOn = ref(true);

const cd = computed(() => countdownStore.countdown);

const cdTemplate = computed(() => {
  const minute = Math.floor(countdownStore.countdown / 60);
  const second = Math.floor(countdownStore.countdown % 60);
  let result = "";

  if (countdownStore.countdown === 0) {
    return "00:00";
  }

  if (countdownStore.countdown === 45) {
    const queryClient = useQueryClient();

    queryClient.invalidateQueries({
      queryKey: [QUERYKEY.powerballResultHistory],
    });

    queryClient.invalidateQueries({
      queryKey: [QUERYKEY.powerballLatestResult],
    });
  }

  if (countdownStore.countdown > 45) {
    hide.value = true;
    return "00:45";
  } else {
    hide.value = false;
  }

  if (minute > 9) {
    result += minute;
  } else {
    result += "0" + minute;
  }

  result += ":";

  if (second > 9) {
    result += second;
  } else {
    result += "0" + second;
  }

  return result;
});

const cdProgress = computed(() => {
  return Math.floor((countdownStore.countdown / 45) * 100);
});

const popupStore = usePopupStore();

const historyPopupShow = () => {
  popupStore.userPopup = true;
};
</script>

<style scoped></style>
