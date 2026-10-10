"use strict";
/* Referências às imagens originais, sem compressão ou redimensionamento.
   As URLs apontam para o commit original e dispensam uma pasta de assets. */
const originalAssets = {
    "predio-1.jpg": "https://raw.githubusercontent.com/MattSnn/projeto_web-design_facens/304fcf025c77bcca0e588eb71322d947de499bfa/src/components/assets/predio-1.jpg",
    "buildings.png": "https://raw.githubusercontent.com/MattSnn/projeto_web-design_facens/304fcf025c77bcca0e588eb71322d947de499bfa/src/components/assets/buildings.png",
    "casa-card-1.jpg": "https://raw.githubusercontent.com/MattSnn/projeto_web-design_facens/304fcf025c77bcca0e588eb71322d947de499bfa/src/components/assets/casa-card-1.jpg",
    "FamiliasAtendidas.jpg": "https://raw.githubusercontent.com/MattSnn/projeto_web-design_facens/304fcf025c77bcca0e588eb71322d947de499bfa/src/components/assets/FamiliasAtendidas.jpg",
    "ImobiFacens.jpg": "https://raw.githubusercontent.com/MattSnn/projeto_web-design_facens/304fcf025c77bcca0e588eb71322d947de499bfa/src/components/assets/ImobiFacens.jpg",
    "corretor.png": "https://raw.githubusercontent.com/MattSnn/projeto_web-design_facens/304fcf025c77bcca0e588eb71322d947de499bfa/src/components/assets/corretor.png",
    "favicon.svg": "https://raw.githubusercontent.com/MattSnn/projeto_web-design_facens/304fcf025c77bcca0e588eb71322d947de499bfa/public/favicon.svg"
};
/* Dados originais usados nos mesmos limites de filtragem de AptoPage.tsx. */
const properties = [
    {
        "name": "Residencial Jardim",
        "img": "/src/components/assets/predio-1.jpg",
        "info": "Apartamento bonito e confortável",
        "area": "45m²",
        "location": "São Paulo",
        "price": 325000
    },
    {
        "name": "Edifício Central",
        "img": "/src/components/assets/predio-1.jpg",
        "info": "Apartamento moderno",
        "area": "80m²",
        "location": "Campinas",
        "price": 690000
    },
    {
        "name": "Residencial Jardim",
        "img": "/src/components/assets/predio-1.jpg",
        "info": "Apartamento bonito e confortável",
        "area": "70m²",
        "location": "São Paulo",
        "price": 540000
    },
    {
        "name": "Edifício Central",
        "img": "/src/components/assets/predio-1.jpg",
        "info": "Apartamento moderno",
        "area": "80m²",
        "location": "Campinas",
        "price": 835000
    },
    {
        "name": "Residencial Jardim",
        "img": "/src/components/assets/predio-1.jpg",
        "info": "Apartamento bonito e confortável",
        "area": "70m²",
        "location": "São Paulo",
        "price": 610000
    },
    {
        "name": "Edifício Central",
        "img": "/src/components/assets/predio-1.jpg",
        "info": "Apartamento moderno",
        "area": "120m²",
        "location": "Campinas",
        "price": 1250000
    }
];

/* Aplique os mesmos arquivos de imagem às tags e aos fundos originais. */
function applyAssets(container) {
    container.querySelectorAll("[data-asset]").forEach((image) => {
        image.src = originalAssets[image.dataset.asset];
    });
}
Object.entries(originalAssets).forEach(([name, uri]) => {
    document.documentElement.style.setProperty(
        "--asset-" + name.replaceAll(".", "-"),
        'url("' + uri + '")'
    );
});
document.getElementById("favicon").href = originalAssets["favicon.svg"];
applyAssets(document);

/* App conserva a página inicial e o mesmo contêiner com padding superior. */
const app = document.getElementById("root").firstElementChild;
const navigation = app.firstElementChild;
const pageContainer = app.lastElementChild;
const nav = navigation.querySelector("nav");
const menuButton = nav.querySelector("button");
const overlay = navigation.children[1];
const drawer = navigation.querySelector("aside");
let isOpen = false;
let activePage = "home";

/* Equivalente a setIsOpen e ao useEffect que controla a rolagem do body. */
function setMenu(open) {
    isOpen = open;
    overlay.classList.toggle("opacity-100", open);
    overlay.classList.toggle("opacity-0", !open);
    overlay.classList.toggle("pointer-events-none", !open);
    drawer.classList.toggle("translate-x-0", open);
    drawer.classList.toggle("translate-x-full", !open);
    drawer.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
}
menuButton.addEventListener("click", () => setMenu(!isOpen));
overlay.addEventListener("click", () => setMenu(false));

/* Mesmos IDs e rótulos de navBarLinks, sem acrescentar novas abas. */
const navLinks = {
    home: [
        { id: "inicio", label: "Início" },
        { id: "oportunidades", label: "Oportunidades" },
        { id: "contato", label: "contato" }
    ],
    other: [
        { id: "alugar", label: "Alugar" },
        { id: "comprar", label: "Comprar" },
        { id: "contato", label: "contato" }
    ]
};
function updateNav(page) {
    const links = page === "home" ? navLinks.home : navLinks.other;
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

/* A troca de página conserva a navbar e substitui somente seu conteúdo. */
function showPage(page) {
    if (page === activePage) return;
    activePage = page;
    const template = document.getElementById("template-" + page);
    pageContainer.replaceChildren(template.content.cloneNode(true));
    updateNav(page);
    applyAssets(pageContainer);
    bindPage(page);
}
const pageLinks = drawer.children[1].querySelectorAll("a");
pageLinks[0].addEventListener("click", (event) => {
    event.preventDefault();
    showPage("home");
    setMenu(false);
});
pageLinks[1].addEventListener("click", (event) => {
    event.preventDefault();
    showPage("catalog");
    setMenu(false);
});

/* Carrossel: passo de 300px e os mesmos limites para retornar às extremidades. */
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
}

/* As comparações são idênticas às de AptoPage: nome, preço e metragem. */
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

/* CardsList mantém sua estrutura original; não ganha preço nem botão funcional. */
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
    let previousKey = properties.map((property) => property.name).join("|");

    function filter() {
        const indexes = properties.map((_, index) => index).filter((index) =>
            matchesProperty(properties[index], search.value, price.value, area.value)
        );
        count.textContent = indexes.length + " " +
            (indexes.length === 1 ? "imóvel" : "imóveis");
        const key = indexes.map((index) => properties[index].name).join("|");
        if (indexes.length === 0) {
            if (listContainer.lastElementChild !== empty) {
                listContainer.lastElementChild.replaceWith(empty);
            }
        } else {
            const cards = indexes.map((index) => cardTemplates[index].cloneNode(true));
            if (key === previousKey && grid.parentElement) {
                /* Mantém os artigos quando a chave React original permanece igual. */
                cards.forEach((card, index) => {
                    grid.children[index].innerHTML = card.innerHTML;
                });
            } else {
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
}

/* ImovelPage preserva o alerta original, sem adicionar modal ou navegação. */
function bindGallery() {
    pageContainer.querySelectorAll("button").forEach((button) => {
        button.addEventListener("click", () => alert("Ver mais fotos"));
    });
}
function bindPage(page) {
    if (page === "home") bindCarousel();
    if (page === "catalog") bindFilters();
    if (page === "detail") bindGallery();
}
/* As ações sem handler no React continuam sem handler nesta conversão. */
bindPage("home");
