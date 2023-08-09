<template>
  <div
    :class="`fixed top-0 left-0 overflow-hidden ${
      show ? 'w-full h-full' : 'w-0 h-0'
    }`"
  >
    <div
      :class="`absolute top-0 left-0 bottom-0 right-0 bg-background transition duration-500 ${
        show ? 'opacity-50' : 'opacity-0'
      } `"
      @click.prevent="hidePopup"
    ></div>
    <div
      :class="`absolute top-[5vh] left-1/2 -translate-x-1/2 h-[90vh] flex flex-col justify-start items-center bg-mainFrame rounded-[12px] p-[24px] min-w-[50vw] transition duration-500 ${
        show ? 'opacity-100' : 'opacity-0'
      }`"
    >
      <div class="flex justify-between items-center mb-[24px] w-full">
        <h3 class="font-inter font-bold text-white text-[24px]">
          {{ RESULTHISTORYPOPUPTITLE }}
        </h3>
        <button
          class="flex justify-center items-center rounded-[4px] p-[8px] hover:bg-green-900 transition duration-300"
          @click.prevent="hidePopup"
        >
          <img :src="esc" alt="" class="w-[12px] h-[12px]" />
        </button>
      </div>

      <ul class="grid grid-cols-6 gap-[8px] w-full">
        <li class="col-span-6 grid grid-cols-6 px-[24px] mr-[12px]">
          <h6
            v-for="(item, index) in RESULTHISTORYPOPUP"
            :key="index"
            :class="`select-none font-inter font-semibold text-[18px] text-white opacity-80 ${
              index === 1
                ? 'text-center col-span-2'
                : index === 0
                ? 'text-left'
                : 'text-right col-span-3'
            }`"
          >
            {{ item }}
          </h6>
        </li>
      </ul>
      <ul class="grid grid-cols-6 gap-[8px] overflow-y-auto scrollBar w-full">
        <li
          v-for="(item, index) in data"
          :key="index"
          class="col-span-6 grid grid-cols-6 rounded-[8px] py-[16px] px-[24px] mr-[12px] bg-commentList transition duration-300 hover:opacity-100 opacity-80 select-none"
        >
          <p class="font-inter font-semibold text-white text-[16px] text-left">
            {{ item.round }}
          </p>
          <p
            class="font-inter font-semibold text-white text-[16px] text-center col-span-2"
          >
            {{ item.card }}
          </p>
          <p
            class="font-inter font-semibold text-white text-[16px] text-right col-span-3"
          >
            {{ item.timeCreated }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RESULTHISTORYPOPUP, RESULTHISTORYPOPUPTITLE } from "@/locales/Popup";
import { usePopupStore } from "@/stores/PopupStore";
import { computed } from "vue";
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

      console.log(response.data);

      return response.data;
    } catch (err) {
      console.log("Fetching failed: ", err);
    }
  },
});

const esc = "images/Esc.svg";

const popupStore = usePopupStore();

const show = computed(() => popupStore.historyPopup);

const hidePopup = () => {
  popupStore.historyPopup = false;
};
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
</style>
