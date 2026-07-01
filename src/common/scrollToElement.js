export function getScrollBehavior() {
  return 'scrollBehavior' in document.documentElement.style ? 'smooth' : 'auto';
}

export function scrollToElementById(id) {
  const target = document.getElementById(id);

  if (!target) {
    return false;
  }

  target.scrollIntoView({
    behavior: getScrollBehavior(),
    block: 'start',
  });

  return true;
}
