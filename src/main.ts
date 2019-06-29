import Vue from 'vue';

import AppButton from '@/components/AppButton.vue';
import ContentSection from '@/components/ContentSection.vue';
import { SET_USER_TOKEN } from './store/mutations.type';
import './registerServiceWorker';
import setupMusicKit from '@/utils/musicKit';
import store from '@/store';
import router from '@/router';
import '@/plugins';
import '@/filters';
import App from './App.vue';

setupMusicKit();
Vue.config.productionTip = false;
// Vue.config.performance = true;

Vue.component('app-button', AppButton);
Vue.component('content-section', ContentSection);

if (MusicKit) {
  const musicKitInstance = MusicKit.getInstance();
  store.commit(SET_USER_TOKEN, musicKitInstance.musicUserToken);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
