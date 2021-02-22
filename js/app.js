/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
let ul = document.getElementById('navbar__list'), sections = document.querySelectorAll('section'),
    header = document.querySelector('header.page__header'), scrollTimer = -1, toTopBtn = document.getElementById("toTop");;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

createItem = (tagName, content, isHTMLContent = false) => {
    let li = document.createElement(tagName);

    if (isHTMLContent) {
        li.innerHTML = content;
    } else {
        li.textContent = content;
    }

    return li;
}

isInViewport = (element) => {
    const rect = element.getBoundingClientRect();

    return (
        ((rect.top - 1) >= (-element.clientHeight)) &&
        (element.offsetTop - document.documentElement.offsetTop) <= document.documentElement.scrollTop
    );
}

scrollToTop = () => {
    window.scrollTo({
        top: top,
        behavior: 'smooth'
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

navBuilder = () => {
    sections.forEach(section => {
        content = `
            <a class="menu__link" data-href="${section.getAttribute('id')}">${section.getAttribute('data-nav')}</a>
        `;

        ul.appendChild(createItem('li', content, true));
    });
}

scrollToSection = () => {
    document.querySelectorAll('.menu__link').forEach(each => {
        each.addEventListener('click', ($event => {
            $event.preventDefault();

            let sectionId = $event.target.getAttribute('data-href'),
                top = document.getElementById(sectionId).offsetTop;

            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }));
    });
}

setActiveClassByScroll = () => {
    document.addEventListener('scroll', ($event => {
        if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
            toTopBtn.style.display = "block";
        } else {
            toTopBtn.style.display = "none";
        }

        sections.forEach(section => {
            let sectionId = section.getAttribute('id');

            if (isInViewport(section)) {
                section.classList.add('active');
                document.querySelector(`a[data-href="${sectionId}"]`).classList.add('active');
            } else {
                section.classList.remove('active');
                document.querySelector(`a[data-href="${sectionId}"]`).classList.remove('active');
            }
        });
    }));
}

displaySubMenu = () => {
    document.addEventListener('click', ($event => {
        let target = $event.target, parentId;
        if (target.getAttribute('data-parent')) {
            parentId = target.getAttribute('data-parent');

            document.querySelectorAll('.landing__container-content').forEach(item => {
                item.style.height = '0px';
            });

            if (document.querySelector(`#${parentId} .landing__container-content`).classList.contains('show')) {
                document.querySelector(`#${parentId} .landing__container-content`).classList.remove('show');
            } else {
                document.querySelector(`#${parentId} .landing__container-content`).classList.add('show');
            }

            document.querySelectorAll('.landing__container-content.show').forEach(item => {
                item.style.height = item.scrollHeight + 'px';
            });
        }
    }));
}

hideHeaderOnScroll = () => {
    document.addEventListener('scroll', () => {
        header.style.top = '0';

        if (scrollTimer != -1) {
            clearTimeout(scrollTimer);
        }

        scrollTimer = window.setTimeout(() => {
            header.style.top = '-52px';
        }, 1000);
    })
}

// build the nav
navBuilder();

// Add class 'active' to section when near top of viewport
setActiveClassByScroll();

// Scroll to anchor ID using scrollTO event
scrollToSection();

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 

// Scroll to section on link click

// Set sections as active

// Collapse the sections on h2 click

setTimeout(() => {
    document.querySelectorAll('.landing__container-content.show').forEach(item => {
        item.style.height = item.scrollHeight + 'px';
    });
}, 100);

displaySubMenu();

// hide header during the scroll event

hideHeaderOnScroll();