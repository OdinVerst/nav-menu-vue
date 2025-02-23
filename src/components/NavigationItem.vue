<script setup lang="ts">
import {NavigationItemType} from "../types/navigationItemType";
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
      <router-link v-if="item.link" :to="item.link" activeClass="border-indigo-500">
        <span>{{ item.name }}</span>
      </router-link>
      <button v-if="item.children && item.children.length" class="toggle-btn">
        {{ isOpen ? '▲' : '▼' }}
      </button>
    </div>
    <ul v-if="isOpen && item.children && item.children.length" class="nested-list">
      <NavigationItem v-for="child in item.children" :key="child.key" :item="child" />
    </ul>
  </li>
</template>
