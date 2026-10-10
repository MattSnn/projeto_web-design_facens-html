# ImobiFaces — versão HTML, CSS e JavaScript

Este repositório é a **transformação do projeto original desenvolvido com Vite, React, TypeScript e Tailwind CSS** para HTML, CSS e JavaScript puro.

Projeto original: https://github.com/MattSnn/projeto_web-design_facens

Referência utilizada: commit `304fcf025c77bcca0e588eb71322d947de499bfa`.

Esta versão corresponde a uma atividade intermediária de Web Design da FACENS, não à finalização do projeto. Preserva a marca, as imagens, os destaques, os dados do catálogo, os indicadores e os créditos do original. Adiciona funcionamento aos botões e à página de detalhes que ainda estavam incompletos.

## Estrutura

O site utiliza somente três arquivos de execução. Este README é a documentação adicional solicitada.

| Arquivo | Responsabilidade | Linhas |
| --- | --- | ---: |
| `index.html` | Estrutura semântica, página inicial, destaques, telas, perguntas e contato | 520 |
| `style.css` | Tema, box model, layouts Flexbox, responsividade e imagens incorporadas | 1.155 |
| `script.js` | Filtros, ordenação, rotas, menu, carrossel e galeria | 364 |

As linhas estão formatadas e os blocos têm comentários explicativos. As imagens originais foram comprimidas e incorporadas como data URIs no CSS para que não seja necessária uma pasta de imagens. As seis declarações dessas imagens ocupam somente seis linhas; não foram divididas para aumentar a contagem. Não há React, Tailwind, Vite, dependências via CDN ou etapa de build nesta versão.

## Executar

Abra `index.html` em um navegador atual. Os três arquivos devem permanecer na mesma pasta.

Opcionalmente, no terminal do VS Code, execute `python -m http.server 8000` nessa pasta e abra http://localhost:8000.

## Relação com os requisitos da atividade

| Requisito | Implementação / evidência |
| --- | --- |
| `index.html` e `style.css` com CSS externo | `<link rel="stylesheet" href="style.css">` no cabeçalho |
| 20 elementos com Content, Padding, Border e Margin | 23 seletores com largura, padding, border e margin explícitos; comentários B01–B23 no CSS |
| Flexbox para organização responsiva | 87 declarações de Flexbox, sem contar display/gap, distribuídas pelos componentes e media queries |
| Git no VS Code e publicação no GitHub | Etapa a executar e registrar no VS Code; não confundir preparação em outro ambiente com evidência dessa exigência |
| Mais de 400 linhas de HTML | 520 linhas |
| Mais de 300 linhas de CSS | 1.155 linhas |
| Melhorias e novos recursos | Cards ligados a detalhes, busca por cidade e nome, ordenação, galeria, FAQ e menu funcional |
| Comentários explicativos | Blocos comentados nos três arquivos, inclusive regras de layout e funções |
| Arquivo com código, repositório e prints | Precisa ser preparado para a entrega; este README documenta o código, mas não substitui os prints |
| Envio no Canvas | Etapa do aluno após conferir os arquivos e a documentação |

### Observações sobre a interpretação do enunciado

Content é a área de conteúdo do box model, definida aqui por `width`, `height` ou `min-height`; não é a propriedade CSS `content`, utilizada em pseudo-elementos. Alguns elementos usam largura automática ou borda zero de forma intencional; os valores estão explicitamente atribuídos.

O pedido de “20 propriedades de Flexbox” foi atendido como pelo menos 20 aplicações/declarações de Flexbox. Não significa 20 nomes distintos de propriedades: propriedades como `align-items`, `justify-content`, `flex-direction`, `flex-wrap`, `flex`, `flex-grow`, `flex-shrink` e `flex-basis` são reutilizadas conforme a necessidade. Caso o professor utilize outra interpretação, confirme com ele.

### Elementos com box model explícito

Os comentários B01–B23 identificam: contêiner, seção, atalho de acessibilidade, cabeçalho, marca, botão, botão do menu, diálogo do menu, hero, descrição do hero, cabeçalho da seção, botão de ícone, card de imóvel, corpo do card, indicador, barra de filtros, campos, estado vazio, painel de visita, pergunta frequente, card de contato, rodapé e diálogo de foto.

Há mais de 20 elementos reais no HTML utilizando esses seletores, incluindo oito cards de destaque, quatro indicadores e três perguntas frequentes.

## Recursos

- Página inicial com imagem original, identidade azul e chamadas para ação.
- Oito destaques com acesso a páginas de detalhes.
- Catálogo com os seis registros originais, preços e áreas preservados.
- Busca por nome ou cidade, ignorando diferenças de acentos e maiúsculas.
- Filtros combinados por preço e área, com opção de limpar e estado vazio.
- Ordenação por preço crescente, decrescente e área crescente.
- Navegação por hash, compatível com arquivo local e hospedagem estática.
- Menu e galeria em diálogos nativos, com fechamento por Escape.
- Carrossel com setas e rolagem por toque.
- Perguntas frequentes com `details` e `summary`.
- Link de e-mail com identificação do imóvel no assunto e no corpo.
- Adaptação a celular, tablet, impressão e preferência por movimento reduzido.
- Atalho de teclado para o conteúdo, foco visível e contagem de resultados acessível.

## Dados demonstrativos e limites

Este é um projeto acadêmico. Os anúncios, indicadores, imagens e telefone são ilustrativos, conforme os conteúdos do original. O telefone fictício não inicia uma chamada. O link de e-mail abre o aplicativo do usuário: o site não possui servidor de envio, cadastro, autenticação ou banco de dados. Os destaques sem preço no original mantêm “Consulte a equipe”, sem inventar valores.

O HTML preserva a página inicial e os contatos sem JavaScript. Catálogo, filtros, detalhes, menu e galeria exigem JavaScript habilitado.

## Verificação realizada

- Sintaxe do JavaScript verificada com `node --check`.
- Checagem estrutural: CSS externo, IDs únicos, âncoras existentes, contagem de linhas, 23 seletores de box model e 87 declarações Flexbox.
- Testes com DOM simulado: filtros combinados, busca sem acentos, ordenação, limites de preço e área, estado vazio, renderização e rotas válidas/inválidas.
- A conferência visual em navegador e os prints de entrega ainda devem ser realizados; testes com DOM simulado não substituem essa etapa.

## Preparar a entrega no VS Code

1. Abra a pasta no VS Code e confira os três arquivos.
2. Inicialize ou abra o repositório pela aba Controle do Código-Fonte.
3. Faça uma alteração real, por exemplo um ajuste de texto, e registre um commit explicando a melhoria.
4. Publique ou sincronize com o novo repositório no GitHub.
5. Capture prints da página inicial, catálogo filtrado, detalhes, layout de celular e histórico de commits no VS Code/GitHub.
6. Monte o documento solicitado com os códigos, o link do novo repositório e os prints.
7. Confira o documento e envie no Canvas.

## Créditos

Equipe preservada do rodapé original: Mateus Sonnenberg, Pedro Wagner, Rodrigo Boava e Jhonny Walter.
