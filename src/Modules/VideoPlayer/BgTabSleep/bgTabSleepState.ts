import { reactive } from 'vue'

export const state = reactive({
  tempSw: true,

  setMessage(reqState: boolean) {
    this.tempSw = reqState;
  },
});