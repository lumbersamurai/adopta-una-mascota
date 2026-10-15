// Interacciones del sitio Adopta una Mascota
(() => {
  const $ = (selector, contexto = document) => contexto.querySelector(selector);
  const $$ = (selector, contexto = document) => [...contexto.querySelectorAll(selector)];
  const menosMovimiento = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Encabezado: aparece una línea inferior al hacer scroll */
  const encabezado = $(".encabezado");
  const alHacerScroll = () => encabezado.classList.toggle("con-sombra", window.scrollY > 8);
  alHacerScroll();
  addEventListener("scroll", alHacerScroll, { passive: true });

  /* Menú móvil */
  const botonMenu = $(".menu-boton");
  const menu = $("#menu");

  const cerrarMenu = () => {
    menu.classList.remove("abierto");
    botonMenu.classList.remove("abierto");
    botonMenu.setAttribute("aria-expanded", "false");
  };

  botonMenu.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    botonMenu.classList.toggle("abierto", abierto);
    botonMenu.setAttribute("aria-expanded", String(abierto));
  });

  $$("a", menu).forEach((enlace) => enlace.addEventListener("click", cerrarMenu));
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarMenu();
  });

  /* Revelado de elementos al entrar en pantalla */
  const elementos = $$(".revelar");
  if ("IntersectionObserver" in window && !menosMovimiento) {
    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visible");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    elementos.forEach((el) => observador.observe(el));
  } else {
    elementos.forEach((el) => el.classList.add("visible"));
  }

  /* Enlace activo del menú según la sección visible */
  const enlaces = $$('.menu a[href^="#"]');
  const secciones = enlaces.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const observadorSecciones = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (!entrada.isIntersecting) return;
          enlaces.forEach((a) => {
            if (a.getAttribute("href") === `#${entrada.target.id}`) {
              a.setAttribute("aria-current", "true");
            } else {
              a.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    secciones.forEach((s) => observadorSecciones.observe(s));
  }

  /* Filtro por especie y búsqueda por nombre */
  const chips = $$(".chip");
  const tarjetas = $$(".tarjeta");
  const buscador = $("#buscar");
  const sinResultados = $(".sin-resultados");
  let especie = "todos";

  const normalizar = (texto) =>
    texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const filtrar = () => {
    const consulta = normalizar(buscador.value.trim());
    let visibles = 0;

    tarjetas.forEach((tarjeta) => {
      const coincideEspecie = especie === "todos" || tarjeta.dataset.especie === especie;
      const coincideTexto = normalizar(tarjeta.textContent).includes(consulta);
      const mostrar = coincideEspecie && coincideTexto;
      const estabaOculta = tarjeta.hidden;

      tarjeta.hidden = !mostrar;

      if (mostrar) {
        visibles++;
        tarjeta.classList.add("visible");
        if (estabaOculta && !menosMovimiento) {
          tarjeta.classList.remove("entra");
          void tarjeta.offsetWidth; // reinicia la animación
          tarjeta.classList.add("entra");
        }
      }
    });

    sinResultados.hidden = visibles > 0;
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      especie = chip.dataset.filtro;
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      filtrar();
    });
  });

  buscador.addEventListener("input", filtrar);

  /* "Quiero conocerlo": prepara el mensaje del formulario */
  const campoMensaje = $("#mensaje");
  const campoNombre = $("#nombre");

  $$("[data-mascota]").forEach((enlace) => {
    enlace.addEventListener("click", () => {
      campoMensaje.value = `Hola, me gustaría conocer a ${enlace.dataset.mascota}.`;
      setTimeout(() => campoNombre.focus({ preventScroll: true }), 700);
    });
  });

  /* Formulario de contacto */
  // Nota: el formulario es visual. Para enviar los datos hay que conectarlo
  // a un servicio de correo o a un backend (por ejemplo, con fetch).
  const formulario = $(".formulario");
  const estado = $(".estado");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = formulario.elements.nombre.value.trim();

    estado.textContent = `Gracias, ${nombre}. Recibimos tu mensaje.`;
    estado.classList.remove("activo");
    void estado.offsetWidth;
    estado.classList.add("activo");

    formulario.reset();
  });
})();
