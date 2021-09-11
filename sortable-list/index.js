const draggableList = document.getElementById('draggable-list');
const btnCheck = document.getElementById('btn-check');

// Correct list item order
const mobileSuiteUC = [
  'Gundam Origin',
  'Mobile Suit Gundam',
  '08th MS Team',
  'Gundam Thunderbolt',
  'War in the Pocket',
  'Stardust Memory',
  'Mobile Suit Zeta Gundam',
  'Mobile Suit ZZ Gundam',
  "Char's Counterattack",
  'Mobile Suit Gundam Unicorn',
  'Mobile Suit Gundam Hathaway',
];
// List item order
const listItems = [];
let dragStartIndex;

createList();
btnCheck.addEventListener('click', checkOrder);

// Insert list items into DOM
function createList() {
  [...mobileSuiteUC]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((series, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="series-name">${series}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;

      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });

  addEventListeners();
}

function addEventListeners(params) {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(event) {
  event.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const item1 = listItems[fromIndex].querySelector('.draggable');
  const item2 = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(item2);
  listItems[toIndex].appendChild(item1);
}

// Check order of list items
function checkOrder() {
  listItems.forEach((item, index) => {
    const seriesName = item.querySelector('.draggable').innerText.trim();

    if (seriesName !== mobileSuiteUC[index]) {
      item.classList.add('wrong');
    } else {
      item.classList.remove('wrong');
      item.classList.add('right');
    }
  });
}
