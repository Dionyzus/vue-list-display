import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from './App.vue';
import { GAME_CATALOG_ANCHOR_ID } from './common/constants';

const gamesListStyles = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'components/Games/GamesList.vue'),
  'utf8',
).match(/<style scoped>([\s\S]*?)<\/style>/)?.[1] ?? '';

vi.mock('./components/Games/data.js', () => ({
  default: [],
}));

async function activateCtaWithKeyboard(button, key) {
  button.element.focus();
  await button.trigger('keydown', { key });
  await button.trigger('keyup', { key });
  button.element.dispatchEvent(
    new MouseEvent('click', { bubbles: true, cancelable: true, detail: 0 }),
  );
}

describe('App', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('renders HeroBanner above the catalog list in the content slot', () => {
    const wrapper = mount(App);

    const content = wrapper.find('main.content');
    const children = content.findAll(':scope > *');

    expect(children.at(0).classes()).toContain('hero-banner');
    expect(children.at(1).classes()).toContain('game-grid');
  });

  it('keeps HeroBanner visible when the catalog list is empty', () => {
    const wrapper = mount(App);

    expect(wrapper.find('.hero-banner').exists()).toBe(true);
    expect(wrapper.find('.hero-banner__headline').text()).toBe('Online Casino');
    expect(wrapper.find('.hero-banner__supporting').text()).toBe('Browse our game catalog');
    expect(wrapper.find('.hero-banner__cta').text()).toBe('Browse games');
    expect(wrapper.findAll('.grid-layout > *')).toHaveLength(0);
  });

  it('exposes a document-level scroll target on the catalog filter section', () => {
    const wrapper = mount(App);
    const anchor = wrapper.find(`#${GAME_CATALOG_ANCHOR_ID}`);

    expect(anchor.exists()).toBe(true);
    expect(anchor.classes()).toContain('filter-section');
  });

  it('offsets the catalog anchor below the fixed header', () => {
    mount(App, { attachTo: document.body });

    expect(document.getElementById(GAME_CATALOG_ANCHOR_ID)).not.toBeNull();
    expect(gamesListStyles).toContain('scroll-margin-top: var(--app-header-scroll-offset)');
    expect(gamesListStyles).toContain('.filter-section');
  });

  it('scrolls to the catalog filter section when Browse games is clicked', async () => {
    const wrapper = mount(App, { attachTo: document.body });
    const target = document.getElementById(GAME_CATALOG_ANCHOR_ID);
    target.scrollIntoView = vi.fn();

    await wrapper.find('.hero-banner__cta').trigger('click');

    expect(target.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  it.each(['Enter', ' '])(
    'scrolls to the catalog filter section when Browse games is activated with %s',
    async key => {
      const wrapper = mount(App, { attachTo: document.body });
      const target = document.getElementById(GAME_CATALOG_ANCHOR_ID);
      target.scrollIntoView = vi.fn();
      const cta = wrapper.find('.hero-banner__cta');

      await activateCtaWithKeyboard(cta, key);

      expect(document.activeElement).toBe(cta.element);
      expect(target.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    },
  );
});
