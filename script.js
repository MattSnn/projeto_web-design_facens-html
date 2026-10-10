/*
 * ImobiFaces — JavaScript nativo.
 * Este arquivo substitui o estado e os componentes interativos do React.
 * Não usa imports, frameworks, bibliotecas ou etapas de compilação.
 */
'use strict';

// Os seis registros do catálogo mantêm nomes, valores, áreas e cidades originais.
const catalogProperties = [
    {
        id: 'jardim-45',
        name: 'Residencial Jardim',
        description: 'Apartamento bonito e confortável',
        area: 45,
        location: 'São Paulo',
        price: 325000,
        info: 'Apartamento bonito e confortável'
    },
    {
        id: 'central-690',
        name: 'Edifício Central',
        description: 'Apartamento moderno',
        area: 80,
        location: 'Campinas',
        price: 690000,
        info: 'Apartamento moderno'
    },
    {
        id: 'jardim-70',
        name: 'Residencial Jardim',
        description: 'Apartamento bonito e confortável',
        area: 70,
        location: 'São Paulo',
        price: 540000,
        info: 'Apartamento bonito e confortável'
    },
    {
        id: 'central-835',
        name: 'Edifício Central',
        description: 'Apartamento moderno',
        area: 80,
        location: 'Campinas',
        price: 835000,
        info: 'Apartamento moderno'
    },
    {
        id: 'jardim-610',
        name: 'Residencial Jardim',
        description: 'Apartamento bonito e confortável',
        area: 70,
        location: 'São Paulo',
        price: 610000,
        info: 'Apartamento bonito e confortável'
    },
    {
        id: 'central-120',
        name: 'Edifício Central',
        description: 'Apartamento moderno',
        area: 120,
        location: 'Campinas',
        price: 1250000,
        info: 'Apartamento moderno'
    }
];

// Os destaques são extraídos dos cards estáticos para evitar duplicar o conteúdo.
const featuredProperties = Array.from(document.querySelectorAll('#featured-track .featured-card')).map(card => {
    const facts = card.querySelectorAll('.property-facts li span:last-child');
    return {
        id: card.querySelector('.card-link').hash.split('/')[1],
        name: card.querySelector('h3').textContent,
        location: card.querySelector('.card-location').textContent,
        info: facts[0].textContent,
        areaLabel: facts[1].textContent,
        description: 'Empreendimento em destaque da ImobiFaces. Consulte a equipe para conhecer as opções de plantas e saber mais sobre este endereço.'
    };
});

// Referências de elementos usadas pelos eventos e pela renderização.
const homeView = document.querySelector('#home-view');
const catalogView = document.querySelector('#catalog-view');
const detailView = document.querySelector('#detail-view');
const filterForm = document.querySelector('#filter-form');
const searchInput = document.querySelector('#search');
const priceFilter = document.querySelector('#price-filter');
const areaFilter = document.querySelector('#area-filter');
const sortFilter = document.querySelector('#sort-filter');
const catalogGrid = document.querySelector('#catalog-grid');
const resultsCount = document.querySelector('#results-count');
const emptyState = document.querySelector('#empty-state');
const menuDialog = document.querySelector('#menu-dialog');
const photoDialog = document.querySelector('#photo-dialog');
const track = document.querySelector('#featured-track');
const moneyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
});

// Ignora maiúsculas e acentos na busca: "sao" também encontra "São".
function normalizeText(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase('pt-BR')
        .trim();
}

// Um único formatador mantém todos os preços no padrão brasileiro.
function formatMoney(value) {
    return moneyFormatter.format(value);
}

// Aplica os limites de preço sem deixar lacunas entre as faixas.
function matchesPrice(property, selected) {
    switch (selected) {
        case 'low':
            return property.price <= 500000;
        case 'middle':
            return property.price > 500000 && property.price <= 1000000;
        case 'high':
            return property.price > 1000000;
        default:
            return true;
    }
}

// Os valores numéricos dispensam parseInt e comparações de strings.
function matchesArea(property, selected) {
    switch (selected) {
        case 'small':
            return property.area < 50;
        case 'medium':
            return property.area >= 50 && property.area <= 100;
        case 'large':
            return property.area > 100;
        default:
            return true;
    }
}

