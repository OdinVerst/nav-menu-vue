<template>
  <div class="navigationList">
    <h2>Навигационное меню</h2>
    <div v-if="loading">Загрузка данных...</div>
    <ul v-else>
      <NavigationItem v-for="item in navigationData" :key="item.id" :item="item" />
    </ul>
  </div>
</template>

<script>
import {computed, onMounted} from 'vue';
import { useNavigationStore } from '../store/navigation'
import NavigationItem from './NavigationItem.vue';

export default {
  name: 'NavigationList',
  components: { NavigationItem },
  setup() {
    const navigationStore = useNavigationStore();

    onMounted(() => {
      navigationStore.fetchNavigationData();
    });

    return {
      navigationData: computed(() => navigationStore.getNavigationData),
      loading: navigationStore.isLoading,
      error: navigationStore.getError
    };
  }
};
</script>
