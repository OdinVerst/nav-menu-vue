import { defineStore } from 'pinia';
import axios from 'axios';
import {buildNavigationTree} from "./helpers/heplpers";
import {NavigationItemType} from "../types/navigationItemType";


interface NavigationState {
    navigationData: NavigationItemType[];
    loading: boolean;
    error: Error | null;
}

const NAV_DATA_URL = 'https://prolegomenon.s3.amazonaws.com/contents.json';

export const useNavigationStore = defineStore('navigation', {
    state: (): NavigationState => ({
        navigationData: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchNavigationData() {
            this.loading = true;
            this.error = null;
            try {
                const response = await axios.get(NAV_DATA_URL);
                this.navigationData = buildNavigationTree(response.data);
                console.log(this.navigationData);
            } catch (err: any) {
                this.error = err;
            } finally {
                this.loading = false;
            }
        }
    },
    getters: {
        getNavigationData: (state) => state.navigationData,
        isLoading: (state) => state.loading,
        getError: (state) => state.error
    }
});
