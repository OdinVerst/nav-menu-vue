<template>
  <svg
    class="iconArrow"
    :class="{ iconArrow_open: isOpen }"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    viewBox="0 0 16 16"
  >
    <path d="m8 11 4-6H4l4 6Z" />
  </svg>
</template>

<script setup lang="ts">
defineProps<{ isOpen: boolean }>()
</script>

<style scoped>
.iconArrow {
  transition: transform 0.2s ease-in-out;
  fill: currentColor;
  transform: rotate(-90deg);
}

.iconArrow_open {
  transform: rotate(0deg);
}
</style>
