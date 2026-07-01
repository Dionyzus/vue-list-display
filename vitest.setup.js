import { config } from '@vue/test-utils';

config.global.stubs = {
  'font-awesome-icon': true,
};

config.global.directives = {
  lazy: {
    mounted(el, binding) {
      el.setAttribute('src', binding.value ?? '');
    },
  },
};
