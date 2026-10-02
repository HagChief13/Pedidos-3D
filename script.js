document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       REFERENCIAS PRINCIPALES
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const siteMenu = document.getElementById("siteMenu");
    const navbar = document.querySelector(".navbar");

    const views = document.querySelectorAll(".site-view");

    const menuLinks = document.querySelectorAll(
        "#siteMenu a[data-section]"
    );

    const sectionLinks = document.querySelectorAll(
        "[data-section]"
    );

    const validViews = [
        "inicio",
        "pedidos3d",
        "nova",
        "calculadora",
        "syncdrive"
    ];

    let currentView = null;
    let isChangingView = false;


    /* =====================================================
       COOKIES / TÉRMINOS / PRIVACIDAD
    ===================================================== */

    const cookieBanner = document.getElementById("cookieBanner");
    const splashLegal = document.getElementById("splashLegal");

    const aceptarCookies = document.getElementById("aceptarCookies");
    const rechazarCookies = document.getElementById("rechazarCookies");

    const aceptarLegal = document.getElementById("aceptarLegal");

    const openCookies = document.getElementById("open-cookies");
    const openTerms = document.getElementById("open-terms");
    const openPrivacy = document.getElementById("open-privacy");


    /* =====================================================
       COOKIES
    ===================================================== */

    function mostrarCookies() {

        if (!cookieBanner) return;

        cookieBanner.style.display = "block";
    }


    function ocultarCookies() {

        if (!cookieBanner) return;

        cookieBanner.style.display = "none";
    }


    if (!localStorage.getItem("cookiesAceptadas")) {

        setTimeout(() => {
            mostrarCookies();
        }, 700);

    }


    aceptarCookies?.addEventListener("click", () => {

        localStorage.setItem(
            "cookiesAceptadas",
            "true"
        );

        ocultarCookies();

    });


    rechazarCookies?.addEventListener("click", () => {

        ocultarCookies();

    });


    openCookies?.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();

        mostrarCookies();

    });


    /* =====================================================
       TÉRMINOS / PRIVACIDAD
    ===================================================== */

    function mostrarLegal(tipo = "legal") {

        if (!splashLegal) return;

        const titulo = splashLegal.querySelector("h2");
        const texto = splashLegal.querySelector("p");

        if (tipo === "terminos") {

            if (titulo) {
                titulo.textContent = "TÉRMINOS DE USO";
            }

            if (texto) {
                texto.textContent =
                    "Al utilizar PEDIDOS 3D y los servicios disponibles en este sitio, aceptas utilizar la plataforma de forma responsable. Las funciones, aplicaciones y herramientas pueden encontrarse en desarrollo y estar sujetas a cambios. Este es un proyecto independiente.";
            }

        } else if (tipo === "privacidad") {

            if (titulo) {
                titulo.textContent = "POLÍTICA DE PRIVACIDAD";
            }

            if (texto) {
                texto.textContent =
                    "La información proporcionada para utilizar determinadas funciones del sitio se utiliza únicamente para ofrecer y gestionar dichas funciones. No compartimos información personal con terceros salvo cuando sea necesario para prestar un servicio solicitado. Puedes solicitar la eliminación de tus datos cuando corresponda.";
            }

        } else {

            if (titulo) {
                titulo.textContent = "TÉRMINOS Y PRIVACIDAD";
            }

        }

        splashLegal.style.display = "flex";
    }


    function ocultarLegal() {

        if (!splashLegal) return;

        splashLegal.style.display = "none";
    }


    openTerms?.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();

        mostrarLegal("terminos");

    });


    openPrivacy?.addEventListener("click", (event) => {

        event.preventDefault();
        event.stopPropagation();

        mostrarLegal("privacidad");

    });


    aceptarLegal?.addEventListener("click", () => {

        localStorage.setItem(
            "legalAceptado",
            "true"
        );

        ocultarLegal();

    });


    splashLegal?.addEventListener("click", (event) => {

        if (event.target === splashLegal) {
            ocultarLegal();
        }

    });


    /* =====================================================
       MENÚ HAMBURGUESA
    ===================================================== */

    function openMenu() {

        if (!siteMenu || !menuToggle) return;

        siteMenu.classList.add("open");
        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Cerrar menú"
        );
    }


    function closeMenu() {

        if (!siteMenu || !menuToggle) return;

        siteMenu.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Abrir menú"
        );
    }


    function toggleMenu() {

        if (!siteMenu) return;

        if (siteMenu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    }


    menuToggle?.addEventListener("click", (event) => {

        event.stopPropagation();

        toggleMenu();

    });


    /* =====================================================
       CERRAR MENÚ AL HACER CLICK FUERA
    ===================================================== */

    document.addEventListener("click", (event) => {

        if (!siteMenu) return;

        const clickedMenu =
            siteMenu.contains(event.target);

        const clickedButton =
            menuToggle &&
            menuToggle.contains(event.target);

        if (!clickedMenu && !clickedButton) {
            closeMenu();
        }

    });


    /* =====================================================
       ESC
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();
            ocultarLegal();

        }

    });


    /* =====================================================
       CAMBIO DE VISTAS
    ===================================================== */

    function changeView(viewName, updateHistory = true) {

        if (!validViews.includes(viewName)) {
            viewName = "inicio";
        }


        if (
            isChangingView ||
            currentView === viewName
        ) {

            closeMenu();

            return;
        }


        const targetView =
            document.getElementById(viewName);


        if (!targetView) {

            console.warn(
                `Vista no encontrada: ${viewName}`
            );

            return;
        }


        isChangingView = true;

        closeMenu();


        /* =================================================
           VISTA ANTERIOR
        ================================================= */

        const previousView =
            document.querySelector(
                ".site-view.active-view"
            );


        if (
            previousView &&
            previousView !== targetView
        ) {

            previousView.classList.add(
                "view-exit"
            );

        }


        /* =================================================
           LIMPIAR VISTAS
        ================================================= */

        views.forEach((view) => {

            view.classList.remove("active-view");
            view.classList.remove("view-enter");

        });


        /* =================================================
           ACTIVAR NUEVA VISTA
        ================================================= */

        targetView.classList.add("active-view");
        targetView.classList.add("view-enter");


        /* =================================================
           MENÚ ACTIVO
        ================================================= */

        menuLinks.forEach((link) => {

            link.classList.toggle(
                "active",
                link.dataset.section === viewName
            );

        });


        /* =================================================
           URL
        ================================================= */

        if (updateHistory) {

            const newUrl =
                `${window.location.pathname}#${viewName}`;

            window.history.pushState(
                {
                    view: viewName
                },
                "",
                newUrl
            );

        }


        /* =================================================
           SCROLL ARRIBA
        ================================================= */

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });


        /* =================================================
           ANIMACIÓN DE ENTRADA
        ================================================= */

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                targetView.classList.add(
                    "view-visible"
                );

            });

        });


        /* =================================================
           ANIMACIONES INTERNAS
        ================================================= */

        initializeViewAnimations(targetView);


        /* =================================================
           FINALIZAR TRANSICIÓN
        ================================================= */

        setTimeout(() => {

            views.forEach((view) => {

                view.classList.remove(
                    "view-exit"
                );

                view.classList.remove(
                    "view-enter"
                );

            });

            isChangingView = false;

        }, 550);


        currentView = viewName;

        console.log(
            `Vista activa → ${viewName}`
        );
    }


    /* =====================================================
       ENLACES DE SECCIONES
    ===================================================== */

    sectionLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const viewName =
                link.dataset.section;


            if (!validViews.includes(viewName)) {
                return;
            }


            event.preventDefault();

            changeView(
                viewName,
                true
            );

        });

    });


    /* =====================================================
       ENLACES INTERNOS DE PEDIDOS 3D
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            '.pedidos-view a[href^="#pedidos-"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            const target =
                document.querySelector(targetId);


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       ANIMACIONES DE CONTENIDO
    ===================================================== */

    function initializeViewAnimations(container = document) {

        const animatedElements =
            container.querySelectorAll(
                ".feature-card, .about-text, .about-stamp, .nova-content, .welcome-project-card"
            );


        if (!animatedElements.length) {
            return;
        }


        if ("IntersectionObserver" in window) {

            const observer =
                new IntersectionObserver(
                    (entries, observerInstance) => {

                        entries.forEach((entry) => {

                            if (entry.isIntersecting) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observerInstance.unobserve(
                                    entry.target
                                );

                            }

                        });

                    },
                    {
                        threshold: 0.12
                    }
                );


            animatedElements.forEach((element) => {

                element.classList.remove(
                    "visible"
                );

                observer.observe(element);

            });

        } else {

            animatedElements.forEach((element) => {

                element.classList.add(
                    "visible"
                );

            });

        }

    }


    /* =====================================================
       NAVBAR AL HACER SCROLL
    ===================================================== */

    if (navbar) {

        const updateNavbar = () => {

            if (window.scrollY > 40) {

                navbar.classList.add(
                    "scrolled"
                );

            } else {

                navbar.classList.remove(
                    "scrolled"
                );

            }

        };


        updateNavbar();


        window.addEventListener(
            "scroll",
            updateNavbar,
            {
                passive: true
            }
        );

    }


    /* =====================================================
       DETECCIÓN DEL SISTEMA OPERATIVO
    ===================================================== */

    const windowsCard =
        document.getElementById("card-windows");

    const androidCard =
        document.getElementById("card-android");


    const userAgent =
        navigator.userAgent ||
        navigator.vendor ||
        window.opera ||
        "";


    let operatingSystem = "unknown";


    if (/android/i.test(userAgent)) {

        operatingSystem = "android";

    } else if (
        /Win32|Win64|Windows|WinCE/i.test(userAgent)
    ) {

        operatingSystem = "windows";

    } else if (
        /iPhone|iPad|iPod/i.test(userAgent)
    ) {

        operatingSystem = "ios";

    } else if (
        /Macintosh|Mac OS X/i.test(userAgent)
    ) {

        operatingSystem = "mac";

    } else if (
        /Linux/i.test(userAgent)
    ) {

        operatingSystem = "linux";

    }


    /* =====================================================
       RESALTAR PLATAFORMA
    ===================================================== */

    if (
        operatingSystem === "windows" &&
        windowsCard
    ) {

        windowsCard.classList.add(
            "recomendado"
        );

        console.log(
            "Pedidos 3D → Windows detectado"
        );

    } else if (
        operatingSystem === "android" &&
        androidCard
    ) {

        androidCard.classList.add(
            "recomendado"
        );

        console.log(
            "Pedidos 3D → Android detectado"
        );

    }


    /* =====================================================
       BOTONES PRÓXIMAMENTE
    ===================================================== */

    const comingSoonButtons =
        document.querySelectorAll(
            ".coming-soon, [data-coming-soon]"
        );


    comingSoonButtons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                if (button.tagName === "A") {
                    event.preventDefault();
                }


                const platform =
                    button.dataset.download ||
                    button.dataset.platform ||
                    "general";


                console.log(
                    `Pedidos 3D → ${platform} → próximamente`
                );

            }
        );

    });


    /* =====================================================
       BOTONES DE DESCARGA ANTIGUOS
    ===================================================== */

    const oldDownloadButtons =
        document.querySelectorAll(
            ".download-platform-btn, .big-download"
        );


    oldDownloadButtons.forEach((button) => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                console.log(
                    "Esta descarga estará disponible próximamente."
                );

            }
        );

    });


    /* =====================================================
       HISTORIAL DEL NAVEGADOR
    ===================================================== */

    window.addEventListener(
        "popstate",
        () => {

            let viewName =
                window.location.hash
                    .replace("#", "");


            if (!validViews.includes(viewName)) {

                viewName = "inicio";

            }


            /*
             * Permitimos el cambio aunque currentView
             * coincida, porque viene del navegador.
             */

            const previousChangingState =
                isChangingView;

            isChangingView = false;

            changeView(
                viewName,
                false
            );

            isChangingView =
                previousChangingState;

        }
    );


    /* =====================================================
       VISTA INICIAL
    ===================================================== */

    let initialView =
        window.location.hash
            .replace("#", "");


    if (!validViews.includes(initialView)) {

        initialView = "inicio";

    }


    views.forEach((view) => {

        view.classList.remove(
            "active-view"
        );

        view.classList.remove(
            "view-visible"
        );

        view.classList.remove(
            "view-enter"
        );

        view.classList.remove(
            "view-exit"
        );

    });


    const initialElement =
        document.getElementById(initialView);


    if (initialElement) {

        initialElement.classList.add(
            "active-view"
        );

        initialElement.classList.add(
            "view-visible"
        );

    }


    menuLinks.forEach((link) => {

        link.classList.toggle(
            "active",
            link.dataset.section === initialView
        );

    });


    currentView = initialView;


    initializeViewAnimations(
        initialElement || document
    );


    console.log(
        `Sistema iniciado → vista: ${initialView}`
    );


    /* =====================================================
       BARRA LAVA / PROGRESO DE SCROLL
    ===================================================== */

    const lavaLiquid =
        document.getElementById("lavaLiquid");


    function updateLava() {

        if (!lavaLiquid) return;


        const documentHeight =
            document.documentElement.scrollHeight;

        const viewportHeight =
            document.documentElement.clientHeight;


        const maxScroll =
            documentHeight - viewportHeight;


        if (maxScroll <= 0) {

            lavaLiquid.style.height = "0%";

            return;

        }


        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop ||
            0;


        const percentage =
            (scrollTop / maxScroll) * 100;


        lavaLiquid.style.height =
            `${Math.min(100, Math.max(0, percentage))}%`;

    }


    updateLava();


    window.addEventListener(
        "scroll",
        updateLava,
        {
            passive: true
        }
    );


    window.addEventListener(
        "resize",
        updateLava
    );


    /* =====================================================
       TEMPORIZADOR DEL PROYECTO
       CUENTA DESDE EL INICIO REAL
    ===================================================== */

    const devTimer =
        document.getElementById("devTimer");


    if (devTimer) {

        const startDate =
            new Date(
                "2026-09-14T13:00:00-03:00"
            ).getTime();


        function updateDevTimer() {

            const now =
                Date.now();


            let difference =
                now - startDate;


            if (difference < 0) {
                difference = 0;
            }


            const totalSeconds =
                Math.floor(
                    difference / 1000
                );


            const days =
                Math.floor(
                    totalSeconds / 86400
                );


            const hours =
                Math.floor(
                    (totalSeconds % 86400) / 3600
                );


            const minutes =
                Math.floor(
                    (totalSeconds % 3600) / 60
                );


            const seconds =
                totalSeconds % 60;


            devTimer.textContent =
                `${days}d ${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;

        }


        updateDevTimer();


        setInterval(
            updateDevTimer,
            1000
        );

    }


        /* =====================================================
       MANUAL RÁPIDO — PEDIDOS 3D
       ABRIR / CERRAR / NAVEGACIÓN
    ===================================================== */

    const p3dBook = document.getElementById("p3dBook");
    const bookCover = document.getElementById("bookCover");

    if (p3dBook && bookCover) {

        const pages = Array.from(
            p3dBook.querySelectorAll(".bpage")
        );

        let currentPage = 0;


        /* =================================================
           ABRIR / CERRAR
        ================================================= */

        function toggleBook() {

            const isOpen =
                p3dBook.classList.toggle("open");

            console.log(
                isOpen
                    ? "Manual → abierto"
                    : "Manual → cerrado"
            );

        }


        /* =================================================
           TAPA COMPLETA
        ================================================= */

        bookCover.addEventListener(
            "click",
            (event) => {

                event.preventDefault();
                event.stopImmediatePropagation();

                toggleBook();

            },
            true
        );


        /* =================================================
           NAVEGACIÓN DE PÁGINAS
        ================================================= */

        function mostrarPagina(index) {

            if (!pages.length) {
                return;
            }

            index = Math.max(
                0,
                Math.min(
                    index,
                    pages.length - 1
                )
            );

            currentPage = index;

            pages.forEach((page, i) => {

                page.classList.toggle(
                    "active",
                    i === currentPage
                );

            });

        }


        /* =================================================
           BOTONES DEL LIBRO
        ================================================= */

        p3dBook.addEventListener(
            "click",
            (event) => {

                const nextButton =
                    event.target.closest(".nextB");

                const prevButton =
                    event.target.closest(".prevB");

                const indexButton =
                    event.target.closest(".idx-btn");


                /* SIGUIENTE */

                if (nextButton) {

                    event.preventDefault();
                    event.stopPropagation();

                    mostrarPagina(
                        currentPage + 1
                    );

                    return;
                }


                /* ANTERIOR */

                if (prevButton) {

                    event.preventDefault();
                    event.stopPropagation();

                    mostrarPagina(
                        currentPage - 1
                    );

                    return;
                }


                /* ÍNDICE */

                if (indexButton) {

                    event.preventDefault();
                    event.stopPropagation();

                    const destino =
                        Number(
                            indexButton.dataset.goto
                        );

                    const pagina =
                        pages.findIndex(
                            (page) =>
                                Number(
                                    page.dataset.i
                                ) === destino
                        );

                    if (pagina !== -1) {

                        mostrarPagina(
                            pagina
                        );

                    }

                }

            }
        );


        /* =================================================
           INICIO
        ================================================= */

        mostrarPagina(0);

    }


    /* =====================================================
       INICIALIZACIÓN FINAL
    ===================================================== */

    console.log(
        "✓ JavaScript cargado correctamente"
    );

});