import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';

import HeroBanner from './HeroBanner.vue';

const HEADLINE = 'Online Casino';
const SUPPORTING_LINE = 'Browse our game catalog';
const CTA_LABEL = 'Browse games';
const ANCHOR_ID = 'catalog-filter';

describe('HeroBanner', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.restoreAllMocks();
  });

  it('renders the PRD headline, supporting line, and CTA copy', () => {
    const wrapper = mount(HeroBanner);

    const text = wrapper.text();
    expect(text).toContain(HEADLINE);
    expect(text).toContain(SUPPORTING_LINE);

    // The CTA is a real button so it is keyboard/AT accessible; assert by role + label
    // rather than by its styling class.
    expect(wrapper.find('button').text()).toBe(CTA_LABEL);
  });

  it('scrolls toward the catalog anchor when the CTA is activated', async () => {
    const target = document.createElement('div');
    target.id = ANCHOR_ID;
    // jsdom does not implement scrollIntoView, so install a spy on the real target.
    target.scrollIntoView = vi.fn();
    document.body.appendChild(target);

    const wrapper = mount(HeroBanner, {
      props: { scrollTargetId: ANCHOR_ID }
    });

    await wrapper.find('button').trigger('click');

    expect(target.scrollIntoView).toHaveBeenCalledTimes(1);
    expect(target.scrollIntoView).toHaveBeenCalledWith(
      expect.objectContaining({ behavior: 'smooth', block: 'start' })
    );
  });

  it('does nothing when no scroll target is configured', async () => {
    const spy = vi.spyOn(document, 'getElementById');

    const wrapper = mount(HeroBanner, {
      props: { scrollTargetId: '' }
    });

    await wrapper.find('button').trigger('click');

    expect(spy).not.toHaveBeenCalled();
  });
});
