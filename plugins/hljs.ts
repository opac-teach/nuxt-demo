import "highlight.js/lib/common";
import highlightJS from "@highlightjs/vue-plugin";
import "highlight.js/styles/atom-one-light.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(highlightJS);
});
