import { defineStore } from "pinia";
import { ref } from "vue";

export const useGlobalStore = defineStore('Global', () => {
    const count = ref(0);

    return {
        count
    }
})