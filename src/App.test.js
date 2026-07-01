import { afterEach, describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils';

import App from './App.vue';

vi.mock('./components/Games/data.js', () => ({
  default: [],
}));

describe('App', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders HeroBanner above the catalog list in the content slot', () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      global: {
        stubs: {
          'font-awesome-icon': true,
        },
      },
    });

    const content = wrapper.find('.content');
    const children = content.element.children;

    expect(children[0].classList.contains('hero-banner')).toBe(true);
    expect(children[1].classList.contains('game-grid')).toBe(true);
  });

  it('keeps HeroBanner visible when the catalog has zero games', () => {
    const wrapper = mount(App, {
      attachTo: document.body,
      global: {
        stubs: {
          'font-awesome-icon': true,
        },
      },
    });

    expect(wrapper.find('.hero-banner').exists()).toBe(true);
    expect(wrapper.find('.hero-banner__headline').text()).toBe('Online Casino');
    expect(wrapper.find('.grid-layout').element.children.length).toBe(0);
  });

  it('scrolls to the catalog filter section when Browse games is activated by click', () => {
    const scrollIntoView = vi.fn();
    const wrapper = mount(App, {
      attachTo: document.body,
      global: {
        stubs: {
          'font-awesome-icon': true,
        },
      },
    });

    const filterSection = wrapper.find('.filter-section').element;
    filterSection.scrollIntoView = scrollIntoView;

    wrapper.find('.hero-banner__cta').trigger('click');

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it.each(['Enter', ' '])(
    'scrolls to the catalog filter section when Browse games is activated with %s',
    async key => {
      const scrollIntoView = vi.fn();
      const wrapper = mount(App, {
        attachTo: document.body,
        global: {
          stubs: {
            'font-awesome-icon': true,
          },
        },
      });

      const filterSection = wrapper.find('.filter-section').element;
      filterSection.scrollIntoView = scrollIntoView;

      const cta = wrapper.find('.hero-banner__cta');
      cta.element.focus();
      await cta.trigger('keydown', { key });

      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    },
  );
});
