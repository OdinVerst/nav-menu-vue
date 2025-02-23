<template>
  <div class="navigationList">
    <h2>Nav menu</h2>
    <div v-if="loading">Loading...</div>
    <ul v-else>
      <NavigationItem v-for="item in navigationData" :key="item.id" :item="item" />
    </ul>
  </div>
</template>

<script>
import {computed} from 'vue';
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
      error: computed(() => navigationStore.getError)
    };
  }
};
</script>
