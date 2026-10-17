"use strict";
/* script.js — comportamento do ImobiFaces sem framework.
   Traduz para JavaScript puro os estados (useState), efeitos (useEffect) e eventos
   dos componentes React do projeto original. O HTML fica em index.html e o CSS em style.css. */

/* ============================================================
   1. IMAGENS
   ============================================================ */

/* Endereço das imagens originais no GitHub, fixado no commit convertido.
   Assim a versão HTML não precisa de uma pasta de imagens própria. */
const ASSET_BASE = "https://raw.githubusercontent.com/MattSnn/projeto_web-design_facens/5cbcdd9e0c5e0e60bf88fd38de001ecd30092061/";

/* Nome do arquivo usado no HTML (data-asset ou var(--asset-...)) -> URL da imagem original. */
const originalAssets = {
    "predio-1.jpg": ASSET_BASE + "src/components/assets/predio-1.jpg",
    "buildings.png": ASSET_BASE + "src/components/assets/buildings.png",
    "casa-card-1.jpg": ASSET_BASE + "src/components/assets/casa-card-1.jpg",
    "FamiliasAtendidas.jpg": ASSET_BASE + "src/components/assets/FamiliasAtendidas.jpg",
    "ImobiFacens.jpg": ASSET_BASE + "src/components/assets/ImobiFacens.jpg",
    "corretor.png": ASSET_BASE + "src/components/assets/corretor.png",
    "favicon.svg": ASSET_BASE + "public/favicon.svg"
};

/* ============================================================
   2. DADOS DOS IMÓVEIS
   ============================================================ */

/* Cópia fiel de src/data/prediosLista.ts do original.
   - price: valor usado no filtro de preço; area: usada no filtro de metragem;
   - mainImg/images: nome do arquivo de imagem (ver originalAssets). */
const prediosLista = [
    {
        id: 0,
        name: "Residencial Jardim",
        mainImg: "predio-1.jpg",
        info: "Apartamento bonito e confortável",
        area: "45m²",
        location: "São Paulo",
        price: 325000,
        images: ["predio-1.jpg"],
        planta: "Planta de 45m²",
        description: "Apartamento confortável em uma localização tranquila."
    },
    {
        id: 1,
        name: "Edifício Central",
        mainImg: "predio-1.jpg",
        info: "Apartamento moderno",
        area: "80m²",
        location: "Campinas",
        price: 690000,
        images: ["predio-1.jpg"],
        planta: "Planta de 80m²",
        description: "Apartamento moderno próximo aos principais serviços."
    },
    {
        id: 2,
        name: "Residencial Jardim",
        mainImg: "predio-1.jpg",
        info: "Apartamento bonito e confortável",
        area: "70m²",
        location: "São Paulo",
        price: 540000,
        images: ["predio-1.jpg"],
        planta: "Planta de 70m²",
        description: "Apartamento espaçoso em uma localização tranquila."
    },
    {
        id: 3,
        name: "Edifício Central",
        mainImg: "predio-1.jpg",
        info: "Apartamento moderno",
        area: "80m²",
        location: "Campinas",
        price: 835000,
        images: ["predio-1.jpg"],
        planta: "Planta de 80m²",
        description: "Apartamento moderno com ambientes bem distribuídos."
    },
    {
        id: 4,
        name: "Residencial Jardim",
        mainImg: "predio-1.jpg",
        info: "Apartamento bonito e confortável",
        area: "70m²",
        location: "São Paulo",
        price: 610000,
        images: ["predio-1.jpg"],
        planta: "Planta de 70m²",
        description: "Apartamento amplo, ideal para famílias."
    },
    {
        id: 5,
        name: "Edifício Central",
        mainImg: "predio-1.jpg",
        info: "Apartamento moderno",
        area: "120m²",
        location: "Campinas",
        price: 1250000,
        images: ["predio-1.jpg"],
        planta: "Planta de 120m²",
        description: "Apartamento amplo com espaço para toda a família."
    }
];

