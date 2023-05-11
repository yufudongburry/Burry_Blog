import { Module } from "vuex";
import { RootStateType, UserModuleType } from "../interface";

const User: Module<UserModuleType, RootStateType> = {
  state: {
    name: "",
  },
  getters: {
    getUserName(state) {
      return state.name
    },
    getAllName(state, rootState) {
      return state.name + rootState.age
    }
  }
}

export default User