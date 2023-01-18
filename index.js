// Show & Hide Search on Scroll
const desktopSearch = document.querySelector('.desktop-search ');

window.addEventListener('scroll', () => {
    if (window.scrollY > 550) {
        desktopSearch.classList.add('show');
    } else {
        desktopSearch.classList.remove('show');
    }
});
// Show Desktop Search Button
const desktopFilterSearchForm = document.querySelector('.desktop-search__form');
const desktopSearchInput = document.querySelector('#desktop-search-input');
const desktopSearchBtn = document.querySelector('#desktop-search-btn');

desktopFilterSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

desktopSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        desktopSearchBtn.classList.add('show');
    }
});

// ==================== Desktop Filter ==========================
const desktopFilter = document.querySelector('.desktop-filter');
const desktopFilterBackdrop = document.querySelector('.desktop-filter-backdrop');
const desktopFilterBtns = document.querySelectorAll('.desktop-filter__buttons-btn');
const desktopFilterContents = document.querySelectorAll('.desktop-filters');
const desktopFilterCloseBtns = document.querySelectorAll('.desktop-filter__header-btn');

// Show Desktop filter Drawer & Show and Hide Filter Contents
desktopFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const currentFilter = document.querySelector(`.${btn.dataset.id}`);

        // Checking if the button is clicked again
        if (!currentFilter.classList.contains('hide') && desktopFilter.classList.contains('show')) {
            hideDesktopFilter();
        } else if (
            !currentFilter.classList.contains('hide') &&
            !desktopFilter.classList.contains('show')
        ) {
            desktopFilter.classList.add('show');
            desktopFilterBackdrop.classList.add('show');
        } else if (
            currentFilter.classList.contains('hide') &&
            !desktopFilter.classList.contains('show')
        ) {
            desktopFilter.classList.add('show');
            desktopFilterBackdrop.classList.add('show');
        }

        // Checking the current Filter
        if (!currentFilter.classList.contains('hide')) return;

        desktopFilterContents.forEach((content) => {
            content.classList.add('hide');
        });

        currentFilter.classList.remove('hide');
    });
});

// Hide Desktop Filter Drawer
desktopFilterCloseBtns.forEach((btn) => {
    btn.addEventListener('click', hideDesktopFilter);
});

desktopFilterBackdrop.addEventListener('click', hideDesktopFilter);

function hideDesktopFilter() {
    desktopFilter.classList.remove('show');
    desktopFilterBackdrop.classList.remove('show');
}

// ==================== Tablet & Mobile Filter ==================

// Show & Hide filter drawer
const filterBtn = document.getElementById('filter-btn');
const closeFilterBtn = document.getElementById('close-filter-btn');
const filterOverlay = document.querySelector('.filter-backdrop');
const filterPopup = document.querySelector('.filter-container');

filterBtn.addEventListener('click', showFilterPopup);
closeFilterBtn.addEventListener('click', hideFilterPopup);
filterOverlay.addEventListener('click', hideFilterPopup);

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
};

const closeEnd = (event) => {
    event.stopPropagation();

    const touchLocation = event.changedTouches[0];
    const y2 = touchLocation.clientY;
    const yDiff = y2 - y1;

    // if (yDiff > drawerHeight / 4) {
    //     hideFilterPopup();
    // }

    if (yDiff > 14) {
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
    filterOverlay.classList.add('show');
    filterPopup.classList.add('show');
}

function hideFilterPopup() {
    filterOverlay.classList.remove('show');
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
const searchInput = document.querySelector('#filter-search-input');
const searchBtn = document.querySelector('#filter-search-btn');

filterSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.classList.add('show');
    }
});

// Preventing Touch Push on some Elements
const resetBtn = document.querySelector('#filter__reset-btn');
const filterForms = document.querySelectorAll('.filter__form');

filterForms.forEach((form) => {
    preventTouchMove(form);
});
preventTouchMove(resetBtn);
preventTouchMove(searchInput);

function preventTouchMove(ele) {
    ele.addEventListener('touchstart', (e) => {
        e.stopPropagation();
    });
    ele.addEventListener('touchmove', (e) => {
        e.stopPropagation();
    });
    ele.addEventListener('touchend', (e) => {
        e.stopPropagation();
    });
}
