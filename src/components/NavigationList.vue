<template>
  <div class="navigationList">
    <h2 class="navigationList__title">Nav menu</h2>
    <div class="navigationList__loader" v-if="loading">Loading...</div>
    <nav v-else>
      <ul class="navigationList__list">
        <NavigationItem v-for="item in navigationData" :key="item.id" :item="item" :active-path="activePath" />
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useNavigationStore } from '../store/navigation'
import NavigationItem from './NavigationItem.vue';

export default {
  name: 'NavigationList',
  components: { NavigationItem },
  setup() {
    const navigationStore = useNavigationStore();

    return {
      navigationData: computed(() => navigationStore.getNavigationData),
      loading: computed(() => navigationStore.isLoading),
      error: computed(() => navigationStore.getError),
      activePath: computed(() => navigationStore.getCurrentPage?.path ?? null),
    };
  }
};
</script>

<style scoped>
  .navigationList__list {
    list-style-type: none;
    padding: 0;
  }
</style>
