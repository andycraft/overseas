function isMobile()
{
    const desktopMenu = document.querySelector('.menu-bar__desktop-menu');
    const status = window.getComputedStyle(desktopMenu).getPropertyValue('display');
    return (status == 'none') ? true : false;
}

function addEventHandler(selector, event, handler)
{
    document.querySelectorAll(selector).forEach(el => {
        el.addEventListener(event, handler);
    });
}

function toggleMobileMenu(e)
{
    e.preventDefault();
    document.querySelector('.mobile-menu').classList.toggle('is-active');
}

function toggleDropDownMenu(e)
{
    e.preventDefault();

    const parent = this.parentElement;
    const isUserMenu = parent.classList.contains('menu-bar__user');
    const isActive = parent.classList.contains('is-active');

    if (isUserMenu && isMobile()) {
        parent.classList.remove('is-active');
        toggleMobileMenu(e);
    } else {
        if (isActive) {
            parent.classList.remove('is-active');
        } else {
            // first remove the active class from all drop-down menus
            document.querySelector('.menu-bar__user').classList.remove('is-active');
            document.querySelector('.menu-bar__language').classList.remove('is-active');
            document.querySelector('.menu-bar__currency').classList.remove('is-active');

            // add the active class to selected drop-down menu
            parent.classList.add('is-active');
        }

    }

}

function toggleSubMenu(e)
{
    e.preventDefault();
    this.parentElement.classList.toggle('is-active');
}

function showAllCountries(e)
{
    e.preventDefault();

    const hiddenCountries = document.querySelectorAll('.main-search__countries__item.is-hidden');

    hiddenCountries.forEach((country) => {
        country.classList.remove('is-hidden');
    });

    document.querySelector('.main-search__countries__show-all').remove();
}

(function(){
    console.log('dom ready');

    addEventHandler('.mobile-menu-burger__button', 'click', toggleMobileMenu);
    addEventHandler('.mobile-menu__list__item.has-submenu > a', 'click', toggleSubMenu);

    addEventHandler(
        '.menu-bar__user__button, .menu-bar__currency__button, .menu-bar__language__button',
        'click',
        toggleDropDownMenu
    );

    addEventHandler('.main-search__countries__show-all__button', 'click', showAllCountries);

    addEventHandler('.add-listing__dropdown-input__button', 'click', function(e){
        e.preventDefault();
        this.parentElement.classList.toggle('is-active');
    });

    addEventHandler('.add-listing__tag', 'click', function(e){
        e.preventDefault();
        this.classList.toggle('is-selected');
    });

    addEventHandler('.property-details__description__title__see-more', 'click', function(e){
        e.preventDefault();
        this.parentElement.classList.toggle('is-active');
        document.querySelector('.property-details__description__text').classList.toggle('is-hidden');
    });

    addEventHandler('.inline-form__input__dropdown', 'click', function(e){
        e.preventDefault();
        this.classList.toggle('is-active');
    });
})();