/* ============================================================
   3. APLICAÇÃO DAS IMAGENS
   ============================================================ */

/* Coloca a URL original em cada <img data-asset="..."> dentro de container. */
function applyAssets(container) {
    container.querySelectorAll("[data-asset]").forEach((image) => {
        image.src = originalAssets[image.dataset.asset];
    });
}

/* Cria uma variável CSS por imagem (ex.: --asset-buildings-png), usada nos fundos
   do hero e dos indicadores através de style="background-image:var(...)". */
Object.entries(originalAssets).forEach(([name, uri]) => {
    document.documentElement.style.setProperty(
        "--asset-" + name.replaceAll(".", "-"),
        'url("' + uri + '")'
    );
});
document.getElementById("favicon").href = originalAssets["favicon.svg"];
applyAssets(document);

/* ============================================================
   4. ELEMENTOS PRINCIPAIS DA PÁGINA
   ============================================================ */

/* App.tsx: <div> com a navbar e o contêiner com padding superior (div.pt-20). */
const app = document.getElementById("root").firstElementChild;
const navigation = app.firstElementChild;
const pageContainer = app.lastElementChild;
const nav = navigation.querySelector("nav");
const menuButton = nav.querySelector("button");
const overlay = navigation.children[1];
const drawer = navigation.querySelector("aside");

/* Cópia da página inicial, feita antes de qualquer evento, para recriá-la ao voltar. */
const homeContent = pageContainer.firstElementChild.cloneNode(true);

/* Estados equivalentes aos useState do React. */
let isOpen = false;               // NavBar: menu lateral aberto ou fechado
let activePage = "initialPage";   // App: página exibida
let imovelEscolhido = null;       // App: imóvel aberto na página de detalhes

/* ============================================================
   5. MENU LATERAL (NavBar.tsx)
   ============================================================ */

/* Equivale a setIsOpen e ao useEffect que bloqueia a rolagem do body com o menu aberto.
   As classes são montadas com as mesmas strings do NavBar.tsx: aberto mostra o overlay
   e traz a gaveta para a tela; fechado esconde o overlay e empurra a gaveta para a direita. */
function setMenu(open) {
    isOpen = open;
    overlay.className = "fixed inset-0 z-30 bg-black/40 transition-opacity duration-300 " +
        (open ? "opacity-100" : "opacity-0 pointer-events-none");
    drawer.className = "fixed top-0 right-0 z-40 h-full w-64 md:w-80 bg-white shadow-xl px-6 pt-24 pb-6 flex flex-col gap-6 font-bold text-[#55627a]  transition-transform duration-300 " +
        (open ? "translate-x-0" : "translate-x-full");
    drawer.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
}
menuButton.addEventListener("click", () => setMenu(!isOpen));
overlay.addEventListener("click", () => setMenu(false));

/* ============================================================
   6. NAVEGAÇÃO ENTRE PÁGINAS (App.tsx)
   ============================================================ */

/* Links da navbar de cada página: mesmos IDs e rótulos de navBarLinks no App.tsx. */
const navBarLinks = {
    initialPage: [
        { id: "inicio", label: "Início" },
        { id: "oportunidades", label: "Oportunidades" },
        { id: "contato", label: "contato" }
    ],
    todosOsApartamentos: [
        { id: "alugar", label: "Alugar" },
        { id: "comprar", label: "Comprar" },
        { id: "contato", label: "contato" }
    ],
    imovelPage: [
        { id: "alugar", label: "Alugar" },
        { id: "comprar", label: "Comprar" },
        { id: "contato", label: "contato" }
    ]
};

/* Recria os links da barra (desktop) e da gaveta (celular) para a página atual. */
function updateNav(page) {
    const links = navBarLinks[page];
    [nav.children[1], drawer.firstElementChild].forEach((container) => {
        container.replaceChildren(...links.map((link) => {
            const anchor = document.createElement("a");
            anchor.href = "#" + link.id;
            anchor.className = "transition-all hover:text-[#222833]";
            anchor.textContent = link.label;
            return anchor;
        }));
    });
}

