import { defineStore } from "pinia";
import { mainStateType } from "../piniaInterface"

export const mainStroe = defineStore('main', {
  state:(): mainStateType => {
    return {
      name: "",
      age:0,
    }
  },
})
