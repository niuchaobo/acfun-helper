import { defineStore } from "pinia";

export const useActivatePart = defineStore("partEvent", {
    state: () => ({ L1Part: "Home", L2Part: "" }),
    getters: {
        get: (state) => {
            return state
        },
        getL1: (state) => {
            return state.L1Part
        },
        getL2: (state) => {
            return state.L2Part
        }
    },
    actions: {
        setL1(L1: string) {
            this.L1Part = L1
        },
        setL2(L2: string) {
            this.L2Part = L2
        }
    }
})