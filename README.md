# riachotech-site

Site estático da Riacho Tech, servido por Nginx em https://riachotech.com.br
(server block `riachotech`, `root /var/www/riachotech`).

## Espelho manual — atenção

**Este repo é um ESPELHO MANUAL: o diretório realmente servido é
`/var/www/riachotech`, e edições feitas lá NÃO aparecem como `git status` sujo
aqui — precisam ser copiadas de volta à mão.**

O `git init` não foi feito no diretório servido porque o Nginx não bloqueia
dotfiles: com um `.git` ali, `https://riachotech.com.br/.git/config` responderia
na internet aberta.

Copiar produção → repo:

```
rsync -a --exclude='*.bak' --exclude='*.bak-*' /var/www/riachotech/ /home/sofia/riachotech-site/
```

**Isso é temporário, e a data de morte é a DECISÃO da Meta sobre o App Review
— não a submissão.** A submissão ocorreu em 24/08; a estrutura de
`/var/www/riachotech` segue congelada até a decisão, porque o analista abre
`/conectar` nesse diretório e mover o `.git` mexe em como o Nginx o serve.
Depois da decisão: repo passa a viver no diretório servido, com regra de
`deny` para `.git` no Nginx — o que elimina o espelho e este descompasso.

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
