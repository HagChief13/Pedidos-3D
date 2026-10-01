document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const launchButtons = document.querySelectorAll(
        'a[href="./app/"]'
    );


    /* =====================================================
       ENTRADA DE LA PÁGINA
    ===================================================== */

    document.body.classList.add("page-loaded");


    /* =====================================================
       BOTONES → APP
       ===================================================== */

    launchButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            button.classList.add("launching");

            /*
             * La ruta es relativa al splash:
             *
             * syncdrivepro/
             *      └── app/
             *
             * No usamos rutas absolutas para que funcione
             * también en GitHub Pages.
             */

            event.preventDefault();

            window.location.href = "./app/";

        });

    });


    /* =====================================================
       REVEAL AL HACER SCROLL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".about-section, .features-section, .cta-section"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach((element) => {

            observer.observe(element);

        });

    }


    /* =====================================================
       EFECTO 3D DEL VISUAL
    ===================================================== */

    const visual = document.querySelector(".hero-visual");


    if (visual) {

        const card = visual.querySelector(".drive-card");


        if (card) {

            visual.addEventListener("mousemove", (event) => {

                const rect = visual.getBoundingClientRect();

                const x =
                    (event.clientX - rect.left) / rect.width;

                const y =
                    (event.clientY - rect.top) / rect.height;


                const rotateY = (x - 0.5) * 10;

                const rotateX = (0.5 - y) * 8;


                card.style.transform =
                    `perspective(1000px)
                     rotateY(${rotateY}deg)
                     rotateX(${rotateX}deg)`;

            });


            visual.addEventListener("mouseleave", () => {

                card.style.transform =
                    `perspective(1000px)
                     rotateY(-8deg)
                     rotateX(3deg)`;

            });

        }

    }

});

