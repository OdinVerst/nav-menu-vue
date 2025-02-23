<template>
  <div class="dynamicPage">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useNavigationStore } from "../store/navigation";

defineProps({
  pageSlug: {
    type: String,
    required: true,
  },
});

const navigationStore = useNavigationStore();

const title = computed(() => navigationStore.getCurrentPage?.name ?? "Page not found");
const description = computed(() =>
  navigationStore.getCurrentPage?.name
    ? `Content "${navigationStore.getCurrentPage.name}" article`
    : ""
);
const loading = computed(() => navigationStore.isLoading);
</script>
