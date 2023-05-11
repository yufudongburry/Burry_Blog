import { createStore, Store, useStore as baseUseStore } from "vuex";
import { InjectionKey } from "vue";
import { RootStateType, UserModuleType } from "./interface";
import user from "./modeuls/user";

export default createStore<RootStateType>({
  state:{
    name: "",
    age: 0,
    info: {
      address: '',
    },
  },
  getters: {
    getRootName(state) {
      return state.name
    },
    getRootInfo(state) {
      return state.info
    }
  },
  mutations: {
    SET_NAME(state, data: string) {
      state.name = data
    },
    RESET_NAME(state) {
      state.name = ''
    }
  },
  actions: {},
  
  modules: {
    user: user
  }
})

type Modules = {
  user: UserModuleType
}

export const key: InjectionKey<Store<RootStateType & Modules>> = Symbol()

// 定义自定义useStore组合式函数
export function useStore() {
  return baseUseStore(key)
}
