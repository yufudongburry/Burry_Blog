import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router, { setupRouter } from './routes'
// 引入默认样式
import '@/assets/style/index.scss'
// 引入字体图标库
import '@/assets/icon/iconfont.css'
// 引入element-plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入marksown编辑器
// @ts-ignore
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// @ts-ignore
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// @ts-ignore
import Prism from 'prismjs';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(App)
app.use(VueMarkdownEditor)

// 全局挂载element-plus icon组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 挂载路由
setupRouter(app)
// 挂载vue实例
router.isReady().then(() => {
  app.mount('#app')
})
