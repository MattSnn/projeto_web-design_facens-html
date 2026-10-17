"use strict";
/* script.js — comportamento do ImobiFaces sem framework.
   Traduz para JavaScript puro os estados (useState), efeitos (useEffect) e eventos
   dos componentes React do projeto original. O HTML fica em index.html e o CSS em style.css. */

/* ============================================================
   1. IMAGENS
   ============================================================ */

/* Endereço das imagens originais no GitHub, fixado no commit convertido.
   Assim a versão HTML não precisa de uma pasta de imagens própria. */
const ASSET_BASE = "https://raw.githubusercontent.com/MattSnn/projeto_web-design_facens/0547370f583f7f9d8d1abd83902d2f68fc76b54a/";

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
   - price: valor total na venda ou valor mensal no aluguel;
   - condoFee: condomínio por mês; iptu: IPTU por ano;
   - mainImg/images: nome do arquivo de imagem (ver originalAssets). */
const prediosLista = [
    {
        id: 0,
        name: "Residencial Jardim Aurora",
        mainImg: "predio-1.jpg",
        info: "2 dormitórios",
        area: "45m²",
        location: "São  Paulo",
        price: 325000,
        images: ["predio-1.jpg"],
        planta: "Planta de 45m²",
        description: "Apartamento compacto e bem aproveitado, perfeito para quem está comprando o primeiro imóvel. Ambientes integrados, boa iluminação natural e um condomínio com lazer completo a poucos passos do metrô.",
        status: "À venda",
        tag: "Compacto",
        address: "Rua das Acácias, 120",
        neighborhood: "Vila Mariana",
        bedrooms: 2,
        suites: 0,
        parking: 1,
        floor: 5,
        condoFee: 520,
        iptu: 1100,
        amenities: ["Piscina", "Academia", "Salão de festas", "Playground", "Segurança 24h", "Bicicletário"],
        nearby: [
            { label: "Escola", distance: "300m" },
            { label: "Mercado", distance: "150m" },
            { label: "Metrô", distance: "700m" }
        ]
    },
    {
        id: 1,
        name: "Edifício Central Park",
        mainImg: "predio-1.jpg",
        info: "3 dormitórios (1 suíte)",
        area: "80m²",
        location: "Campinas",
        price: 690000,
        images: ["predio-1.jpg"],
        planta: "Planta de 80m²",
        description: "Apartamento moderno no coração do Cambuí, com ambientes bem distribuídos e varanda integrada à sala. O prédio oferece coworking e academia, ideal para quem une moradia e rotina de trabalho.",
        status: "À venda",
        tag: "Moderno",
        address: "Av. Brasil, 845",
        neighborhood: "Cambuí",
        bedrooms: 3,
        suites: 1,
        parking: 2,
        floor: 9,
        condoFee: 890,
        iptu: 2400,
        amenities: ["Academia", "Piscina", "Coworking", "Segurança 24h", "Wi-Fi nas áreas comuns", "Pet friendly"],
        nearby: [
            { label: "Escola", distance: "500m" },
            { label: "Mercado", distance: "250m" },
            { label: "Shopping", distance: "1,2km" }
        ]
    },
    {
        id: 2,
        name: "Residencial Jardim Verde",
        mainImg: "predio-1.jpg",
        info: "3 dormitórios (1 suíte)",
        area: "70m²",
        location: "São Paulo",
        price: 540000,
        images: ["predio-1.jpg"],
        planta: "Planta de 70m²",
        description: "Apartamento espaçoso pensado para a família, em condomínio cercado de áreas verdes. Conta com churrasqueira, brinquedoteca e playground, e está a poucos metros de escola e mercado.",
        status: "À venda",
        tag: "Família",
        address: "Rua dos Ipês, 78",
        neighborhood: "Mooca",
        bedrooms: 3,
        suites: 1,
        parking: 2,
        floor: 7,
        condoFee: 760,
        iptu: 1900,
        amenities: ["Playground", "Churrasqueira", "Salão de festas", "Área verde", "Segurança 24h", "Brinquedoteca"],
        nearby: [
            { label: "Escola", distance: "200m" },
            { label: "Mercado", distance: "300m" },
            { label: "Parque", distance: "450m" }
        ]
    },
    {
        id: 3,
        name: "Edifício Praça Nova",
        mainImg: "predio-1.jpg",
        info: "3 dormitórios (1 suíte)",
        area: "80m²",
        location: "Campinas",
        price: 835000,
        images: ["predio-1.jpg"],
        planta: "Planta de 80m²",
        description: "Apartamento moderno no Taquaral, com acabamento refinado e sala ampla voltada para a área verde. Perto da Lagoa do Taquaral, é ótimo para quem gosta de caminhar e ter qualidade de vida no dia a dia.",
        status: "À venda",
        tag: "Alto padrão",
        address: "Rua Barão de Itapura, 410",
        neighborhood: "Taquaral",
        bedrooms: 3,
        suites: 1,
        parking: 2,
        floor: 12,
        condoFee: 1050,
        iptu: 2900,
        amenities: ["Academia", "Piscina", "Salão de festas", "Área verde", "Segurança 24h", "Pet friendly", "Wi-Fi nas áreas comuns", "Bicicletário"],
        nearby: [
            { label: "Escola", distance: "350m" },
            { label: "Mercado", distance: "200m" },
            { label: "Lagoa", distance: "600m" }
        ]
    },
    {
        id: 4,
        name: "Residencial Jardim dos Ipês",
        mainImg: "predio-1.jpg",
        info: "3 dormitórios (1 suíte)",
        area: "70m²",
        location: "São Paulo",
        price: 610000,
        images: ["predio-1.jpg"],
        planta: "Planta de 70m²",
        description: "Apartamento amplo, ideal para famílias que querem conforto sem abrir mão da praticidade. Fica perto do metrô e do comércio local, em um condomínio tranquilo e com ótima estrutura de lazer.",
        status: "À venda",
        tag: "Família",
        address: "Rua das Magnólias, 233",
        neighborhood: "Saúde",
        bedrooms: 3,
        suites: 1,
        parking: 2,
        floor: 6,
        condoFee: 800,
        iptu: 2100,
        amenities: ["Piscina", "Playground", "Churrasqueira", "Área verde", "Segurança 24h", "Salão de festas"],
        nearby: [
            { label: "Escola", distance: "250m" },
            { label: "Mercado", distance: "180m" },
            { label: "Metrô", distance: "500m" }
        ]
    },
    {
        id: 5,
        name: "Edifício Central Tower",
        mainImg: "predio-1.jpg",
        info: "4 dormitórios (3 suítes)",
        area: "120m²",
        location: "Campinas",
        price: 1250000,
        images: ["predio-1.jpg"],
        planta: "Planta de 120m²",
        description: "Apartamento de alto padrão em andar alto, com vista aberta e três suítes. Espaço de sobra para toda a família receber bem, em um prédio com lazer completo e segurança 24 horas.",
        status: "À venda",
        tag: "Alto padrão",
        address: "Av. Norte-Sul, 1500",
        neighborhood: "Cambuí",
        bedrooms: 4,
        suites: 3,
        parking: 3,
        floor: 18,
        condoFee: 1650,
        iptu: 5200,
        amenities: ["Academia", "Piscina", "Salão de festas", "Coworking", "Segurança 24h", "Área verde", "Pet friendly", "Wi-Fi nas áreas comuns"],
        nearby: [
            { label: "Escola", distance: "400m" },
            { label: "Mercado", distance: "300m" },
            { label: "Shopping", distance: "900m" }
        ]
    },
    {
        id: 6,
        name: "Boa Vista Towers",
        mainImg: "predio-1.jpg",
        info: "3 dormitórios (1 suíte)",
        area: "78m²",
        location: "São Paulo",
        price: 890000,
        images: ["predio-1.jpg"],
        planta: "Planta de 78m²",
        description: "O Boa Vista Towers é um empreendimento de alto padrão localizado no coração do Alto da Boa Vista. Com acabamentos premium, amplas janelas e vista panorâmica da cidade, este apartamento foi projetado para quem busca conforto, sofisticação e qualidade de vida. O empreendimento conta com estrutura completa de lazer e segurança, garantindo tranquilidade para toda a família.",
        status: "À venda",
        tag: "Alto padrão",
        address: "Rua das Palmeiras, 350",
        neighborhood: "Alto da Boa Vista",
        bedrooms: 3,
        suites: 1,
        parking: 2,
        floor: 14,
        condoFee: 980,
        iptu: 3200,
        amenities: ["Academia", "Piscina", "Segurança 24h", "Área verde", "Salão de festas", "Wi-Fi nas áreas comuns", "Pet friendly", "Bicicletário"],
        nearby: [
            { label: "Escola", distance: "400m" },
            { label: "Mercado", distance: "200m" },
            { label: "Metrô", distance: "600m" }
        ]
    },
    {
        id: 7,
        name: "Residencial Vista do Parque",
        mainImg: "predio-1.jpg",
        info: "2 dormitórios (1 suíte)",
        area: "62m²",
        location: "Sorocaba",
        price: 480000,
        images: ["predio-1.jpg"],
        planta: "Planta de 62m²",
        description: "Apartamento bem localizado no Campolim, com suíte, sacada e ótima ventilação. O condomínio tem lazer completo e fica a poucos minutos de parques, escolas e do comércio do bairro.",
        status: "À venda",
        tag: "Oportunidade",
        address: "Rua Arthur Gomes, 95",
        neighborhood: "Campolim",
        bedrooms: 2,
        suites: 1,
        parking: 1,
        floor: 8,
        condoFee: 610,
        iptu: 1500,
        amenities: ["Piscina", "Academia", "Playground", "Segurança 24h", "Pet friendly", "Área verde"],
        nearby: [
            { label: "Escola", distance: "350m" },
            { label: "Mercado", distance: "220m" },
            { label: "Parque", distance: "500m" }
        ]
    },
    {
        id: 8,
        name: "Studio Urbano 21",
        mainImg: "predio-1.jpg",
        info: "1 dormitório",
        area: "32m²",
        location: "São Paulo",
        price: 3200,
        images: ["predio-1.jpg"],
        planta: "Planta de 32m²",
        description: "Studio mobiliado e pronto para morar, em prédio com coworking e lavanderia compartilhada. Ideal para quem trabalha ou estuda na região e quer praticidade, com metrô e mercado praticamente na porta.",
        status: "Aluguel",
        tag: "Mobiliado",
        address: "Rua das Figueiras, 21",
        neighborhood: "Pinheiros",
        bedrooms: 1,
        suites: 0,
        parking: 1,
        floor: 11,
        condoFee: 650,
        iptu: 900,
        amenities: ["Academia", "Coworking", "Lavanderia", "Wi-Fi nas áreas comuns", "Segurança 24h", "Bicicletário"],
        nearby: [
            { label: "Metrô", distance: "250m" },
            { label: "Mercado", distance: "100m" },
            { label: "Praça", distance: "400m" }
        ]
    },
    {
        id: 9,
        name: "Edifício Alameda Real",
        mainImg: "predio-1.jpg",
        info: "3 dormitórios (1 suíte)",
        area: "95m²",
        location: "Campinas",
        price: 5800,
        images: ["predio-1.jpg"],
        planta: "Planta de 95m²",
        description: "Apartamento amplo para locação, em condomínio que aceita pets e tem área verde generosa. Cozinha planejada, três dormitórios e fácil acesso à Lagoa do Taquaral.",
        status: "Aluguel",
        tag: "Pet friendly",
        address: "Alameda das Rosas, 305",
        neighborhood: "Taquaral",
        bedrooms: 3,
        suites: 1,
        parking: 2,
        floor: 10,
        condoFee: 1200,
        iptu: 2600,
        amenities: ["Piscina", "Academia", "Pet friendly", "Salão de festas", "Segurança 24h", "Área verde"],
        nearby: [
            { label: "Escola", distance: "300m" },
            { label: "Mercado", distance: "200m" },
            { label: "Lagoa", distance: "800m" }
        ]
    },
    {
        id: 10,
        name: "Edifício Bosque Sul",
        mainImg: "predio-1.jpg",
        info: "2 dormitórios",
        area: "54m²",
        location: "Sorocaba",
        price: 2400,
        images: ["predio-1.jpg"],
        planta: "Planta de 54m²",
        description: "Apartamento de dois dormitórios em condomínio tranquilo, com churrasqueira e playground. Boa opção de locação para casais e pequenas famílias, perto de escola, mercado e transporte.",
        status: "Aluguel",
        tag: "Compacto",
        address: "Rua das Paineiras, 150",
        neighborhood: "Jardim Europa",
        bedrooms: 2,
        suites: 0,
        parking: 1,
        floor: 3,
        condoFee: 480,
        iptu: 800,
        amenities: ["Playground", "Churrasqueira", "Área verde", "Segurança 24h", "Salão de festas"],
        nearby: [
            { label: "Escola", distance: "200m" },
            { label: "Mercado", distance: "150m" },
            { label: "Terminal", distance: "700m" }
        ]
    },
    {
        id: 11,
        name: "Residencial Mirante do Lago",
        mainImg: "predio-1.jpg",
        info: "4 dormitórios (3 suítes)",
        area: "150m²",
        location: "Sorocaba",
        price: 1480000,
        images: ["predio-1.jpg"],
        planta: "Planta de 150m²",
        description: "Cobertura de alto padrão com terraço amplo e vista aberta para o lago. Quatro dormitórios, três suítes e quatro vagas, em um prédio com coworking, piscina e estrutura completa de lazer.",
        status: "À venda",
        tag: "Cobertura",
        address: "Rua do Mirante, 1800",
        neighborhood: "Campolim",
        bedrooms: 4,
        suites: 3,
        parking: 4,
        floor: 22,
        condoFee: 2100,
        iptu: 6800,
        amenities: ["Piscina", "Academia", "Salão de festas", "Coworking", "Segurança 24h", "Área verde", "Pet friendly", "Wi-Fi nas áreas comuns", "Bicicletário"],
        nearby: [
            { label: "Escola", distance: "500m" },
            { label: "Mercado", distance: "400m" },
            { label: "Shopping", distance: "1,5km" }
        ]
    },
    {
        id: 12,
        name: "Terraço Santos",
        mainImg: "predio-1.jpg",
        info: "3 dormitórios (1 suíte)",
        area: "88m²",
        location: "Santos",
        price: 760000,
        images: ["predio-1.jpg"],
        planta: "Planta de 88m²",
        description: "Apartamento a poucos passos da praia, com varanda e vista para o mar. Três dormitórios bem distribuídos e condomínio com piscina e academia, perfeito para morar ou como imóvel de temporada.",
        status: "À venda",
        tag: "Vista mar",
        address: "Rua da Orla, 400",
        neighborhood: "Gonzaga",
        bedrooms: 3,
        suites: 1,
        parking: 2,
        floor: 13,
        condoFee: 1100,
        iptu: 2700,
        amenities: ["Piscina", "Academia", "Salão de festas", "Segurança 24h", "Bicicletário", "Pet friendly"],
        nearby: [
            { label: "Praia", distance: "300m" },
            { label: "Mercado", distance: "200m" },
            { label: "Escola", distance: "450m" }
        ]
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
        { id: "fotos", label: "Fotos" },
        { id: "sobre", label: "Sobre" },
        { id: "calculadora", label: "Calculadora" },
        { id: "localizacao", label: "Localização" },
        { id: "planta", label: "Planta" }
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
   9. PÁGINA DO IMÓVEL (ImovelPage.tsx e ImovelDetails.tsx)
   ============================================================ */

/* Preenche o template de detalhes com os dados do imóvel escolhido. Os textos seguem
   exatamente o JSX original (ícones, separadores e unidades) e são inseridos como nós de
   texto separados, como o React faz com {valor}, para a renderização ser idêntica. */
function fillImovel(container, predio) {
    const field = (name) => container.querySelector('[data-field="' + name + '"]');
    field("status").textContent = predio.status;
    field("tag").textContent = predio.tag;
    field("name").textContent = predio.name;
    field("address").replaceChildren("📍", predio.address, " — ", predio.neighborhood, " - ", predio.location);
    field("bedrooms").replaceChildren("🛏", String(predio.bedrooms), " Quartos");
    field("area").replaceChildren("◎", predio.area);
    field("parking").replaceChildren("🅿", String(predio.parking), " Vagas");
    field("floor").replaceChildren("🏢", String(predio.floor), "º Andar");
    field("description").textContent = predio.description;
    fillList(container, "amenities", predio.amenities.map((amenite) => [amenite]));
    fillList(container, "nearby", predio.nearby.map((item) => [item.label, " — ", item.distance]));
    fillPriceCard(container.querySelector("aside"), predio);
}

/* Repete o <li> modelo do template para cada item da lista (equivale ao .map do JSX).
   Cada item recebe uma lista de textos, inseridos como nós de texto separados. */
function fillList(container, name, items) {
    const list = container.querySelector('[data-list="' + name + '"]');
    const model = list.firstElementChild;
    list.replaceChildren(...items.map((texts) => {
        const item = model.cloneNode(false);
        item.append(...texts);
        return item;
    }));
}

/* Galeria (PicturesDisplay.tsx): cada foto mostra o alerta original "Ver mais fotos". */
function bindGallery() {
    pageContainer.querySelectorAll("#fotos button").forEach((button) => {
        button.addEventListener("click", () => alert("Ver mais fotos"));
    });
}

/* ============================================================
   10. CARD DE PREÇO E SIMULADOR DE FINANCIAMENTO (PriceCard.tsx)
   ============================================================ */

/* Moeda em reais, sem centavos, igual ao Intl.NumberFormat do original. */
const brl = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
});

