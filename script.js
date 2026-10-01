document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       REFERENCIAS PRINCIPALES
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");


    const siteMenu =
        document.getElementById("siteMenu");


    const navbar =
        document.querySelector(".navbar");


    const views =
        document.querySelectorAll(".site-view");


    const menuLinks =
        document.querySelectorAll(
            "#siteMenu a[data-section]"
        );


    const sectionLinks =
        document.querySelectorAll(
            "[data-section]"
        );


    const validViews = [
        "inicio",
        "pedidos3d",
        "nova"
    ];


    let currentView = null;

    let isChangingView = false;
    /* =====================================================
   COOKIES / TÉRMINOS / PRIVACIDAD
===================================================== */

const cookieBanner =
    document.getElementById("cookieBanner");

const splashLegal =
    document.getElementById("splashLegal");

const aceptarCookies =
    document.getElementById("aceptarCookies");

const rechazarCookies =
    document.getElementById("rechazarCookies");

const aceptarLegal =
    document.getElementById("aceptarLegal");

const openCookies =
    document.getElementById("open-cookies");

const openTerms =
    document.getElementById("open-terms");

const openPrivacy =
    document.getElementById("open-privacy");


/* =====================================================
   MOSTRAR COOKIES
===================================================== */

function mostrarCookies() {

    if (!cookieBanner) {
        return;
    }

    cookieBanner.style.display = "block";
}


/* =====================================================
   OCULTAR COOKIES
===================================================== */

function ocultarCookies() {

    if (!cookieBanner) {
        return;
    }

    cookieBanner.style.display = "none";
}


/* =====================================================
   MOSTRAR LEGAL
===================================================== */

