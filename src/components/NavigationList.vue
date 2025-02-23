<template>
  <div class="navigationList">
    <div class="navigationList__loader" v-if="loading">Loading...</div>
    <div class="navigationList__wrapper" v-else>
      <SearchInput @update:search="setSearchQuery" />
      <div class="navigationList__content">
        <SearchResult v-if="searchQuery" :items="filteredNavigationData" />
        <div v-else>
          <nav>
            <ul class="navigationList__list">
              <NavigationItem
                v-for="item in navigationData"
                :key="item.key"
                :item="item"
                :active-path="activePath"
              />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNavigationStore } from "../store/navigation";
import NavigationItem from "./NavigationItem.vue";
import SearchInput from "./SearchInput.vue";
import SearchResult from "./SearchResult.vue";

const navigationStore = useNavigationStore();

const navigationData = computed(() => navigationStore.getNavigationData);
const activePath = computed(() => navigationStore.getCurrentPage?.path ?? null);
const setSearchQuery = (query: string) => navigationStore.setSearchQuery(query);
const filteredNavigationData = computed(() => navigationStore.getFilteredNavigationData);
const searchQuery = computed(() => navigationStore.getSearchQuery);
const loading = computed(() => navigationStore.isLoading);
</script>

<style scoped>
.navigationList__list {
  list-style-type: none;
  font-size: 14px;
}

.navigationList__wrapper {
  display: grid;
  grid-template-rows: 35px 1fr;
  overflow: hidden;
  max-height: calc(100vh - 16px);
  gap: 10px;
}

@media (max-width: 630px) {
  .navigationList__wrapper {
    max-height: 440px;
  }
}

.navigationList__content {
  overflow: auto;
}
</style>
