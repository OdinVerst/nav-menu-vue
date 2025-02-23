<template>
  <div class="dynamicPage">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import { useNavigationStore } from '../store/navigation';

export default defineComponent({
  name: 'DynamicPage',
  props: {
    pageSlug: {
      type: String,
      required: true
    }
  },
  setup() {
    const navigationStore = useNavigationStore();

    return {
      title: computed(() => navigationStore.getCurrentPage?.name ?? 'Page not found'),
      description: computed(() =>
          navigationStore.getCurrentPage?.name ? `Content "${navigationStore.getCurrentPage.name}" article` : ''
      ),
      loading: computed(() => navigationStore.isLoading),
    };
  }
});
</script>
