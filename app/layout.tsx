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
  title: 'Riacho Tech — Sofia, a assistente de agendamento no WhatsApp',
  description:
    'A Sofia atende, confere sua agenda e marca horário no WhatsApp sozinha, pra você focar no que só você faz.',
  openGraph: {
    type: 'website', url: 'https://riachotech.com.br/',
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
      <body className="bg-paper text-ink font-sans antialiased leading-[1.6]">{children}</body>
    </html>
  );
}
