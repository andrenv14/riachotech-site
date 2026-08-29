# riachotech-site

Site estático da Riacho Tech, servido por Nginx em https://riachotech.com.br
(server block `riachotech`, `root /var/www/riachotech`).

## Histórico: espelho manual (24–29/08)

**A decisão de 24/08 (abaixo, mantida como registro) foi superada em 29/08
pelo fundador.** Este repo NÃO é mais um espelho manual: `/var/www/riachotech`
**é** o diretório do `git`, o `.git` mora dentro dele, e `git pull` publica.

Base da decisão: `diff -rq` mostrou o conteúdo servido **idêntico** ao repo —
só os 6 `.bak` (fora do controle de versão) diferiam. Mover o `.git` para
dentro do diretório servido não altera nenhum byte servido.

Ordem executada:
- **S1** — regra de `deny` de dotfiles no Nginx, testada com um dotfile de
  sonda antes de qualquer coisa entrar.
- **S2** — backup do diretório servido, os 6 `.bak` removidos (estavam
  servidos publicamente), `.git` movido para `/var/www/riachotech`, deny
  extra de `README.md` e `nginx/`, sondas `/.git/config`=404 e
  `/README.md`=404 confirmadas com `index.html`=200. O espelho antigo em
  `~/riachotech-site` foi removido. Commit `4fb4c81`.

A `/conectar` segue congelada até a decisão da Meta sobre o App Review —
isso não mudou.

<details>
<summary>Texto original de 24/08 (espelho manual, decisão superada)</summary>

**Este repo era um ESPELHO MANUAL: o diretório realmente servido era
`/var/www/riachotech`, e edições feitas lá NÃO apareciam como `git status`
sujo aqui — precisavam ser copiadas de volta à mão.**

O `git init` não tinha sido feito no diretório servido porque o Nginx não
bloqueava dotfiles: com um `.git` ali, `https://riachotech.com.br/.git/config`
responderia na internet aberta.

Copiar produção → repo (comando do espelho antigo, não usar mais):

```
rsync -a --exclude='*.bak' --exclude='*.bak-*' /var/www/riachotech/ /home/sofia/riachotech-site/
```

</details>

## /conectar

`conectar/index.html` carrega o fluxo de Embedded Signup do WhatsApp
(Coexistence) e é a URL apontada no App Review da Meta. **Não editar sem
revisão** — quebra ali quebra o onboarding de cliente novo.

O App ID e o Config ID nessa página são públicos por natureza (rodam no
navegador do visitante). Nenhum segredo mora neste repo: o `code` do Embedded
Signup é trocado no back-end, e o App Secret nunca chega ao cliente.

## Back-end

O back-end (`sofia-bot`) é repositório separado. Este repo não importa nada dele
e não tem build, dependência nem CI — são só arquivos estáticos.

## .bak

Os `*.bak-*` do diretório servido estão no `.gitignore`. Eles continuam no disco
em `/var/www/riachotech`; apenas não entram no histórico.