/* Troca o conteúdo de div.pt-20; a navbar permanece. Como no React, escolher a
   página já aberta não faz nada, e a posição de rolagem não é alterada. */
function showPage(page) {
    if (page === activePage) return;
    activePage = page;
    let content;
    if (page === "initialPage") {
        content = homeContent.cloneNode(true);
    } else if (page === "todosOsApartamentos") {
        content = document.getElementById("template-catalog").content.cloneNode(true);
    } else {
        content = document.getElementById("template-detail").content.cloneNode(true);
        fillImovel(content, imovelEscolhido);
    }
    pageContainer.replaceChildren(content);
    updateNav(page);
    applyAssets(pageContainer);
    bindPage(page);
}

/* navigateToImovelPage do App.tsx: guarda o imóvel e abre a página de detalhes. */
function navigateToImovelPage(imovel) {
    imovelEscolhido = imovel;
    if (imovel !== null) {
        showPage("imovelPage");
    }
}

/* Links "Página Inicial" e "Todos os apartamentos" da gaveta: trocam a página e fecham o menu. */
const pageLinks = drawer.children[1].querySelectorAll("a");
pageLinks[0].addEventListener("click", (event) => {
    event.preventDefault();
    showPage("initialPage");
    setMenu(false);
});
pageLinks[1].addEventListener("click", (event) => {
    event.preventDefault();
    showPage("todosOsApartamentos");
    setMenu(false);
});

/* Botão "Conheça" dos cards: um único ouvinte no contêiner (delegação de eventos).
   A posição do card dentro do contêiner indica qual imóvel da lista foi escolhido. */
function bindConheca(cardsContainer, getPredios) {
    cardsContainer.addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (!button) return;
        const card = Array.from(cardsContainer.children).find((child) => child.contains(button));
        const predio = card ? getPredios()[Array.from(cardsContainer.children).indexOf(card)] : null;
        if (predio) navigateToImovelPage(predio);
    });
}

/* ============================================================
   7. CARROSSEL DE DESTAQUES (CardsCarousel.tsx)
   ============================================================ */

/* Setas: deslocam 300px; nas extremidades, voltam ao início ou vão ao final. */
function bindCarousel() {
    const section = pageContainer.querySelector("#oportunidades");
    const carousel = section.querySelector(".overflow-hidden");
    const arrows = section.querySelectorAll("button");
    arrows[0].addEventListener("click", () => {
        const { scrollLeft, scrollWidth } = carousel;
        if (scrollLeft <= 10) {
            carousel.scrollTo({ left: scrollWidth, behavior: "smooth" });
        } else {
            carousel.scrollBy({ left: -300, behavior: "smooth" });
        }
    });
    arrows[1].addEventListener("click", () => {
        const { scrollLeft, scrollWidth, clientWidth } = carousel;
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 5) {
            carousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
            carousel.scrollBy({ left: 300, behavior: "smooth" });
        }
    });
    /* Cada card do carrossel corresponde ao imóvel de mesma posição em prediosLista. */
    bindConheca(carousel.firstElementChild, () => prediosLista);
}

/* ============================================================
   8. FILTROS DO CATÁLOGO (AptoPage.tsx e AptoList.tsx)
   ============================================================ */

/* Mesmas comparações do AptoPage: nome (sem diferenciar maiúsculas), preço e metragem. */
function matchesProperty(property, search, price, area) {
    const matchesSearch = property.name.toLowerCase().includes(search.toLowerCase());
    const matchesPrice = price === "" ||
        (price === "<500000" && property.price < 500000) ||
        (price === "500000-1000000" && property.price >= 500000 && property.price <= 1000000) ||
        (price === ">1000000" && property.price > 1000000);
    const matchesArea = area === "" ||
        (area === "<50" && parseInt(property.area) < 50) ||
        (area === "50-100" && parseInt(property.area) >= 50 && parseInt(property.area) <= 100) ||
        (area === ">100" && parseInt(property.area) > 100);
    return matchesSearch && matchesPrice && matchesArea;
}

