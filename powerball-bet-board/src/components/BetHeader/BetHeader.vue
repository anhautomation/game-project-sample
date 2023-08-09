<template>
  <header class="bg-mainFrame border-b border-third">
    <div class="container mx-auto flex justify-between items-center">
      <a
        :href="header.url"
        class="font-primary font-semibold text-white text-[46px]"
      >
        <h1>{{ header.logo }}</h1>
      </a>
      <div class="grow flex justify-center items-center">
        <a
          v-for="(tab, index) in header.tabs"
          :key="index"
          :href="tab.url"
          :class="`relative mx-[48px] font-primary font-medium text-white text-[18px] opacity-50 transition duration-500 ${
            tabSelect === index ? 'active' : 'hover'
          }`"
          @click.prevent="tabSelect = index"
          >{{ tab.name }}</a
        >
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";

const tabSelect = ref(0);

defineProps<{
  header: BetHeaderProps;
}>();
</script>

<style scoped>
.active,
.hover:hover {
  @apply text-green-500 opacity-100;
}

.active::after,
.hover:hover::after {
  content: "";
  @apply w-[125%] h-[1px] bg-green-500 absolute top-full left-1/2 -translate-x-1/2;
  animation: zoomIn 0.3s;
}

@keyframes zoomIn {
  from {
    width: 0;
  }
  to {
    width: 125%;
  }
}
</style>
