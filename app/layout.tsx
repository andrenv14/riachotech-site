import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';

/* As três famílias vêm por `next/font`, que baixa no BUILD e serve do próprio
   domínio. Ganho medido em 08/09/2026: nenhuma das três está instalada nesta
   máquina (`fc-list | grep -ci fraunces` → 0), e o site antigo dependia do
   Google Fonts pela rede em tempo de execução. Se a rede falhasse, a página
   renderizava com fonte de sistema e nada acusava. Agora não há essa rede. */
const fraunces = Fraunces({
  subsets: ['latin'], weight: 'variable', style: ['normal', 'italic'],
  axes: ['opsz'], variable: '--fonte-display', display: 'swap',
});
const inter = Inter({
  subsets: ['latin'], weight: ['400', '500', '600', '700'],
  variable: '--fonte-sans', display: 'swap',
});
const mono = IBM_Plex_Mono({
  subsets: ['latin'], weight: ['400'], variable: '--fonte-mono', display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://riachotech.com.br'),
  /* A ABA mostra só "Riacho Tech", por pedido do fundador em 08/09.

     Isto tem um custo, e ele é declarado: em Next não existe título de aba
     separado do título de SEO — os dois são o mesmo `<title>`, então a frase
     que descrevia o produto sai do resultado de busca junto com a aba. O custo
     é pequeno AQUI e não seria em outro site: o tráfego desta página vem de
     link no WhatsApp e no Instagram, não de busca.

     E o que aparece quando alguém compartilha o link NÃO muda: o
     `openGraph.title` abaixo continua com a frase inteira, e é ele que o
     WhatsApp lê. A `description` também fica, e é ela que o Google mostra
     embaixo do título. As três páginas herdadas seguem com título próprio
     ("Política de Privacidade — Riacho Tech" e as outras duas). */
  title: 'Riacho Tech',
  description:
    'A Sofia atende, confere sua agenda e marca horário no WhatsApp sozinha, pra você focar no que só você faz.',
  /* O ICONE DA ABA. Ele nao vinha por engano de omissao: o Next so' detecta
     sozinho `app/icon.*` ou `app/favicon.ico`, e os nossos moram em `public/`
     desde o site antigo, onde o `<link rel="icon">` era escrito a mao em cada
     HTML. As tres paginas herdadas continuam com o link no proprio arquivo; a
     home ficou sem, o navegador caiu no `/favicon.ico` que nao existe, e a aba
     mostrava o globo generico. Achado do fundador, olhando a aba.

     Declarado aqui e nao movido para `app/`, porque `public/favicon.png` e'
     o mesmo arquivo que `privacidade.html` e `404.html` referenciam: mover
     quebraria as duas. */
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website', url: 'https://riachotech.com.br/',
    /* O título do COMPARTILHAMENTO continua inteiro: é ele que o WhatsApp
       e o Instagram mostram no cartão do link, e ali o espaço não é o de
       uma aba — cabe a frase que diz o que o produto faz. Só o `<title>`
       encurtou. */
    title: 'Riacho Tech — Sofia, a assistente de agendamento no WhatsApp',
    description:
      'A Sofia atende, confere sua agenda e marca horário no WhatsApp sozinha, pra você focar no que só você faz.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = { themeColor: '#16253D' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${inter.variable} ${mono.variable}`}>
      <head>
        {/* Marca que o JS esta vivo, durante a ANALISE do documento e antes de
            qualquer pintura. E' o que permite o movimento comecar escondido sem
            piscar, e ao mesmo tempo deixar tudo visivel quando nao ha JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="bg-paper text-ink font-sans antialiased leading-[1.6]">{children}</body>
    </html>
  );
}
