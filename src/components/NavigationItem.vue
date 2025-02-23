<template>
  <li class="navigationItem">
    <div class="navigationItem__wrapper">
      <button
        class="navigationItem__toggleButton"
        @click="toggleOpen"
        v-if="item.children && item.children.length"
      >
        <IconArrow :isOpen="isOpen" />
      </button>
      <router-link
        v-if="item.link"
        activeClass="navigationItem__link_active"
        class="navigationItem__link"
        :to="item.link"
        @click="handleClick"
      >
        <span>{{ item.name }}</span>
      </router-link>
    </div>
    <ul
      v-if="isOpen && item.children && item.children.length"
      class="navigationItem__childrenList"
    >
      <NavigationItem
        v-for="child in item.children"
        :key="child.key"
        :item="child"
        :active-path="activePath"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { NavigationItemType } from "../types/navigationItemType";
import { ref } from "vue";
import { useNavigationStore } from "../store/navigation";
import IconArrow from "./IconArrow.vue";

const props = defineProps<{
  item: NavigationItemType;
  activePath: string[] | null;
}>();

const navigationStore = useNavigationStore();

const isOpen = ref((props.activePath || []).includes(props.item.key) || false);

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
};

const handleClick = () => {
  isOpen.value = true;
  if (props.item.link) {
    navigationStore.setCurrentPage(props.item.link);
  }
};
</script>

<style scoped>
.navigationItem {
  margin-bottom: var(--size-spacer-item-nav);
}

.navigationItem__toggleButton {
  display: flex;
  flex-shrink: 0;
  background: transparent;
  border: none;
  width: 20px;
  margin-left: -25px;
  padding: 0;
  color: var(--color-icon);
  cursor: pointer;
}

.navigationItem__toggleButton:hover {
  color: var(--color-icon-accent);
}

.navigationItem__childrenList {
  list-style-type: none;
  margin-top: var(--size-spacer-item-nav);
}

.navigationItem__link {
  color: currentColor;
  text-decoration: none;
  line-height: 20px;
}

.navigationItem__wrapper {
  display: flex;
  align-items: flex-start;
  gap: 5px;
}

.navigationItem__link:hover {
  color: var(--color-text-accent);
}

.navigationItem__link_active {
  font-weight: bold;
  color: var(--color-text-accent);
}
</style>
