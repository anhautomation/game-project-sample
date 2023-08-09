<template>
  <button
    type="button"
    :class="`px-[18px] py-[6px] rounded-[4px]  flex justify-center items-center transition duration-500  ${
      active
        ? 'bg-green-800 hover:bg-green-500'
        : 'bg-green-500 hover:bg-green-800'
    }`"
    @click.prevent="clickHandler"
  >
    <img
      v-if="imgSrc"
      :src="imgSrc"
      alt=""
      class="w-[23px] h-[20px] mr-[8px]"
    />
    <span class="font-inter font-semibold text-white text-[18px]">{{
      content
    }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  imgSrc?: string;
  content: string;
  active?: boolean;
}>();

const emits = defineEmits(["btnClick"]);

const clickHandler = () => {
  emits("btnClick");
};
</script>

<style scoped></style>
