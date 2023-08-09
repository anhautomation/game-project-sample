<template>
  <section class="bg-mainFrame py-[6px]">
    <div class="container mx-auto flex justify-between items-center">
      <div class="flex items-center gap-[25px] select-none">
        <div class="flex gap-[5px]">
          <p class="font-inter font-bold text-white text-[18px]">
            {{ BETSUMMARY.roundNumber }}
          </p>
          <span
            class="font-inter font-bold text-yellow-700 text-[18px] select-text"
            >{{ roundNumber }}</span
          >
        </div>
        <div class="flex gap-[5px] relative">
          <p class="font-inter font-bold text-white text-[18px]">
            {{ BETSUMMARY.hashCode }}
          </p>
          <span
            class="font-inter font-bold text-yellow-700 text-[18px] select-text max-w-[125px] overflow-x-hidden truncate inline-block"
            @mouseenter.prevent="showHashCode = true"
            @mouseleave.prevent="showHashCode = false"
            >{{ hashCode }}
          </span>
          <div
            :class="`hashCodeShow absolute z-10 top-[150%] left-1/2 w-[250%] bg-mainFrame border border-third rounded-[8px] p-[16px] select-text transition duration-500 ${
              showHashCode ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`"
            @mouseenter.prevent="showHashCode = true"
            @mouseleave.prevent="showHashCode = false"
          >
            <p class="font-primary font-semibold text-white text-[16px]">
              Hash:
            </p>
            <p
              class="font-primary font-normal text-white text-[16px] break-words"
            >
              {{ hashCode }}
            </p>
            <br />
            <p class="font-primary font-semibold text-white text-[16px]">
              Salt:
            </p>
            <p
              class="font-primary font-normal text-white text-[16px] break-words"
            >
              {{ saltCode }}
            </p>
            <br />
            <p class="font-primary font-semibold text-white text-[16px]">
              Random: {{ random }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center gap-[25px]">
        <normal-button
          :content="BETSUMMARY.vertification"
          @btn-click="vertiClick"
        />
        <normal-button
          :content="BETSUMMARY.previousRoundResult"
          @btn-click="prevClick"
        />
      </div>
      <p class="font-inter font-bold text-white text-[18px] select-none">
        {{ BETSUMMARY.amount }}:
        <span class="text-yellow-700"
          >{{ minAmount.toLocaleString() }} -
          {{ maxAmount.toLocaleString() }}</span
        >
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { axiosInstance } from "@/configs/API";
import { useQuery } from "@tanstack/vue-query";
import { BETSUMMARY } from "@/locales/BetSummary";
import { usePopupStore } from "@/stores/PopupStore";
import NormalButton from "@/components/NormalButton/NormalButton.vue";

const props = defineProps<{
  summary: BetSummaryProps;
}>();

const showHashCode = ref(false);

const { data } = useQuery({
  queryKey: [props.summary.queryKey],
  queryFn: async () => {
    try {
      const response: SummaryResponse = await axiosInstance.get(
        props.summary.queryUrl
      );

      return response;
    } catch (error) {
      console.log("Fetching Summary Fail!", error);
    }
  },
});

const roundNumber = computed(() => {
  let result = 1;

  if (data.value) {
    result = (data.value.round as any) + 1 || 1;
  }

  return result;
});

const hashCode = computed(() => {
  let result =
    "LFnsLj6OM0UalMIKuCPjUXT3u8Vn7pnFoxE2EnjXLRjstt2YAcF0DcfQuMEkUSA2uv75lYijfps6BWMJnynMb0Qjqf84vLNbyXFzqUWOkPbrU5KUCIUzF1zpnjOmXq6OCkQ6UIqj3be2ilhpZW1r1TravBNgHG510CFpGjQx6dPydIOqJowXHi1StuhBHWqJReUOFsR9N1hqxXsYfcVEiREsidLs5eeDfJQ6mhncqgR12mPlxH8IjPeaeP09bwP ";

  if (data.value) {
    result =
      data.value.hashCode ||
      "LFnsLj6OM0UalMIKuCPjUXT3u8Vn7pnFoxE2EnjXLRjstt2YAcF0DcfQuMEkUSA2uv75lYijfps6BWMJnynMb0Qjqf84vLNbyXFzqUWOkPbrU5KUCIUzF1zpnjOmXq6OCkQ6UIqj3be2ilhpZW1r1TravBNgHG510CFpGjQx6dPydIOqJowXHi1StuhBHWqJReUOFsR9N1hqxXsYfcVEiREsidLs5eeDfJQ6mhncqgR12mPlxH8IjPeaeP09bwP ";
  }

  return result.toString();
});

const saltCode = computed(() => {
  let result =
    "fFoyUTd7j13e6zEa6F68zFyLwfVtfBadlaHsH1Am1F0EJaPevyj2CCWgrwPIVVwFnjzWtPPhicFHA6qcgOeQzt7gVc0vyKzEDxCM";

  if (data.value) {
    result =
      data.value.saltCode ||
      "fFoyUTd7j13e6zEa6F68zFyLwfVtfBadlaHsH1Am1F0EJaPevyj2CCWgrwPIVVwFnjzWtPPhicFHA6qcgOeQzt7gVc0vyKzEDxCM";
  }

  return result.toString();
});

const random = computed(() => {
  let result = Math.floor(Math.random() * 100);

  return result;
});

const minAmount = computed(() => {
  let result = 1000;

  if (data.value) {
    result = data.value.minAmount || 1000;
  }

  return result;
});

const maxAmount = computed(() => {
  let result = 1000000;

  if (data.value) {
    result = data.value.maxAmount || 1000000;
  }

  return result;
});

const popupStore = usePopupStore();

const vertiClick = () => {
  popupStore.vertiPopup = true;
};

const prevClick = () => {
  popupStore.historyPopup = true;
};
</script>

<style scoped>
.hashCodeShow::before {
  content: "";
  @apply w-[20px] h-[15px] bg-mainFrame absolute -top-[15px] z-10;
  -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.hashCodeShow::after {
  content: "";
  @apply w-[22px] h-[16px] bg-third absolute -top-[16px] -translate-x-[1px];
  -webkit-clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
</style>
