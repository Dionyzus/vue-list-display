import { afterEach, describe, expect, it, vi } from 'vitest';

import { getScrollBehavior, scrollToElementById } from './scrollToElement';

describe('scrollToElement', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  describe('getScrollBehavior', () => {
    it('returns smooth when scrollBehavior is supported', () => {
      expect(getScrollBehavior()).toBe('smooth');
    });
  });

  describe('scrollToElementById', () => {
    it('scrolls to the matching element and returns true', () => {
      const target = document.createElement('div');
      target.id = 'scroll-target';
      target.scrollIntoView = vi.fn();
      document.body.appendChild(target);

      const scrolled = scrollToElementById('scroll-target');

      expect(scrolled).toBe(true);
      expect(target.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });

    it('returns false when the element is missing', () => {
      expect(scrollToElementById('missing-target')).toBe(false);
    });
  });

  describe('getScrollBehavior', () => {
    it('returns auto when scrollBehavior is unsupported', () => {
      const styleSpy = vi.spyOn(document.documentElement, 'style', 'get').mockReturnValue({});

      expect(getScrollBehavior()).toBe('auto');

      styleSpy.mockRestore();
    });
  });
});
