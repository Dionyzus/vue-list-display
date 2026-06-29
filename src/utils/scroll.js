export const scrollToAnchor = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch {
    element.scrollIntoView();
  }
};
