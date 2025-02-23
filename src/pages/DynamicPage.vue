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
import {defineComponent, ref, computed, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { useNavigationStore } from '../store/navigation';
import {onBeforeUpdate} from "@vue/runtime-core";
import {findCurrentPage} from "../helpers/findCurrentPage";

export default defineComponent({
  name: 'DynamicPage',
  props: {
    pageSlug: {
      type: String,
      required: true
    }
  },
  setup() {
    const route = useRoute();
    const navigationStore = useNavigationStore();

    const pageTitle = ref('');
    const pageContent = ref('');

    const updateCurrentPage = () => {
      const matchedPage = findCurrentPage(navigationStore.getNavigationData, route.path.toLowerCase());

      const namePage = matchedPage?.name ?? null;
      pageTitle.value = namePage ?? 'Page not found';
      pageContent.value = namePage ? `Content "${matchedPage.name}" article` : '';
    };

    onMounted(() => {
      updateCurrentPage();
    });

    onBeforeUpdate(() => {
      updateCurrentPage();
    });

    return {
      title: computed(() => pageTitle.value),
      description: computed(() => pageContent.value),
      loading: computed(() => navigationStore.isLoading),
    };
  }
});
</script>
