document.addEventListener('DOMContentLoaded', () => {

    // 1. OBTENER ELEMENTOS DEL DOM
    const themeToggler = document.getElementById('theme-toggler');
    const themeIcon = themeToggler.querySelector('i');
    const pageBody = document.body;
    // NUEVO: Obtenemos el elemento de la barra de navegación
    const navbar = document.querySelector('.navbar');

    // 2. FUNCIÓN PARA APLICAR EL TEMA Y EL ÍCONO
    const setTheme = (theme) => {
        pageBody.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    };

    // 3. EVENT LISTENER PARA EL BOTÓN DE TEMA
    themeToggler.addEventListener('click', () => {
        const currentTheme = pageBody.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // 4. INICIALIZAR EL ÍCONO CORRECTO AL CARGAR LA PÁGINA
    const initialTheme = pageBody.getAttribute('data-theme');
    if (initialTheme === 'dark') {
        themeIcon.classList.add('fa-moon');
        themeIcon.classList.remove('fa-sun');
    } else {
        themeIcon.classList.add('fa-sun');
        themeIcon.classList.remove('fa-moon');
    }

    // 5. DETECTAR CAMBIOS EN LAS PREFERENCIAS DEL SISTEMA OPERATIVO
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
        }
    });

    // ==================================================
    // 6. LÓGICA PARA EL BORDE DEL NAVBAR AL HACER SCROLL (NUEVO)
    // ==================================================
    const handleScroll = () => {
        // Si el desplazamiento vertical es mayor que 10 píxeles...
        if (window.scrollY > 10) {
            // ...añade la clase 'scrolled' a la navbar.
            navbar.classList.add('scrolled');
        } else {
            // ...de lo contrario, quítala.
            navbar.classList.remove('scrolled');
        }
    };

    // Añadimos un listener al evento 'scroll' de la ventana
    window.addEventListener('scroll', handleScroll);
    
    // También ejecutamos la función una vez al cargar la página, por si se recarga con scroll
    handleScroll();

});