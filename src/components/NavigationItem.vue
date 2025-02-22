<script setup lang="ts">
import type { NavigationItemType } from '@/types/navigation';
import { ref } from 'vue';

defineProps<{
  item: NavigationItemType;
}>();

const isOpen = ref(false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <li>
    <div class="item-container" @click="toggleOpen">
      <span>{{ item.name }}</span>
      <button v-if="item.children && item.children.length" class="toggle-btn">
        {{ isOpen ? '▲' : '▼' }}
      </button>
    </div>
    <ul v-if="isOpen && item.children && item.children.length" class="nested-list">
      <NavigationItem v-for="child in item.children" :key="child.key" :item="child" />
    </ul>
  </li>
</template>

<style scoped>
.item-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.toggle-btn {
  margin-left: 8px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
}
.nested-list {
  padding-left: 16px;
}
</style>
