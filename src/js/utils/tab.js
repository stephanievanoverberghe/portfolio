document.addEventListener('DOMContentLoaded', () => {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const tab = link.getAttribute('data-tab');

            // Désactiver tous les onglets
            tabLinks.forEach(link => {
                link.classList.remove('bg-red-pink-50', 'text-red-pink-600', 'shadow-light-pressed', 'active');
                link.classList.add('bg-gradient-to-br', 'from-red-pink-100', 'to-red-pink-50', 'text-red-pink-900', 'shadow-light-default');
            });

            // Masquer tous les contenus
            tabContents.forEach(content => content.classList.add('hidden'));

            // Activer l'onglet cliqué
            link.classList.add('bg-red-pink-50', 'text-red-pink-600', 'shadow-light-pressed', 'active');
            link.classList.remove('bg-gradient-to-br', 'from-red-pink-100', 'to-red-pink-50', 'text-red-pink-900', 'shadow-light-default');

            // Afficher le contenu associé
            document.getElementById(tab).classList.remove('hidden');
        });
    });

    // Afficher le contenu de l'onglet actif par défaut
    const activeTab = document.querySelector('.tab-link.active').getAttribute('data-tab');
    document.getElementById(activeTab).classList.remove('hidden');
});
