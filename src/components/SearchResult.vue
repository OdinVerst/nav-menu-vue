<template>
  <div class="searchResults">
    <ul v-if="items.length" class="searchResults__list">
      <SearchItem
          v-for="item in items"
          :key="item.key"
          :item="item"
          :active-path="null"
      />
    </ul>
    <div v-else class="searchResults__empty">
      Nothing found
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavigationItemType } from "../types/navigationItemType";
import SearchItem from "./SearchItem.vue";

defineProps<{
  items: NavigationItemType[];
}>();
</script>

<style scoped>
.searchResults {
  font-size: 14px;
  margin-top: 14px;
  padding-left: 5px;
}

.searchResults__list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.searchResults__empty {
  padding: 16px;
  text-align: center;
  color: var(--color-placeholder);
  font-style: italic;
}
</style>
