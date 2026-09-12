# O site da Riacho Tech

Duas páginas que vendem: a **home**, que apresenta a assistente de agendamento
por WhatsApp, e a **`/landing-page/`**, que vende o serviço de landing page. No
ar em [riachotech.com.br](https://riachotech.com.br).

São Next 15 em export estático — o servidor não roda build, recebe HTML pronto.
Três páginas herdadas (`privacidade.html`, `404.html` e `conectar/`) seguem em
HTML puro e não mudam.

**Irmãos:** [`sofia-vitrine`](https://github.com/andrenv14/sofia-vitrine), a
arquitetura do produto · [`sofia-eval`](https://github.com/andrenv14/sofia-eval),
a avaliação de comportamento do modelo ·
[`sofia-agents`](https://github.com/andrenv14/sofia-agents), o processo de
trabalho.

## O que tem aqui

| Onde | O que é |
|---|---|
| [`app/`](app/), [`components/`](components/) | as duas páginas em React |
| [`app/globals.css`](app/globals.css) | os tokens da marca — cor, tipografia, raio |
| [`build/`](build/) | os cinco scripts que medem e travam o que vai ao ar |
| [`public/`](public/) | as fotos e as páginas herdadas |

---

## 1. A home

![Primeira tela da home, 1280 px](docs/imagens/home-1280-dobra.webp)

O celular da direita é markup da própria página, não captura de WhatsApp. A
conversa chega mensagem a mensagem, e as perguntas são sobre a própria Riacho —
o botão ao lado leva ao número onde a assistente atende de verdade.

A seção de capacidades mostra o **artefato** de cada uma em vez de afirmá-la: o
evento como nasce no Google Agenda, as mensagens da cobrança, os lembretes, o
item do catálogo com foto e preço. Três das seis respondem ao toque — escolher
um horário reescreve o evento e os dois lembretes, porque as peças leem o mesmo
objeto.

![Seção de capacidades, 1280 px](docs/imagens/home-1280-capacidades.webp)

E os planos, que é onde o site precisa ser mais claro:

![Seção de planos, 1280 px](docs/imagens/home-1280-planos.webp)

Em 390 px:

<p>
  <img src="docs/imagens/home-390-dobra.webp" alt="Primeira tela da home em 390 px" width="255">
  <img src="docs/imagens/home-390-capacidades.webp" alt="Seção de capacidades em 390 px" width="255">
</p>

## 2. A `/landing-page/`

![Primeira tela da landing page, 1280 px](docs/imagens/landing-1280-dobra.webp)

Ela precisa **ser** a amostra do que vende: se não for a melhor página do site,
desmente a própria oferta. Herda inteiro o vocabulário da home.

A peça do herói **atravessa** a borda de baixo e termina dentro da seção
seguinte. Isso é deliberado, e a alternativa foi testada: recortar a peça rente
à virada de cor dá um corte reto num cartão branco, que lê como amputação.

Para atravessar, ela precisa ser **absoluta e transbordar**, as duas coisas
juntas — com só uma das duas, falha pela que falta. Absoluta, não entra na conta
da altura do herói; sem recorte, o que passa disso invade a seção clara.

No celular não há espaço para atravessar, então a peça é cortada rente à dobra e
**desvanece** antes da borda. Sem o desvanecimento o corte caía onde calhasse —
partiu "Corte · R$ 60" com as letras 34% visíveis, e meia letra cortada lê como
falha de renderização. A máscara resolve por critério: o conteúdo some antes da
borda, seja qual for.

<p>
  <img src="docs/imagens/landing-390-dobra.webp" alt="Primeira tela da landing page em 390 px" width="255">
</p>

O preço é público e está na página, sem "fale com um especialista":

![Seção de preço da landing page, 1280 px](docs/imagens/landing-1280-preco.webp)

## 3. O que trava o que vai ao ar

Cinco scripts em [`build/`](build/). Os dois primeiros são os que importam.

**`conferir-estaticas.js`** roda dentro do `npm run build` e reprova o export se
algo essencial sumir. São 11 conferências, e a que mais importa: a âncora
`#uso-limitado-google` da política de privacidade tem de continuar existindo —
ela está num e-mail ao time de verificação do Google, e alguém vai abri-la. Tem
também um controle negativo: uma âncora inventada que ele precisa **não**
encontrar, porque comando que devolve vazio não distingue "não achei" de "não
olhei".

**`medir-site.js`** abre qualquer página em 390, 820 e 1280 px e devolve números:
contraste reprovado, texto de corpo abaixo de 16 px, alvo de toque menor que
44×44, rolagem horizontal, erro de console. Nenhuma mudança visual vai ao ar sem
passar por ele.

Os outros três: `detectar-tells.js` conta padrões que fazem uma página parecer
gerada por IA — ele conta, o julgamento é de quem lê; `texto-visivel.js` compara
o texto de uma página antes e depois de uma mudança, e foi ele que garantiu que
a política de privacidade mudasse de forma sem perder uma palavra;
`servir-gzip.js` serve o export com compressão, que é o que o servidor faz —
medir sem gzip dá um número pessimista sobre um servidor que não existe.

## 4. Medido

Medido nas três páginas, com gzip e o Chromium do Playwright.
Os números de contraste, corpo e alvo se rederivam com `npm run medir`; os de
Lighthouse, com o Chromium sobre `npm run servir`.

| | home | privacidade | 404 |
|---|---:|---:|---:|
| acessibilidade | 100 | 100 | 100 |
| performance | 89 | 93 | 95 |
| boas práticas | 96 | 100 | 96 |
| contraste reprovado | 0 | 0 | 0 |
| texto de corpo abaixo de 16 px | 0 | 0 | 0 |
| alvo de toque abaixo de 44×44 | 0 | 3 a 5 | 0 |

Os alvos da política são links dentro de parágrafo, exceção declarada. São 3 em
390 px e 5 nas larguras maiores: um link que cabe numa linha em tela larga quebra
em duas na estreita, e quebrado deixa de ser contado. **Medida de acessibilidade
lida numa largura só é medida incompleta**, e nos dois sentidos: aqui a conta
sobe na tela larga, e na home havia alvos que só a tela estreita revelava,
escondidos atrás da barra de topo.

## 5. Operação

- `npm run build` gera o export em `out/` e roda o portão das 11 conferências.
- `npm run servir` sobe `out/` em `127.0.0.1:8111` com gzip. Ele manda
  `max-age=300`: ao recarregar depois de um build, use `?v=algo` na URL, senão
  você mede a página anterior.
- `npm run medir` mede qualquer página nos três tamanhos.

**O diretório servido (`/var/www/riachotech`) não é um clone deste
repositório** — ele contém só o conteúdo de `out/`, e é para lá que o export
vai:

```
npm run build
rsync -a --delete --exclude='.git' out/ /var/www/riachotech/
```

**`git pull` no diretório servido não é deploy — e é pior que quebrar: devolve a
página antiga sem erro nenhum.** O `.git` de lá segue parado no commit anterior
de propósito, e é ele que dá o rollback (`git checkout . && git clean -fd`). O
estado se confere com `git -C /var/www/riachotech status --porcelain | grep index.html`,
que tem de devolver `M`.

Dois requisitos travam qualquer mudança futura de forma: a URL `privacidade.html`
**com** `.html` não muda, e a âncora `#uso-limitado-google` não some.

## 6. O que não se faz aqui

Telefone de cliente, nome de cliente, captura de conversa real, e nada que se
pareça com credencial. A peça do Pix mostra a chave como e-mail — o
`contato@riachotech.com.br`, que já está publicado no rodapé. Nada de código copia-e-cola
plausível: invenção com cara de chave é pior que invenção nenhuma, porque quem
lê não tem como saber que é falsa.

As fotos são geradas, e duas regras valem para todas: nenhuma leva texto por cima
(o véu escuro necessário para passar no contraste mudaria o clima da peça) e
nenhuma tem rosto (rosto gerado denuncia imagem falsa em tamanho pequeno, e
passaria a parecer cliente nosso).
