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

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useNavigationStore } from "../store/navigation";
import NavigationItem from "./NavigationItem.vue";
import SearchInput from "./SearchInput.vue";
import SearchResult from "./SearchResult.vue";

export default defineComponent({
  name: "NavigationList",
  components: { SearchResult, SearchInput, NavigationItem },
  setup() {
    const navigationStore = useNavigationStore();

    return {
      navigationData: computed(() => navigationStore.getNavigationData),
      activePath: computed(() => navigationStore.getCurrentPage?.path ?? null),
      setSearchQuery: computed(() => navigationStore.setSearchQuery),
      filteredNavigationData: computed(
        () => navigationStore.getFilteredNavigationData,
      ),
      searchQuery: computed(() => navigationStore.getSearchQuery),
      loading: computed(() => navigationStore.isLoading),
      error: computed(() => navigationStore.getError),
    };
  },
});
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