/* Tabela Price: todas as parcelas têm o mesmo valor.
   PMT = financiado * i / (1 - (1 + i)^-meses), onde i é a taxa mensal equivalente à anual. */
function calcParcela(financiado, taxaAnual, meses) {
    if (financiado <= 0 || meses <= 0) return 0;
    const i = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
    if (i === 0) return financiado / meses;
    return (financiado * i) / (1 - Math.pow(1 + i, -meses));
}

/* Card de preço: venda mostra a parcela e o simulador; aluguel mostra o custo mensal total. */
function fillPriceCard(card, predio) {
    const field = (name) => card.querySelector('[data-field="' + name + '"]');
    const isAluguel = predio.status === "Aluguel";
    const toggle = field("toggle");
    const simulator = field("simulator");
    const note = field("note");

    /* Estados do PriceCard (useState): simulador fechado, 20% de entrada, 30 anos e 10,5% ao ano. */
    let mostrarSimulador = false;
    let entradaPct = 20;
    let anos = 30;
    let taxaAnual = 10.5;
    simulator.remove();

    field("label").textContent = isAluguel ? "Aluguel" : "Valor";
    field("price").prepend(brl.format(predio.price));
    if (!isAluguel) field("perMonth").remove();
    field("condoFee").textContent = brl.format(predio.condoFee) + "/mês";
    field("iptu").textContent = brl.format(predio.iptu) + "/ano";
    field("areaUtil").textContent = predio.area;

    if (isAluguel) {
        /* Aluguel: soma aluguel, condomínio e 1/12 do IPTU anual; não há simulador. */
        const totalMensal = predio.price + predio.condoFee + predio.iptu / 12;
        note.textContent = brl.format(totalMensal) + "/mês com condomínio e IPTU";
        toggle.remove();
        return;
    }

    /* O simulador fica fora da página enquanto está fechado, por isso é consultado diretamente. */
    const simField = (name) => simulator.querySelector('[data-field="' + name + '"]');
    const range = simulator.querySelector('input[type="range"]');
    const select = simulator.querySelector("select");
    const juros = simulator.querySelector('input[type="number"]');

    /* Recalcula entrada, valor financiado e parcela, e atualiza todos os textos. */
    function render() {
        const entrada = predio.price * (entradaPct / 100);
        const financiado = predio.price - entrada;
        const parcela = calcParcela(financiado, taxaAnual, anos * 12);
        note.textContent = "ou " + brl.format(parcela) + "/mês no financiamento";
        toggle.textContent = mostrarSimulador ? "Fechar simulador" : "Simular financiamento";
        simField("entrada").replaceChildren(String(entradaPct), "% · ", brl.format(entrada));
        simField("parcela").textContent = brl.format(parcela);
        simField("financiado").replaceChildren(brl.format(financiado), " financiados em ", String(anos * 12), " meses");
    }

    /* Botão "Simular financiamento" / "Fechar simulador": mostra ou esconde a calculadora. */
    toggle.addEventListener("click", () => {
        mostrarSimulador = !mostrarSimulador;
        if (mostrarSimulador) {
            toggle.after(simulator);
        } else {
            simulator.remove();
        }
        render();
    });
    /* Entrada: controle deslizante de 10% a 80%, de 5 em 5. */
    range.addEventListener("input", () => {
        entradaPct = Number(range.value);
        render();
    });
    /* Prazo: 10 a 35 anos. */
    select.addEventListener("change", () => {
        anos = Number(select.value);
        render();
    });
    /* Juros ao ano: campo vazio ou inválido vale 0, como Number(e.target.value) || 0 no original. */
    juros.addEventListener("input", () => {
        taxaAnual = Number(juros.value) || 0;
        if (taxaAnual === 0 && juros.value === "") {
            juros.value = "0";
        }
        render();
    });
    render();
}

/* ============================================================
   11. INICIALIZAÇÃO
   ============================================================ */

/* Liga os eventos da página que acabou de ser exibida. */
function bindPage(page) {
    if (page === "initialPage") bindCarousel();
    if (page === "todosOsApartamentos") bindFilters();
    if (page === "imovelPage") bindGallery();
}
/* Botões que não têm evento no React (ex.: "Ver oportunidades") continuam sem ação. */
bindPage("initialPage");
