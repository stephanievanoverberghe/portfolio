document.addEventListener('DOMContentLoaded', () => {
    const menuTrigger = document.querySelector('#menuTrigger');
    const menuTriggerIcons = menuTrigger.querySelectorAll('.menu__icon');
    const menu = document.querySelector('#menu'); // Sélection du menu
    const menuItems = menu.querySelectorAll('a'); // Sélection des items du menu

    /**
     * Bascule entre l'ouverture et la fermeture du menu.
     */
    const toggleMenu = () => {
        menu.classList.toggle('hidden');
        toggleMenuIcons(menu.classList.contains('hidden'));
    };

    /**
     * Bascule les icônes du menu burger.
     * @param {boolean} isMenuHidden - Indique si le menu est caché.
     */
    const toggleMenuIcons = (isMenuHidden) => {
        menuTriggerIcons[0].classList.toggle('hidden', !isMenuHidden); // Barre
        menuTriggerIcons[1].classList.toggle('hidden', isMenuHidden);  // Croix
    };

    /**
     * Ferme le menu si on clique à l'extérieur.
     * @param {Event} event - L'événement de clic
     */
    const closeMenuOnClickOutside = (event) => {
        if (!menu.contains(event.target) && !menuTrigger.contains(event.target)) {
            if (!menu.classList.contains('hidden')) {
                menu.classList.add('hidden');
                toggleMenuIcons(true); // Remettre l'icône burger
            }
        }
    };

    /**
     * Ferme le menu si un item est cliqué.
     */
    const closeMenuOnItemClick = () => {
        if (!menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
            toggleMenuIcons(true); // Remettre l'icône burger
        }
    };

    // Ajouter un événement de clic sur le bouton du menu
    menuTrigger.addEventListener('click', toggleMenu);

    // Fermer le menu si on clique en dehors
    window.addEventListener('click', closeMenuOnClickOutside);

    // Fermer le menu si un item est cliqué
    menuItems.forEach(item => {
        item.addEventListener('click', closeMenuOnItemClick);
    });
});
