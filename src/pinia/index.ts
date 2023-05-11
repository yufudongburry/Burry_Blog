import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

const _pinia = createPinia()

_pinia.use(piniaPluginPersist) // pinia持久化储存

export default _pinia