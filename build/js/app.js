function isMobile()
{
    let desktopMenu = document.querySelector('.menu-bar__desktop-menu');
    let status = window.getComputedStyle(desktopMenu).getPropertyValue('display');
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

    let parent = this.parentElement;
    let isUserMenu = parent.classList.contains('menu-bar__user');
    let isActive = parent.classList.contains('is-active');

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

    const hiddenCountries = document.querySelectorAll('.main-search__countries__country-list .is-hidden');

    hiddenCountries.forEach((country) => {
        country.classList.remove('is-hidden');
    });

    document.querySelector('.main-search__countries__show-all').remove();
}

(function(){
    console.log('dom ready');

    // All pages

    addEventHandler('.mobile-menu-burger__button', 'click', toggleMobileMenu);
    addEventHandler('.mobile-menu__list__item.has-submenu > a', 'click', toggleSubMenu);

    addEventHandler(
        '.menu-bar__user__button, .menu-bar__currency__button, .menu-bar__language__button',
        'click',
        toggleDropDownMenu
    );

    // Main page

    addEventHandler('.main-search__countries__show-all__button', 'click', showAllCountries);

    // Add listing page

    addEventHandler('.add-listing__dropdown-input__button', 'click', function(e){
        e.preventDefault();
        this.parentElement.classList.toggle('is-active');

        let options = this.parentElement.querySelector('.options');
        if (options) {
            options.classList.toggle('is-hidden');
        }
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

    addEventHandler('.btn--toggle-errors', 'click', function(e){
        e.preventDefault();
        document.querySelectorAll('.add-listing__field').forEach((field) => {
            field.classList.toggle('has-errors');
        });
    });

    // Property page

    addEventHandler('.property-details__data__item__button--save', 'click', function(e){
        e.preventDefault();
        this.classList.toggle('is-active');
    });

    addEventHandler('.property-gm__switch--to-map', 'click', function(e){
        e.preventDefault();
        this.classList.add('is-hidden');
        document.querySelector('.property-gallery').classList.add('is-hidden');
        document.querySelector('.property-gm__switch--to-gallery').classList.remove('is-hidden');
        document.querySelector('.property-map').classList.remove('is-hidden');
    });

    addEventHandler('.property-gm__switch--to-gallery', 'click', function(e){
        e.preventDefault();
        this.classList.add('is-hidden');
        document.querySelector('.property-map').classList.add('is-hidden');
        document.querySelector('.property-gm__switch--to-map').classList.remove('is-hidden');
        document.querySelector('.property-gallery').classList.remove('is-hidden');
    });

    addEventHandler('.property-map__zoom', 'click', function(e){
        e.preventDefault();
        this.classList.toggle('is-active');
        document.querySelector('.property-map__map').classList.toggle('is-zoomed');
    });

    addEventHandler('.similar-properties__item__photo__save', 'click', function(e){
        e.preventDefault();
        this.classList.toggle('is-active');
    });

    // Agency page

    document.querySelectorAll('.country-list__item').forEach(el => {
        let country = el.querySelector('.country-list__item-country');
        if (country) {
            el.title = country.innerText;
        }
    });

    addEventHandler('.agency-description__title__see-more', 'click', function(e){
        e.preventDefault();
        this.parentElement.classList.toggle('is-active');
        document.querySelector('.agency-description__text').classList.toggle('is-hidden');
    });

    addEventHandler('.agency-specialists__title__see-more', 'click', function(e){
        e.preventDefault();
        this.parentElement.classList.toggle('is-active');
        document.querySelector('.agency-specialists__list').classList.toggle('is-hidden');
    });

    addEventHandler('.property-list__item-photo-remove, .property-list__item-details-buttons-remove, .property-list__item-info-buttons-remove', 'click', function(e){
        e.preventDefault();
        let property = this.closest('.property-list__item');
        if (property) {
            property.classList.toggle('is-hidden');
        }
    });

    addEventHandler('.property-list__item-photo-like, .property-list__item-details-buttons-like, .property-list__item-info-buttons-like', 'click', function(e){
        e.preventDefault();
        let property = this.closest('.property-list__item');
        if (property) {
            property.classList.toggle('is-liked');
        }
    });

    // Search page

    addEventHandler('.search-form__flats-button, .search-form__bedrooms-button, .search-form__cost-button', 'click', function(e){
        e.preventDefault();
        this.classList.toggle('is-active');

        let parent = this.parentElement;
        parent.classList.toggle('is-active');

        let options = parent.querySelector('.options');
        if (options) {
            options.classList.toggle('is-hidden');
        }
    });

    addEventHandler('.search-form__filters-button', 'click', function(e){
        e.preventDefault();
        this.classList.toggle('is-active');
        let popup = document.querySelector('.search-form__popup');
        if (popup) {
            popup.classList.toggle('is-hidden');
        }
    });

    addEventHandler('.search-form__popup-input-button', 'click', function(e){
        e.preventDefault();
        this.classList.toggle('is-active');

        let parent = this.parentElement;
        parent.classList.toggle('is-active');

        let options = parent.querySelector('.options');
        if (options) {
            options.classList.toggle('is-hidden');
        }
    });

    addEventHandler('.search-form__popup-tag', 'click', function(e){
        e.preventDefault();
        this.classList.toggle('is-selected');
    });

    addEventHandler('.search-form__popup-title-switch', 'click', function(e){
        e.preventDefault();
        let group = this.closest('.search-form__popup-group');
        if (group) {
            group.classList.toggle('is-active');
        }
    });

    addEventHandler('.search-result__tag-remove', 'click', function(e){
        e.preventDefault();
        let tag = this.closest('.search-result__tag');
        if (tag) {
            tag.remove();
        }
    });

    addEventHandler('.search-result__controls-item-button', 'click', function(e){
        e.preventDefault();
        this.classList.toggle('is-active');
    });

    // Common page

    addEventHandler('.content__body--common .tabs__item', 'click', function(e){
        e.preventDefault();

        let tabs = this.closest('.tabs');
        let tabs_items = tabs.querySelectorAll('.tabs__item');

        tabs_items.forEach((tab) => {
            tab.classList.remove('is-selected');
        });

        this.classList.add('is-selected');
    });

    addEventHandler('.content__body--common .faq__item-link', 'click', function(e){
        e.preventDefault();

        let faq_item = this.closest('.faq__item');

        if (faq_item) {
            faq_item.classList.toggle('is-active');
        }
    });

    addEventHandler('.options__item', 'click', function(e){
        let options = this.closest('.options');

        if (options) {
            let multiple = options.classList.contains('options--multiple');

            if (multiple) {
                let checkbox = this.querySelector('.cbx');
                if (checkbox) {
                    if (checkbox.checked) {
                        this.classList.add('is-selected');
                    } else {
                        this.classList.remove('is-selected');
                    }
                } else {
                    this.classList.toggle('is-selected');
                }
            } else {
                let options_items = options.querySelectorAll('.options__item');
                options_items.forEach((tab) => {
                    tab.classList.remove('is-selected');
                });

                let options_checkboxes = options.querySelectorAll('.cbx');
                options_checkboxes.forEach((cbx) => {
                    cbx.checked = '';
                });

                this.classList.add('is-selected');

                let checkbox = this.querySelector('.cbx');
                if (checkbox) checkbox.checked = 'checked';

                let parent = options.parentElement;
                parent.classList.remove('is-active');

                let button = parent.querySelector('button');
                if (button) {
                    button.classList.remove('is-active');
                }

                options.classList.add('is-hidden');

                // set value
                let input = parent.querySelector('input[type=text]');
                if (input) {
                    input.value = this.innerText.trim();
                }
            }
        }
    });

})();
