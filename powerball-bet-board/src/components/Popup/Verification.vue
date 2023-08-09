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
      :class="`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-start items-center bg-mainFrame rounded-[12px] p-[24px] min-w-[50vw]  transition duration-500 ${
        show ? 'opacity-100' : 'opacity-0'
      }`"
    >
      <div class="flex justify-between items-center mb-[24px] w-full">
        <h3 class="font-inter font-bold text-white text-[24px]">
          {{ VERTIFICATION[0] }}
        </h3>
        <button
          class="flex justify-center items-center rounded-[4px] p-[8px] hover:bg-green-900 transition duration-300"
          @click.prevent="hidePopup"
        >
          <img :src="esc" alt="" class="w-[12px] h-[12px]" />
        </button>
      </div>
      <div class="flex flex-col w-full overflow-y-hidden scrollBar">
        <p class="font-inter font-semibold text-white text-[16px]">
          {{ VERTIFICATION[1] }}:
        </p>
        <p class="font-inter font-normal text-white text-[16px] break-all">
          {{ hashCode }}
        </p>
        <p class="font-inter font-semibold text-white text-[16px]">
          {{ VERTIFICATION[2] }}:
        </p>
        <p class="font-inter font-normal text-white text-[16px] break-all">
          {{ saltCode }}
        </p>
      </div>
      <div class="flex justify-center items-center gap-[16px] mt-[32px]">
        <button
          @click.prevent="hidePopup"
          class="font-inter font-semibold text-green-500 text-[18px] py-[16px] px-[50px] border border-green-500 rounded-[4px] transition duration-300 hover:bg-white hover:bg-opacity-10"
        >
          {{ VERTIFICATION[3] }}
        </button>
        <button
          @click.prevent="hidePopup"
          class="font-inter font-semibold text-white text-[18px] py-[16px] px-[50px] bg-green-500 rounded-[4px] hover:bg-green-800 transition duration-300"
        >
          {{ VERTIFICATION[4] }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { VERTIFICATION } from "@/locales/Popup";
import { usePopupStore } from "@/stores/PopupStore";
import { computed } from "vue";

const esc = "images/Esc.svg";

const popupStore = usePopupStore();

const show = computed(() => popupStore.vertiPopup);

const hidePopup = () => {
  popupStore.vertiPopup = false;
};

const hashCode = computed(() => {
  return "LFnsLj6OM0UalMIKuCPjUXT3u8Vn7pnFoxE2EnjXLRjstt2YAcF0DcfQuMEkUSA2uv75lYijfps6BWMJnynMb0Qjqf84vLNbyXFzqUWOkPbrU5KUCIUzF1zpnjOmXq6OCkQ6UIqj3be2ilhpZW1r1TravBNgHG510CFpGjQx6dPydIOqJowXHi1StuhBHWqJReUOFsR9N1hqxXsYfcVEiREsidLs5eeDfJQ6mhncqgR12mPlxH8IjPeaeP09bwP";
});

const saltCode = computed(() => {
  return "fFoyUTd7j13e6zEa6F68zFyLwfVtfBadlaHsH1Am1F0EJaPevyj2CCWgrwPIVVwFnjzWtPPhicFHA6qcgOeQzt7gVc0vyKzEDxCM";
});
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
