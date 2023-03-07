const list = document.getElementById('list');
const ascButton = document.getElementById('sort-asc');
const descButton = document.getElementById('sort-desc');

ascButton.addEventListener('click', () => {
  sortList('asc');
});

descButton.addEventListener('click', () => {
  sortList('desc');
});

function sortList(order) {
  const items = Array.from(list.children);
  items.sort((a, b) => {
    if (order === 'asc') {
      return a.textContent.localeCompare(b.textContent);
    } else {
      return b.textContent.localeCompare(a.textContent);
    }
  });
  items.forEach((item) => {
    list.appendChild(item);
  });
}
