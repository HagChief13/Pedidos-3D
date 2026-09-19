document.addEventListener("DOMContentLoaded", () => {


/* =====================================================
   ANIMACIONES AL HACER SCROLL
   
   Los encabezados de las secciones permanecen siempre
   visibles. Solo animamos contenido secundario.
===================================================== */

const animatedElements =
    document.querySelectorAll(
        ".feature-card, .about-text, .about-stamp"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        /*
                         * Dejamos de observar el elemento
                         * después de mostrarlo.
                         */

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach((element) => {

        observer.observe(element);

    });

} else {

    animatedElements.forEach((element) => {

        element.classList.add(
            "visible"
        );

    });

}



/* =====================================================
   NAVBAR AL HACER SCROLL
===================================================== */

const navbar =
    document.querySelector(
        ".navbar"
    );


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


if (/android/i.test(userAgent)) {

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
   RESALTAR TARJETA RECOMENDADA
===================================================== */

if (
    operatingSystem === "windows" &&
    windowsCard
) {

    windowsCard.classList.add(
        "recomendado"
    );


    console.log(
        "Pedidos 3D: sistema detectado → Windows"
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
        "Pedidos 3D: sistema detectado → Android"
    );

}

else {

    console.log(
        "Pedidos 3D: sistema operativo no compatible o no detectado →",
        operatingSystem
    );

}



/* =====================================================
   BOTONES DE DESCARGA
===================================================== */

const downloadButtons =
    document.querySelectorAll(
        ".download-platform-btn"
    );


downloadButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const platform =
                    button.dataset.download ||
                    "Desconocida";


                console.log(
                    `Pedidos 3D: descarga iniciada → ${platform}`
                );


                console.log(
                    "URL:",
                    button.href
                );

            }
        );

    }
);



/* =====================================================
   BOTÓN GITHUB
===================================================== */

const githubDownload =
    document.querySelector(
        ".big-download"
    );


if (githubDownload) {

    githubDownload.addEventListener(
        "click",
        () => {

            console.log(
                "Pedidos 3D: acceso a GitHub Releases"
            );


            console.log(
                "URL:",
                githubDownload.href
            );

        }
    );

}


});
