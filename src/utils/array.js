export function moveItemToFirstPosition(array, item) {
  const index = array.findIndex(el => el.id === item.id);

  if (index !== -1) {
    array.splice(index, 1);
    array.unshift(item);
  }

  return array;
}