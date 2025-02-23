import { defineStore } from "pinia";
import axios from "axios";

import { buildNavigationTree } from "../helpers/buildNavigationTree";
import { findCurrentPage } from "../helpers/findCurrentPage";
import { NavigationItemType } from "../types/navigationItemType";
import { useRoute } from "vue-router";
import { flattenAndFilterNavigation } from "../helpers/flattenAndFilterNavigation";

interface NavigationState {
  navigationData: NavigationItemType[];
  currentPage: NavigationItemType | null;
  loading: boolean;
  error: Error | null;
  searchQuery: string;
}

const NAV_DATA_URL = "https://prolegomenon.s3.amazonaws.com/contents.json";

export const useNavigationStore = defineStore("navigation", {
  state: (): NavigationState => ({
    navigationData: [],
    currentPage: null,
    loading: false,
    error: null,
    searchQuery: "",
  }),
  actions: {
    async fetchNavigationData() {
      this.loading = true;
      this.error = null;
      try {
        const route = useRoute();
        const response = await axios.get(NAV_DATA_URL);
        this.navigationData = buildNavigationTree(response.data);
        this.setCurrentPage(route.path.toLowerCase());
      } catch (err: any) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },
    setCurrentPage(link: string) {
      this.currentPage = findCurrentPage(this.navigationData, link);
    },
    setSearchQuery(query: string) {
      this.searchQuery = query.toLowerCase();
    },
  },
  getters: {
    getNavigationData: (state) => state.navigationData,
    getCurrentPage: (state) => state.currentPage,
    getFilteredNavigationData(state): NavigationItemType[] {
      if (!state.searchQuery) return state.navigationData;

      console.log(
        flattenAndFilterNavigation(state.navigationData, state.searchQuery),
      );
      return flattenAndFilterNavigation(
        state.navigationData,
        state.searchQuery,
      );
    },
    getSearchQuery: (state) => state.searchQuery,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
  },
});