// Filtra uma cópia dos dados, preservando a ordem original do catálogo.
function getFilteredProperties() {
    const search = normalizeText(searchInput.value);
    const properties = catalogProperties.filter(property => {
        const searchableText = normalizeText(`${property.name} ${property.location}`);
        return searchableText.includes(search)
            && matchesPrice(property, priceFilter.value)
            && matchesArea(property, areaFilter.value);
    });

    // Ordenações são opcionais e sempre aplicadas depois dos filtros.
    switch (sortFilter.value) {
        case 'price-asc':
            properties.sort((first, second) => first.price - second.price);
            break;
        case 'price-desc':
            properties.sort((first, second) => second.price - first.price);
            break;
        case 'area-asc':
            properties.sort((first, second) => first.area - second.area);
            break;
    }
    return properties;
}

// Cria nós com textContent: o texto não é interpretado como código HTML.
function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (text !== undefined) {
        element.textContent = text;
    }
    return element;
}

// Constrói um card sem depender de JSX ou de strings HTML interpoladas.
function createPropertyCard(property) {
    const card = createElement('article', 'featured-card');
    const image = createElement('div', 'property-photo photo-building');
    image.setAttribute('role', 'img');
    image.setAttribute('aria-label', `Foto ilustrativa do ${property.name}`);
    image.append(createElement('span', 'photo-tag', 'Apartamento'));

    const body = createElement('div', 'featured-body');
    body.append(createElement('p', 'card-location', property.location));
    body.append(createElement('h3', '', property.name));

    const facts = createElement('ul', 'property-facts');
    facts.append(createElement('li', '', property.info));
    facts.append(createElement('li', '', `${property.area} m² de área`));
    body.append(facts);
    body.append(createElement('p', 'card-price', formatMoney(property.price)));

    const link = createElement('a', 'card-link', 'Conheça o imóvel');
    link.href = `#imovel/${property.id}`;
    const arrow = createElement('span', '', '→');
    arrow.setAttribute('aria-hidden', 'true');
    link.append(arrow);
    body.append(link);
    card.append(image, body);
    return card;
}

// Fragmentos inserem os cards de uma só vez e atualizam o estado vazio.
function renderCatalog() {
    const properties = getFilteredProperties();
    const fragment = document.createDocumentFragment();
    properties.forEach(property => fragment.append(createPropertyCard(property)));
    catalogGrid.replaceChildren(fragment);
    resultsCount.textContent = `${properties.length} ${properties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}`;
    emptyState.hidden = properties.length > 0;
}

// Limpa campos e imediatamente restaura todos os registros do catálogo.
function resetFilters() {
    filterForm.reset();
    renderCatalog();
    searchInput.focus();
}

// O detalhe é preenchido tanto para destaques quanto para o catálogo.
function renderDetail(property) {
    document.querySelector('#detail-name').textContent = property.name;
    document.querySelector('#detail-location').textContent = property.location;
    document.querySelector('#detail-description').textContent = property.description;
    document.querySelector('#detail-price').textContent = property.price === undefined
        ? 'Consulte a equipe'
        : formatMoney(property.price);

    const facts = document.querySelector('#detail-facts');
    facts.replaceChildren(
        createElement('li', '', property.info),
        createElement('li', '', property.areaLabel || `${property.area} m²`),
        createElement('li', '', property.location)
    );

    // O assunto codificado evita que acentos e espaços quebrem o endereço.
    const subject = encodeURIComponent(`Interesse no imóvel: ${property.name}`);
    const body = encodeURIComponent(`Olá! Gostaria de mais informações sobre ${property.name}, em ${property.location}. Código: ${property.id}.`);
    document.querySelector('#detail-contact').href = `mailto:imobifaces@gmail.com?subject=${subject}&body=${body}`;
}

// Troca somente as três telas; contato, FAQ e rodapé são compartilhados.
function showView(view) {
    homeView.hidden = view !== homeView;
    catalogView.hidden = view !== catalogView;
    detailView.hidden = view !== detailView;
}

