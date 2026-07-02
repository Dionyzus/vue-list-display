import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import App from './App.vue';
import { CATALOG_FILTER_ANCHOR_ID } from './common/constants';
import { appGlobalMountOptions } from './test/mountOptions';

describe('App main view integration', () => {
  it('renders hero above catalog search and category filter controls', () => {
    const wrapper = mount(App, appGlobalMountOptions);

    expect(wrapper.get('h1').text()).toBe('Online Casino');
    expect(wrapper.get('input[placeholder="Search..."]').exists()).toBe(true);
    expect(wrapper.get('label').text()).toBe('Category:');
    expect(wrapper.find(`#${CATALOG_FILTER_ANCHOR_ID}`).exists()).toBe(true);

    const main = wrapper.get('main');
    const [heroSection, catalogSection] = main.element.children;

    expect(heroSection.tagName).toBe('SECTION');
    expect(heroSection.querySelector('h1')?.textContent).toBe('Online Casino');
    expect(catalogSection.querySelector(`#${CATALOG_FILTER_ANCHOR_ID}`)).not.toBeNull();
    expect(main.element.children[0]).toBe(heroSection);
    expect(main.element.children[1]).toBe(catalogSection);
  });
});
