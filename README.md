# ImobiFaces — versão em HTML, CSS e JavaScript

Site imobiliário acadêmico desenvolvido na disciplina de Web Design (FACENS, turma CATIN1).
Este repositório é a versão sem framework do projeto original
[projeto_web-design_facens](https://github.com/MattSnn/projeto_web-design_facens),
que é desenvolvido com **Vite, React, TypeScript e Tailwind CSS**.

O site funciona com apenas três arquivos: `index.html`, `style.css` e `script.js`.
O CSS e o JavaScript são externos ao HTML:

```html
<link rel="stylesheet" href="style.css" />
<script src="script.js" defer></script>
```

## Como executar

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` no navegador (não é preciso instalar nada).
3. Mantenha a conexão com a internet: as imagens são carregadas do repositório original.

## Arquivos do projeto

| Arquivo | Conteúdo | Linhas |
| --- | --- | --- |
| `index.html` | Estrutura das páginas e templates, com comentários por seção | 2.006 |
| `style.css` | Estilos compilados do original, expandidos e comentados regra a regra | 2.395 |
| `script.js` | Dados dos imóveis e todas as interações do site | 808 |
| `README.md` | Esta documentação | — |

## Relação com o projeto original

O professor orientou a equipe a continuar o desenvolvimento com Vite, React e Tailwind CSS.
Como o React divide o HTML em componentes e o Tailwind usa classes utilitárias, esta versão
concentra o mesmo site em três arquivos para atender aos requisitos da atividade.

A conversão foi feita com auxílio de inteligência artificial e segue uma regra simples:
**nada é inventado aqui**. Toda funcionalidade desta versão existe no projeto original;
quando o original muda, a mudança é convertida para cá.

- O HTML foi gerado a partir dos próprios componentes React (renderização estática).
- O CSS é o mesmo que o Tailwind gera para o original, apenas expandido e comentado.
- O JavaScript traduz os estados (`useState`), efeitos (`useEffect`) e eventos do React.

## Funcionalidades em JavaScript

### 1. Menu lateral

- O botão de três linhas abre e fecha a gaveta lateral.
- O fundo escuro (overlay) aparece com o menu aberto e fecha o menu ao ser clicado.
- Enquanto o menu está aberto, a rolagem da página fica bloqueada.
- Funções: `setMenu(open)`.

### 2. Navegação entre páginas

- O site tem três páginas: inicial, todos os apartamentos e página do imóvel.
- A navbar fica fixa; somente o conteúdo da página é trocado, como no `App.tsx`.
- As outras páginas ficam em tags `<template>` e são copiadas quando abertas.
- Os links da navbar mudam conforme a página (ex.: Fotos, Sobre, Calculadora...).
- Funções: `showPage(page)`, `updateNav(page)`.

### 3. Carrossel de imóveis em destaque

- As setas deslocam o carrossel em 300px com rolagem suave.
- No fim da lista, a seta "→" volta ao início; no início, a seta "←" vai ao final.
- Cada card mostra os detalhes ao passar o mouse.
- Função: `bindCarousel()`.

### 4. Busca e filtros do catálogo

- Busca por nome, sem diferenciar maiúsculas e minúsculas.
- Filtro de metragem: até 50m², de 50m² a 100m² e acima de 100m².
- Filtro de preço: até R$ 500.000, de R$ 500.000 a R$ 1.000.000 e acima disso.
- O contador mostra "N imóveis" (ou "1 imóvel") e é anunciado por leitores de tela.
- Sem resultados, aparece a mensagem "Nenhum imóvel encontrado".
- Funções: `matchesProperty()`, `bindFilters()`.

### 5. Botão "Conheça"

- Nos cards do carrossel e do catálogo, abre a página de detalhes daquele imóvel.
- No catálogo filtrado, abre o imóvel correto da lista filtrada.
- Funções: `bindConheca()`, `navigateToImovelPage(imovel)`.

### 6. Página do imóvel

- Preenche status (À venda ou Aluguel), selo, nome e endereço.
- Mostra quartos, área, vagas e andar.
- Exibe a descrição, as comodidades do condomínio e os lugares próximos.
- Funções: `fillImovel()`, `fillList()`.

### 7. Galeria de fotos

- A foto principal e as miniaturas mostram o alerta "Ver mais fotos", como no original.
- Função: `bindGallery()`.

### 8. Card de preço

- Venda: mostra o valor e a parcela estimada no financiamento.
- Aluguel: mostra o valor mensal e o custo total com condomínio e IPTU.
- Lista condomínio por mês, IPTU por ano e área útil.
- Valores formatados em reais com `Intl.NumberFormat`.
- Função: `fillPriceCard()`.

### 9. Simulador de financiamento

- Aparece nos imóveis à venda pelo botão "Simular financiamento".
- Entrada de 10% a 80% (controle deslizante), prazo de 10 a 35 anos e juros ao ano.
- Calcula a parcela pela tabela Price: `PMT = financiado × i / (1 − (1 + i)^−meses)`.
- A taxa anual é convertida na taxa mensal equivalente: `i = (1 + taxa)^(1/12) − 1`.
- Ao fechar e abrir de novo, os valores escolhidos são mantidos.
- Funções: `calcParcela()`, `fillPriceCard()`.

### 10. Imagens do projeto original

- As imagens são carregadas do repositório original, fixadas no commit convertido.
- Fotos usam `data-asset`; fundos usam variáveis CSS `--asset-...`.
- Função: `applyAssets(container)`.

## Imóveis cadastrados

| Imóvel | Status | Local | Área | Preço (R$) |
| --- | --- | --- | --- | --- |
| Residencial Jardim Aurora | À venda | Vila Mariana - São Paulo | 45m² | 325.000 |
| Edifício Central Park | À venda | Cambuí - Campinas | 80m² | 690.000 |
| Residencial Jardim Verde | À venda | Mooca - São Paulo | 70m² | 540.000 |
| Edifício Praça Nova | À venda | Taquaral - Campinas | 80m² | 835.000 |
| Residencial Jardim dos Ipês | À venda | Saúde - São Paulo | 70m² | 610.000 |
| Edifício Central Tower | À venda | Cambuí - Campinas | 120m² | 1.250.000 |
| Boa Vista Towers | À venda | Alto da Boa Vista - São Paulo | 78m² | 890.000 |
| Residencial Vista do Parque | À venda | Campolim - Sorocaba | 62m² | 480.000 |
| Studio Urbano 21 | Aluguel | Pinheiros - São Paulo | 32m² | 3.200/mês |
| Edifício Alameda Real | Aluguel | Taquaral - Campinas | 95m² | 5.800/mês |
| Edifício Bosque Sul | Aluguel | Jardim Europa - Sorocaba | 54m² | 2.400/mês |
| Residencial Mirante do Lago | À venda | Campolim - Sorocaba | 150m² | 1.480.000 |
| Terraço Santos | À venda | Gonzaga - Santos | 88m² | 760.000 |

## CSS

- Organizado nas camadas `theme`, `base`, `components` e `utilities`, como no original.
- Cores da marca definidas como variáveis (ex.: `--color-brand-muted: #2563eb`).
- Responsivo com media queries: `md` a partir de 48rem (768px) e `lg` a partir de 64rem (1024px).
- Usa Flexbox e Grid para organizar navbar, cards, filtros, catálogo e página do imóvel.
- Cada bloco de regras tem um comentário explicando o que ele faz.

## Comentários no código

- `index.html`: comentários em cada seção (navbar, hero, carrossel, filtros, cards, preço...).
- `style.css`: um comentário por regra, camada e media query.
- `script.js`: dividido em 11 partes numeradas, com comentários em cada função.

## Verificação

- A versão HTML foi comparada automaticamente com o original React no navegador (Playwright).
- Foram executadas as mesmas ações nos dois sites: menu, troca de páginas, 64 combinações
  de filtros, botão Conheça em todos os imóveis e o simulador (entrada, prazo e juros).
- O HTML resultante foi igual em todas as 239 comparações da versão atual.
- Capturas de tela em desktop (1440px) e celular (390px) ficaram idênticas pixel a pixel.

## Adaptação em relação ao original

- No original, as opções dos filtros ficam dentro de um `<div>` no `<select>`, o que não é
  HTML válido. Aqui, a classe do `<div>` foi aplicada em cada `<option>`.

## Histórico de versões

- `7191566` a `3a311a5`: primeira conversão (commit `304fcf0` do original).
- `a3b5c66`: lista de imóveis no novo formato e botão Conheça (original `5cbcdd9`).
- `25fd0d7`: página de detalhes do imóvel e 13 imóveis (original `a4aa705`).
- `7cdafa7`: card de preço e simulador de financiamento (original `0547370`).

## Equipe

- Mateus Sonnenberg
- Pedro Wagner
- Rodrigo Vieira
- Jhonny Walter