function mostrarLegal(tipo = "legal") {

    if (!splashLegal) {
        return;
    }

    const titulo =
        splashLegal.querySelector("h2");

    const texto =
        splashLegal.querySelector("p");

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


/* =====================================================
   OCULTAR LEGAL
===================================================== */

function ocultarLegal() {

    if (!splashLegal) {
        return;
    }

    splashLegal.style.display = "none";
}


/* =====================================================
   MOSTRAR COOKIES AL ABRIR LA PÁGINA
===================================================== */

if (!localStorage.getItem("cookiesAceptadas")) {

    setTimeout(() => {

        mostrarCookies();

    }, 700);

}


/* =====================================================
   ACEPTAR COOKIES
===================================================== */

aceptarCookies?.addEventListener(
    "click",
    () => {

        localStorage.setItem(
            "cookiesAceptadas",
            "true"
        );

        ocultarCookies();

    }
);


/* =====================================================
   RECHAZAR COOKIES
===================================================== */

rechazarCookies?.addEventListener(
    "click",
    () => {

        ocultarCookies();

    }
);


/* =====================================================
   BOTÓN COOKIES DEL FOOTER
===================================================== */

openCookies?.addEventListener(
    "click",
    (event) => {

        event.preventDefault();
        event.stopPropagation();

        mostrarCookies();

    }
);


/* =====================================================
   BOTÓN TÉRMINOS DEL FOOTER
===================================================== */

openTerms?.addEventListener(
    "click",
    (event) => {

        event.preventDefault();
        event.stopPropagation();

        mostrarLegal("terminos");

    }
);


/* =====================================================
   BOTÓN PRIVACIDAD DEL FOOTER
===================================================== */

openPrivacy?.addEventListener(
    "click",
    (event) => {

        event.preventDefault();
        event.stopPropagation();

        mostrarLegal("privacidad");

    }
);


/* =====================================================
   ACEPTAR TÉRMINOS / CERRAR LEGAL
===================================================== */

aceptarLegal?.addEventListener(
    "click",
    () => {

        localStorage.setItem(
            "legalAceptado",
            "true"
        );

        ocultarLegal();

    }
);


/* =====================================================
   CERRAR LEGAL HACIENDO CLICK FUERA
===================================================== */

splashLegal?.addEventListener(
    "click",
    (event) => {

        if (event.target === splashLegal) {

            ocultarLegal();

        }

    }
);



    /* =====================================================
       MENÚ HAMBURGUESA
    ===================================================== */

    function openMenu() {

        if (!siteMenu || !menuToggle) {
            return;
        }


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

        if (!siteMenu || !menuToggle) {
            return;
        }


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

        if (!siteMenu) {
            return;
        }


        if (
            siteMenu.classList.contains("open")
        ) {

            closeMenu();

        } else {

            openMenu();

        }

    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                toggleMenu();

            }
        );

    }



    /* =====================================================
       CERRAR MENÚ AL HACER CLICK FUERA
    ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            if (!siteMenu) {
                return;
            }


            const clickedMenu =
                siteMenu.contains(
                    event.target
                );


            const clickedButton =
                menuToggle &&
                menuToggle.contains(
                    event.target
                );


            if (
                !clickedMenu &&
                !clickedButton
            ) {

                closeMenu();

            }

        }
    );



    /* =====================================================
       CERRAR CON ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );



    /* =====================================================
       CAMBIO REAL DE VISTA
       
       Inicio
       Pedidos 3D
       Nova
    ===================================================== */

    function changeView(
        viewName,
        updateHistory = true
    ) {

        if (
            !validViews.includes(
                viewName
            )
        ) {

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
            document.getElementById(
                viewName
            );


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


        if (previousView) {

            previousView.classList.add(
                "view-exit"
            );

        }



        /* =================================================
           PREPARAR NUEVA VISTA
        ================================================= */

        views.forEach(
            (view) => {

                view.classList.remove(
                    "active-view"
                );

                view.classList.remove(
                    "view-enter"
                );

                view.classList.remove(
                    "view-exit"
                );

            }
        );


        targetView.classList.add(
            "active-view"
        );


        targetView.classList.add(
            "view-enter"
        );



        /* =================================================
           ACTUALIZAR MENÚ ACTIVO
        ================================================= */

        menuLinks.forEach(
            (link) => {

                const isActive =
                    link.dataset.section ===
                    viewName;


                link.classList.toggle(
                    "active",
                    isActive
                );

            }
        );



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
           VOLVER ARRIBA
        ================================================= */

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });



        /* =================================================
           INICIAR ANIMACIONES DE LA VISTA
        ================================================= */

        requestAnimationFrame(
            () => {

                requestAnimationFrame(
                    () => {

                        targetView.classList.add(
                            "view-visible"
                        );

                    }
                );

            }
        );



        /* =================================================
           ANIMACIONES INTERNAS
        ================================================= */

        initializeViewAnimations(
            targetView
        );



        /* =================================================
           TERMINAR TRANSICIÓN
        ================================================= */

        setTimeout(
            () => {

                views.forEach(
                    (view) => {

                        view.classList.remove(
                            "view-exit"
                        );

                        view.classList.remove(
                            "view-enter"
                        );

                    }
                );


                isChangingView = false;

            },
            550
        );


        currentView =
            viewName;


        console.log(
            `Vista activa → ${viewName}`
        );

    }



    /* =====================================================
       EVENTOS DE LOS ENLACES DEL MENÚ
    ===================================================== */

    sectionLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const viewName =
                        link.dataset.section;


                    if (
                        !validViews.includes(
                            viewName
                        )
                    ) {

                        return;

                    }


                    event.preventDefault();


                    changeView(
                        viewName,
                        true
                    );

                }
            );

        }
    );



    /* =====================================================
       BOTONES INTERNOS DE PEDIDOS 3D
       
       Estos NO cambian de vista.
       Solo navegan dentro de Pedidos 3D.
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            '.pedidos-view a[href^="#pedidos-"]'
        );


    internalLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );



    /* =====================================================
       ANIMACIONES DE CONTENIDO
    ===================================================== */

    function initializeViewAnimations(
        container = document
    ) {

        const animatedElements =
            container.querySelectorAll(
                ".feature-card, .about-text, .about-stamp, .nova-content, .welcome-project-card"
            );


        if (
            !animatedElements.length
        ) {

            return;

        }


        /*
         * Si IntersectionObserver existe,
         * esperamos a que los elementos entren
         * en pantalla.
         */

        if (
            "IntersectionObserver" in window
        ) {

            const observer =
                new IntersectionObserver(
                    (
                        entries,
                        observerInstance
                    ) => {

                        entries.forEach(
                            (entry) => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "visible"
                                    );


                                    observerInstance.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.12
                    }
                );


            animatedElements.forEach(
                (element) => {

                    /*
                     * Eliminamos el estado anterior
                     * para que la animación pueda
                     * repetirse cuando volvamos a
                     * la vista.
                     */

                    element.classList.remove(
                        "visible"
                    );


                    observer.observe(
                        element
                    );

                }
            );

        } else {

            animatedElements.forEach(
                (element) => {

                    element.classList.add(
                        "visible"
                    );

                }
            );

        }

    }



    /* =====================================================
       NAVBAR AL HACER SCROLL
    ===================================================== */

    if (navbar) {

        const updateNavbar =
            () => {

                if (
                    window.scrollY > 40
                ) {

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
        document.getElementById(
            "card-windows"
        );


    const androidCard =
        document.getElementById(
            "card-android"
        );


    const userAgent =
        navigator.userAgent ||
        navigator.vendor ||
        window.opera ||
        "";


    let operatingSystem =
        "unknown";


    if (
        /android/i.test(
            userAgent
        )
    ) {

        operatingSystem =
            "android";

    }

    else if (
        /Win32|Win64|Windows|WinCE/i.test(
            userAgent
        )
    ) {

        operatingSystem =
            "windows";

    }

    else if (
        /iPhone|iPad|iPod/i.test(
            userAgent
        )
    ) {

        operatingSystem =
            "ios";

    }

    else if (
        /Macintosh|Mac OS X/i.test(
            userAgent
        )
    ) {

        operatingSystem =
            "mac";

    }

    else if (
        /Linux/i.test(
            userAgent
        )
    ) {

        operatingSystem =
            "linux";

    }



    /* =====================================================
       RESALTAR PLATAFORMA
       
       Esto NO descarga nada.
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

    }


    else if (
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


    comingSoonButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                (event) => {

                    /*
                     * Evitamos cualquier navegación
                     * accidental.
                     */

                    if (
                        button.tagName === "A"
                    ) {

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

        }
    );



    /* =====================================================
       BOTONES DE DESCARGA ANTIGUOS
       
       Protección por si todavía existe
       alguna clase del HTML anterior.
    ===================================================== */

    const oldDownloadButtons =
        document.querySelectorAll(
            ".download-platform-btn, .big-download"
        );


    oldDownloadButtons.forEach(
        (button) => {

            button.addEventListener(
                "click",
                (event) => {

                    event.preventDefault();


                    console.log(
                        "Esta descarga estará disponible próximamente."
                    );

                }
            );

        }
    );



    /* =====================================================
       HISTORIAL DEL NAVEGADOR
       
       Permite usar:
       
       #inicio
       #pedidos3d
       #nova
       
       y también los botones Atrás / Adelante.
    ===================================================== */

    window.addEventListener(
        "popstate",
        () => {

            let viewName =
                window.location.hash
                    .replace("#", "");


            if (
                !validViews.includes(
                    viewName
                )
            ) {

                viewName =
                    "inicio";

            }


            changeView(
                viewName,
                false
            );

        }
    );



    /* =====================================================
       VISTA INICIAL
    ===================================================== */

    let initialView =
        window.location.hash
            .replace("#", "");


    if (
        !validViews.includes(
            initialView
        )
    ) {

        initialView =
            "inicio";

    }


    /*
     * Mostramos inicialmente la vista
     * sin animación de cambio.
     */

    views.forEach(
        (view) => {

            view.classList.remove(
                "active-view"
            );

            view.classList.remove(
                "view-visible"
            );

        }
    );


    const initialElement =
        document.getElementById(
            initialView
        );


    if (initialElement) {

        initialElement.classList.add(
            "active-view"
        );

        initialElement.classList.add(
            "view-visible"
        );

    }


    menuLinks.forEach(
        (link) => {

            link.classList.toggle(
                "active",
                link.dataset.section ===
                initialView
            );

        }
    );


    currentView =
        initialView;


    initializeViewAnimations(
        initialElement || document
    );


    console.log(
        `Sistema iniciado → vista: ${initialView}`
    );
    window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
  document.getElementById('lavaLiquid').style.height = pct + '%';
});
    /* =====================================================
   TEMPORIZADOR DEL PROYECTO
   CUENTA DESDE EL INICIO REAL
===================================================== */

const devTimer = document.getElementById("devTimer");

if (devTimer) {

    // Inicio del proyecto
    const startDate =
        new Date("2026-09-14T13:00:00-03:00").getTime();

    function updateDevTimer() {

        const now = Date.now();

        let difference = now - startDate;

        if (difference < 0) {
            difference = 0;
        }

        const totalSeconds =
            Math.floor(difference / 1000);

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

    setInterval(updateDevTimer, 1000);
}


});