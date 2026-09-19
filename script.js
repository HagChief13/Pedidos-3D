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
       MENÚ HAMBURGUESA
    ===================================================== */

    function openMenu() {
    if (!siteMenu || !menuToggle) return;
    siteMenu.classList.add("menu-open");
    menuToggle.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Cerrar menú");
}

function closeMenu() {
    if (!siteMenu || !menuToggle) return;
    siteMenu.classList.remove("menu-open");
    menuToggle.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
}

function toggleMenu() {
    if (!siteMenu) return;
    if (siteMenu.classList.contains("menu-open")) {
        closeMenu();
    } else {
        openMenu();
    }
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

});
function drawNovaLine(){
  const mine = document.querySelector('.nova-mine');
  const svg = document.querySelector('.nova-svg-line');
  const poly = document.getElementById('novaPoly');
  const mr = mine.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${mr.width} ${mr.height}`);
  const pts = [...document.querySelectorAll('.nova-roadmap-item .nova-node')].map(n=>{
    const r = n.getBoundingClientRect();
    return `${r.left - mr.left + r.width/2},${r.top - mr.top + r.height/2}`;
  });
  poly.setAttribute('points', pts.join(' '));
}
window.addEventListener('load', drawNovaLine);
window.addEventListener('resize', drawNovaLine);


const banner = document.getElementById('cookie-banner');
if(!localStorage.getItem('cookies-ok')){
  setTimeout(()=>banner.classList.add('show'), 1200);
}
document.getElementById('accept-cookies').onclick = ()=>{
  localStorage.setItem('cookies-ok','yes');
  banner.classList.remove('show');
};
document.getElementById('reject-cookies').onclick = ()=>{
  localStorage.setItem('cookies-ok','no');
  banner.classList.remove('show');
};
document.getElementById('open-cookies').onclick = ()=>{
  banner.classList.add('show');
};

function openSpa(id){
  const el = document.getElementById(id);
  if(!el) return;
  el.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeSpa(){
  document.querySelectorAll('.spa-page').forEach(p=>p.classList.remove('show'));
  document.body.style.overflow = '';
}

document.getElementById('open-terms')?.addEventListener('click', e=>{
  e.preventDefault(); openSpa('spa-terms');
});
document.getElementById('open-privacy')?.addEventListener('click', e=>{
  e.preventDefault(); openSpa('spa-privacy');
});
document.querySelectorAll('.spa-back').forEach(b=> b.onclick = closeSpa);

document.addEventListener('DOMContentLoaded',function(){
  var book=document.getElementById('p3dBook'); if(!book) return;
  var cover=document.getElementById('bookCover');

  var order=[0,1,2,3,4,5,6,7,8];
  var pagesById={};
  order.forEach(function(id){
    var el=book.querySelector('.bpage[data-i="'+id+'"]');
    if(el){ pagesById[id]=el; el.style.zIndex = 20 - id; }
  });
  var stack=[];
  var animating=false;

  function flipNext(){
    if(animating) return;
    var nextId=order.find(function(id){return stack.indexOf(id)===-1;});
    if(nextId===undefined || nextId===8) return;
    var el=pagesById[nextId];
    stack.push(nextId);
    el.classList.add('flipped');
    el.style.zIndex = 1 + nextId;
  }
  function flipPrev(){
    if(animating ||!stack.length) return;
    var lastId=stack.pop();
    var el=pagesById[lastId];
    el.classList.remove('flipped');
    el.style.zIndex = 20 - lastId;
  }

  cover.addEventListener('click',function(e){
    e.stopPropagation();
    if(!book.classList.contains('open')){
      book.classList.add('open');
    } else {
      book.classList.remove('open');
      animating=true;
      var ids=stack.slice().reverse();
      var i=0;
      var t=setInterval(function(){
        if(i>=ids.length){clearInterval(t);animating=false;return;}
        var id=ids[i];
        var el=pagesById[id];
        el.classList.add('flipping-fast');
        el.classList.remove('flipped');
        el.style.zIndex=20-id;
        (function(elm){setTimeout(function(){elm.classList.remove('flipping-fast');},220);})(el);
        i++;
      },120);
      stack=[];
    }
  });

  book.addEventListener('click',function(e){
    if(e.target.closest('.nextB')){e.stopPropagation();flipNext();}
    if(e.target.closest('.prevB')){e.stopPropagation();flipPrev();}
  });

  book.querySelectorAll('.idx-btn').forEach(function(btn){
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      if(animating) return;
      var target=parseInt(btn.dataset.goto,10);
      animating=true;
      var timer=setInterval(function(){
        if(stack.length < target){
          var nid=order.find(function(id){return stack.indexOf(id)===-1;});
          if(nid < target){ stack.push(nid); var el=pagesById[nid]; el.classList.add('flipped'); el.style.zIndex=1+nid; }
          else { clearInterval(timer); animating=false; }
        } else if(stack.length > target){
          var lid=stack.pop(); var el2=pagesById[lid]; el2.classList.remove('flipped'); el2.style.zIndex=20-lid;
        } else {
          clearInterval(timer); animating=false;
        }
      },180);
    });
  });

  var betaAdd=document.getElementById('betaAdd');
  if(betaAdd){betaAdd.addEventListener('click',function(e){e.stopPropagation();var inp=document.getElementById('betaInput');var list=document.getElementById('betaList');if(!inp.value.trim())return;var li=document.createElement('li');li.textContent='● '+inp.value;list.appendChild(li);inp.value='';});}
  var betaAdd2=document.getElementById('betaAdd2');
  if(betaAdd2){betaAdd2.addEventListener('click',function(e){e.stopPropagation();var inp=document.getElementById('betaInput2');var list=document.getElementById('betaList2');if(!inp.value.trim())return;var li=document.createElement('li');li.textContent='● '+inp.value;list.appendChild(li);inp.value='';});}
});