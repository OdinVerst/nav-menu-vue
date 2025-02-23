import { defineStore } from 'pinia';
import axios from 'axios';

import {buildNavigationTree} from "../helpers/buildNavigationTree";
import {findCurrentPage} from "../helpers/findCurrentPage";
import {NavigationItemType} from "../types/navigationItemType";
import {useRoute} from "vue-router";

interface NavigationState {
    navigationData: NavigationItemType[];
    currentPage: NavigationItemType | null;
    loading: boolean;
    error: Error | null;
}

const NAV_DATA_URL = 'https://prolegomenon.s3.amazonaws.com/contents.json';

export const useNavigationStore = defineStore('navigation', {
    state: (): NavigationState => ({
        navigationData: [],
        currentPage: null,
        loading: false,
        error: null
    }),
    actions: {
        async fetchNavigationData() {
            this.loading = true;
            this.error = null;
            try {
                const route = useRoute();
                const response = await axios.get(NAV_DATA_URL);
                this.navigationData = buildNavigationTree(response.data);
                this.currentPage = findCurrentPage(this.navigationData, route.path.toLowerCase());
            } catch (err: any) {
                this.error = err;
            } finally {
                this.loading = false;
            }
        }
    },
    getters: {
        getNavigationData: (state) => state.navigationData,
        getCurrentPage: (state) => state.currentPage,
        isLoading: (state) => state.loading,
        getError: (state) => state.error,
    }
});