/* Liga a busca e os selects à lista. Os cards já gerados no template servem de modelo;
   a cada alteração, somente os imóveis que passam nos filtros são exibidos. */
function bindFilters() {
    const section = pageContainer.querySelector("#oportunidades");
    const listContainer = section.lastElementChild;
    const grid = listContainer.lastElementChild;
    const cardTemplates = Array.from(grid.children, (card) => card.cloneNode(true));
    const count = section.querySelector('[aria-live="polite"]');
    const search = pageContainer.querySelector('input[type="text"]');
    const price = pageContainer.querySelector("#filter-price");
    const area = pageContainer.querySelector("#filter-type");
    const empty = document.getElementById("template-list").content
        .querySelector(".py-20").cloneNode(true);
    let filtered = prediosLista;
    let previousKey = prediosLista.map((predio) => predio.name).join("|");

    function filter() {
        const indexes = prediosLista.map((_, index) => index).filter((index) =>
            matchesProperty(prediosLista[index], search.value, price.value, area.value)
        );
        filtered = indexes.map((index) => prediosLista[index]);
        /* Contador "N imóvel/imóveis", com aria-live para leitores de tela. */
        count.textContent = indexes.length + " " +
            (indexes.length === 1 ? "imóvel" : "imóveis");
        const key = filtered.map((predio) => predio.name).join("|");
        if (indexes.length === 0) {
            /* Nenhum resultado: troca a grade pela mensagem de estado vazio. */
            if (listContainer.lastElementChild !== empty) {
                listContainer.lastElementChild.replaceWith(empty);
            }
        } else {
            const cards = indexes.map((index) => cardTemplates[index].cloneNode(true));
            if (key === previousKey && grid.parentElement) {
                /* Mesma chave da grade no React: os <article> são mantidos e só o conteúdo muda. */
                cards.forEach((card, index) => {
                    grid.children[index].innerHTML = card.innerHTML;
                });
            } else {
                /* Chave diferente: a grade é recriada e os cards repetem a animação de entrada. */
                grid.replaceChildren(...cards);
            }
            if (!grid.parentElement) {
                listContainer.lastElementChild.replaceWith(grid);
            }
            applyAssets(grid);
        }
        previousKey = key;
    }
    search.addEventListener("input", filter);
    price.addEventListener("change", filter);
    area.addEventListener("change", filter);
    /* O botão Conheça abre o imóvel da posição correspondente na lista filtrada. */
    bindConheca(grid, () => filtered);
}

/* ============================================================
   9. PÁGINA DO IMÓVEL (ImovelPage.tsx e PicturesDisplay.tsx)
   ============================================================ */

/* Preenche o título da galeria com o nome do imóvel escolhido (prop nome do PicturesDisplay). */
function fillImovel(container, predio) {
    container.querySelector('[data-field="name"]').textContent = predio.name;
}

/* Galeria (PicturesDisplay.tsx): cada foto mostra o alerta original "Ver mais fotos". */
function bindGallery() {
    pageContainer.firstElementChild.firstElementChild.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => alert("Ver mais fotos"));
    });
}

/* ============================================================
   10. INICIALIZAÇÃO
   ============================================================ */

/* Liga os eventos da página que acabou de ser exibida. */
function bindPage(page) {
    if (page === "initialPage") bindCarousel();
    if (page === "todosOsApartamentos") bindFilters();
    if (page === "imovelPage") bindGallery();
}
/* Botões que não têm evento no React (ex.: "Ver oportunidades") continuam sem ação. */
bindPage("initialPage");
