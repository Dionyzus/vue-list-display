import './assets/main.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faBars, faChevronLeft, faChevronRight, faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue';
import VueLazyload from 'vue-lazyload';

import App from './App.vue';

library.add(faChevronLeft, faChevronRight, faBars, faInfoCircle );

createApp(App).use(VueLazyload).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
