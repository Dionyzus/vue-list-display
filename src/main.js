import './assets/main.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faBars, faChevronLeft, faChevronRight, faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { createApp } from 'vue';

import App from './App.vue';

library.add(faChevronLeft, faChevronRight, faBars, faInfoCircle );

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
