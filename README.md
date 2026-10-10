# ImobiFaces — conversão para HTML, CSS e JavaScript

Este repositório é a transformação do projeto original [projeto_web-design_facens](https://github.com/MattSnn/projeto_web-design_facens), desenvolvido com **Vite, React, TypeScript e Tailwind CSS**.

A conversão foi refeita com auxílio de IA para concentrar o site em três arquivos e comprovar a quantidade de linhas exigida na atividade intermediária de Web Design. Conforme orientação do professor, o projeto original continua desenvolvido com Vite, React e Tailwind; esta versão serve à apresentação dos requisitos em HTML e CSS externos.

## Arquivos do site

- `index.html`: estrutura gerada diretamente pelos componentes originais e templates das páginas.
- `style.css`: CSS compilado do projeto original, expandido para leitura, incluindo reset, cores, estilos, efeitos e regras responsivas.
- `script.js`: referências às imagens originais e tradução dos estados e eventos React para JavaScript nativo.

O README é documentação; o site utiliza somente os três arquivos acima. Para executar, abra `index.html` no navegador, mantendo os arquivos na mesma pasta e conexão com a internet para carregar as imagens. Não é necessário instalar dependências ou executar Vite, React ou Tailwind.

## Fidelidade ao original

A referência da conversão é o commit `304fcf025c77bcca0e588eb71322d947de499bfa` do repositório original. O HTML foi obtido dos próprios componentes React, e o CSS foi compilado usando as dependências travadas no `package-lock.json` original. Os links de imagens apontam para os arquivos do mesmo commit original, sem redimensionamento ou recompressão.

Foram preservados textos, classes, dimensões, fontes, cores, gradientes, sombras, efeitos de hover, breakpoints, menu lateral, carrossel e filtros de nome, preço e metragem. A galeria conserva o alerta original. Os botões sem ação no original continuam sem ação; nenhuma página ou funcionalidade adicional foi inventada.

As únicas adaptações estruturais são templates HTML para substituir os componentes, eventos JavaScript para substituir os hooks e URLs das imagens originais para dispensar arquivos adicionais. O agrupamento inválido de opções com `div` dentro de `select` foi substituído por opções HTML válidas, conservando a classe de cor original.

Não foi realizada comparação visual por capturas de navegador nesta execução. A fidelidade foi verificada na estrutura gerada, nas regras CSS e nas referências aos arquivos de imagem; isso não deve ser apresentado como uma comparação pixel a pixel.

## Quantidade de linhas

- `index.html`: 1.732 linhas.
- `style.css`: 1.478 linhas.
- `script.js`: 249 linhas.

As quebras no HTML ficam dentro das tags para não introduzir espaços nos textos. O CSS preserva a ordem das regras e a cascata original. O HTML e o CSS superam, respectivamente, os mínimos de 400 e 300 linhas.

## Comentários e verificação

Os comentários identificam a origem da estrutura, o CSS compilado, os dados e as imagens, e explicam a navegação, o bloqueio de rolagem, os limites do carrossel, as comparações dos filtros e o estado vazio. Todos os blocos de regras e condições do CSS possuem comentários explicando sua função. O CSS mantém as camadas de tema, estilos básicos e utilitários originais.

A versão anterior deste repositório havia alterado o layout. Esta revisão substitui essa implementação pela conversão baseada diretamente no original.
