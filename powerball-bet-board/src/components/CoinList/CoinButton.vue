<template>
  <button type="button" :class="`relative ${active ? 'active' : 'hover'}`">
    <img
      :src="`images/coins/Coin${content}.svg`"
      alt=""
      class="w-[75px] h-[75px]"
    />
    <p
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center"
    >
      <img v-if="content === 'x2'" :src="icon" alt="" />
      <span :class="`${color} font-squada font-normal text-[15px]`">{{
        content
      }}</span>
    </p>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

const icon = "images/coins/Iconx2.svg";

const props = defineProps<{
  content: string;
  active: boolean;
}>();

const color = computed(() => {
  switch (props.content) {
    case "1K":
      return "text-coin1K";
    case "5K":
      return "text-coin5K";
    case "25K":
      return "text-coin25K";
    case "100K":
      return "text-coin100K";
    case "500K":
      return "text-coin500K";
    case "1M":
      return "text-coin1M";
    case "x2":
      return "text-coinx2";
  }
});
</script>

<style scoped>
.active::after,
.hover:hover::after {
  content: "";
  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-[2px] border-yellow-900 rounded-full w-full aspect-square;
  animation: zoomIn 0.3s linear;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    width: 80%;
  }
  to {
    opacity: 1;
    width: 100%;
  }
}
</style>
