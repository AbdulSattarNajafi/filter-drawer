// Show & Hide filter drawer
const filterBtn = document.getElementById('filter-btn');
const closeFilterBtn = document.getElementById('close-filter-btn');
const filterPopup = document.querySelector('.filter-container');

filterBtn.addEventListener('click', showFilterPopup);
closeFilterBtn.addEventListener('click', hideFilterPopup);

// Define touch variables
let x1, y1;
const drawerHeight = filterPopup.scrollHeight;

// define functions to fire during close start, move, and end events
const closeStart = (event) => {
    event.stopPropagation();

    const touchLocation = event.targetTouches[0];
    x1 = touchLocation.clientX;
    y1 = touchLocation.clientY;
};

const closeMove = (event) => {
    event.stopPropagation();

    const touchLocation = event.touches[0];
    let yLocation = touchLocation.clientY;

    if (yLocation > drawerHeight + y1) {
        yLocation = drawerHeight + y1;
    }

    let marker = yLocation - y1;

    if (marker < 0) marker = 0;

    filterPopup.style.transform = `translateY(${marker}px)`;

    console.log('parent Clicked');
};

const closeEnd = (event) => {
    event.stopPropagation();

    const touchLocation = event.changedTouches[0];
    const y2 = touchLocation.clientY;
    const yDiff = y2 - y1;

    if (yDiff > drawerHeight / 4) {
        hideFilterPopup();
    }
};

hideDrawerOnpushingDown(filterPopup);

function hideDrawerOnpushingDown(ele) {
    ele.addEventListener('touchstart', closeStart);
    ele.addEventListener('touchmove', closeMove);
    ele.addEventListener('touchend', closeEnd);
}

function showFilterPopup() {
    filterPopup.classList.add('show');
}

function hideFilterPopup() {
    filterPopup.classList.remove('show');
    setTimeout(() => {
        filterPopup.style.transform = `translateY(0px)`;
    }, 500);
}

// Show & Hide filters
const goBackBTn = document.getElementById('go-back-btn');
const filterHeader = document.querySelector('.filter__header');
const resetFilter = document.querySelector('.filter__reset');
const filterItems = document.querySelectorAll('.filter__reset-item');
const filterTabs = document.querySelectorAll('.filter__form');

filterItems.forEach((item) => {
    item.addEventListener('click', () => {
        const selectedFilter = item.dataset.toggle;
        const filterContent = document.querySelector(`.${selectedFilter}`);

        resetFilter.classList.add('hide');
        filterHeader.classList.add('active-filters');
        filterContent.classList.remove('hide');
    });
});

goBackBTn.addEventListener('click', () => {
    filterTabs.forEach((filterTab) => {
        if (!filterTab.classList.contains('hide')) {
            filterTab.classList.add('hide');
        }
    });
    resetFilter.classList.remove('hide');
    filterHeader.classList.remove('active-filters');
});

// Show Search Button
const filterSearchForm = document.querySelector('.filter__reset-search');
const searchInput = document.querySelector('.filter__search-input');
const searchBtn = document.querySelector('.filter__search-btn');

filterSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.classList.add('show');
    }
});

// Preventing Touch Push on some Elements
const resetBtn = document.querySelector('.filter__reset-btn');

preventTouchMove(resetBtn);
preventTouchMove(searchInput);
preventTouchMove(goBackBTn);
preventTouchMove(closeFilterBtn);

function preventTouchMove(ele) {
    ele.addEventListener('touchmove', (e) => {
        e.stopPropagation();
    });
}