<template>
  <div class="navigationList">
    <h2 class="navigationList__title">Nav menu</h2>
    <div class="navigationList__loader" v-if="loading">Loading...</div>
    <div v-else>
      <SearchInput @update:search="setSearchQuery" />
      <SearchResult v-if="searchQuery" :items="filteredNavigationData" />
      <div v-else>
        <nav>
          <ul class="navigationList__list">
            <NavigationItem v-for="item in navigationData" :key="item.key" :item="item" :active-path="activePath" />
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useNavigationStore } from '../store/navigation'
import NavigationItem from './NavigationItem.vue';
import SearchInput from "./SearchInput.vue";
import SearchResult from "./SearchResult.vue";

export default {
  name: 'NavigationList',
  components: {SearchResult, SearchInput, NavigationItem },
  setup() {
    const navigationStore = useNavigationStore();

    return {
      navigationData: computed(() => navigationStore.getNavigationData),
      activePath: computed(() => navigationStore.getCurrentPage?.path ?? null),
      setSearchQuery: computed(() => navigationStore.setSearchQuery),
      filteredNavigationData: computed(() => navigationStore.getFilteredNavigationData),
      searchQuery: computed(() => navigationStore.getSearchQuery),
      loading: computed(() => navigationStore.isLoading),
      error: computed(() => navigationStore.getError),
    };
  }
};
</script>

<style scoped>
  .navigationList {
    margin-top: 25px;
  }

  .navigationList__list {
    list-style-type: none;
    font-size: 14px;
  }
</style>
