<template>
  <div class="searchInput">
    <input
      v-model="searchQuery"
      type="text"
      class="searchInput__input"
      placeholder="Search..."
    />
    <button v-if="searchQuery" @click="clearSearch" class="searchInput__clear">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="searchInput__clearIcon"
        aria-hidden="true"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M4.5 4.5c.3-.3.7-.3 1 0L10 8.9l4.5-4.4a.8.8 0 1 1 1 1L11.1 10l4.4 4.5a.8.8 0 1 1-1 1L10 11.1l-4.5 4.4a.8.8 0 0 1-1-1L8.9 10 4.5 5.5a.8.8 0 0 1 0-1Z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { watchThrottled } from "@vueuse/core";
import { ref } from "vue";

const searchQuery = ref("");
const emit = defineEmits(["update:search"]);

watchThrottled(
  searchQuery,
  (newValue) => {
    emit("update:search", newValue.trim());
  },
  { throttle: 500 },
);

const clearSearch = () => {
  searchQuery.value = "";
};
</script>

<style scoped>
.searchInput {
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 5px 8px;
  width: 100%;
  max-width: 300px;
  background-color: var(--color-background);
}

.searchInput__input {
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 14px;
}

.searchInput__clear {
  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
}

.searchInput__clearIcon {
  width: 12px;
}
</style>