// Hashes funcionam em arquivos locais e em hospedagens sem regras de servidor.
function handleRoute() {
    const route = window.location.hash || '#inicio';
    if (route === '#catalogo') {
        showView(catalogView);
        renderCatalog();
        document.title = 'Todos os imóveis | ImobiFaces';
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
    }

    if (route.startsWith('#imovel/')) {
        const id = route.slice('#imovel/'.length);
        const property = [...catalogProperties, ...featuredProperties].find(item => item.id === id);
        if (!property) {
            // Substitui uma rota inválida por uma tela existente.
            window.location.replace('#catalogo');
            return;
        }
        renderDetail(property);
        showView(detailView);
        document.title = `${property.name} | ImobiFaces`;
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
    }

    showView(homeView);
    document.title = 'ImobiFaces | Encontre seu próximo lar';
    // Aguarda o layout da tela antes de localizar a âncora solicitada.
    requestAnimationFrame(() => {
        const target = document.getElementById(route.slice(1));
        (target || document.querySelector('#inicio')).scrollIntoView();
    });
}

// Carrossel circular: nas extremidades, a seta retorna ao lado oposto.
function scrollCarousel(direction) {
    const maximum = track.scrollWidth - track.clientWidth;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior = reducedMotion ? 'instant' : 'smooth';
    const card = track.querySelector('.featured-card');
    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const distance = card.getBoundingClientRect().width + gap;
    if (direction > 0 && track.scrollLeft >= maximum - 5) {
        track.scrollTo({ left: 0, behavior });
    } else if (direction < 0 && track.scrollLeft <= 5) {
        track.scrollTo({ left: maximum, behavior });
    } else {
        track.scrollBy({ left: direction * distance, behavior });
    }
}

// O diálogo nativo restaura o foco ao botão que o abriu.
document.querySelector('.menu-toggle').addEventListener('click', () => {
    menuDialog.showModal();
});
document.querySelector('[data-close-menu]').addEventListener('click', () => {
    menuDialog.close();
});
menuDialog.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => menuDialog.close());
});

// Fechamento ao clicar fora da área de conteúdo dos diálogos.
function closeOnBackdrop(event) {
    if (event.target !== event.currentTarget) {
        return;
    }
    const rectangle = event.currentTarget.getBoundingClientRect();
    const outside = event.clientX < rectangle.left
        || event.clientX > rectangle.right
        || event.clientY < rectangle.top
        || event.clientY > rectangle.bottom;
    if (outside) {
        event.currentTarget.close();
    }
}
menuDialog.addEventListener('click', closeOnBackdrop);
photoDialog.addEventListener('click', closeOnBackdrop);

// Busca reage à digitação; selects reagem à escolha do usuário.
searchInput.addEventListener('input', renderCatalog);
[priceFilter, areaFilter, sortFilter].forEach(select => {
    select.addEventListener('change', renderCatalog);
});
filterForm.addEventListener('submit', event => event.preventDefault());
filterForm.addEventListener('reset', () => {
    // reset ocorre antes de os valores padrão serem restaurados pelo navegador.
    requestAnimationFrame(renderCatalog);
});
document.querySelector('#clear-empty').addEventListener('click', resetFilters);
document.querySelector('#carousel-prev').addEventListener('click', () => scrollCarousel(-1));
document.querySelector('#carousel-next').addEventListener('click', () => scrollCarousel(1));

// Galeria usa as mesmas imagens incorporadas no CSS, sem baixar novos arquivos.
document.querySelectorAll('[data-gallery]').forEach(button => {
    button.addEventListener('click', () => {
        const image = document.querySelector('#lightbox-image');
        const isBuilding = button.dataset.gallery === 'building';
        image.className = `lightbox-image photo-${isBuilding ? 'building' : 'house'}`;
        const caption = isBuilding ? 'Foto ilustrativa do edifício' : 'Foto ilustrativa do imóvel';
        image.setAttribute('aria-label', caption);
        document.querySelector('#photo-caption').textContent = caption;
        photoDialog.showModal();
    });
});
document.querySelector('#close-photo').addEventListener('click', () => photoDialog.close());

// Inicialização: respeita uma URL já apontando para catálogo ou imóvel.
window.addEventListener('hashchange', handleRoute);
renderCatalog();
handleRoute();
