(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- hero: conversa auto-digitada ----------
  // Decorativa (aria-hidden no #chat) — a transcrição fixa ao lado é o que o
  // leitor de tela lê. Ver docs/s3-redesign.md.
  var chat = document.getElementById('chat');
  // Sem emoji no roteiro: o polegar que fechava o último turno vira quadrado
  // vazio em sistema sem fonte de emoji instalada (Linux de mesa, e o
  // Chromium que roda as capturas), bem no elemento-assinatura da primeira
  // tela. A transcrição sr-only de index.html nunca teve o emoji — agora as
  // duas dizem exatamente a mesma frase, que é o ponto de haver transcrição.
  var heroScript = [
    { who: 'in', text: 'oi, tem horário livre amanhã de tarde?', t: '14:02' },
    { who: 'out', text: 'Deixa eu conferir a agenda… tenho 15h ou 16h30 livres, qual fica melhor pra você?', t: '14:02' },
    { who: 'in', text: 'pode ser 16h30', t: '14:03' },
    { who: 'out', text: 'Prontinho! Marcado amanhã às 16h30. Te mando um lembrete antes.', t: '14:03' }
  ];
  var i = 0;

  function typingBubble() {
    var el = document.createElement('div');
    el.className = 'typing-bubble';
    el.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    return el;
  }

  function addBubble(msg) {
    var el = document.createElement('div');
    el.className = 'bubble ' + (msg.who === 'out' ? 'bubble-out' : 'bubble-in');
    el.innerHTML = msg.text.replace(/&/g, '&amp;') + '<span class="bubble-tick">' + msg.t + '</span>';
    return el;
  }

  function trimChat() {
    while (chat.children.length > 4) chat.removeChild(chat.firstChild);
  }

  function step() {
    if (i >= heroScript.length) {
      setTimeout(function () { chat.innerHTML = ''; i = 0; step(); }, 2600);
      return;
    }
    var msg = heroScript[i];
    if (msg.who === 'out') {
      var tb = typingBubble();
      chat.appendChild(tb);
      tb.style.opacity = 1;
      trimChat();
      setTimeout(function () {
        chat.removeChild(tb);
        chat.appendChild(addBubble(msg));
        trimChat();
        i++;
        setTimeout(step, 1200);
      }, 900);
    } else {
      chat.appendChild(addBubble(msg));
      trimChat();
      i++;
      setTimeout(step, 900);
    }
  }

  if (chat) {
    if (reduce) {
      heroScript.forEach(function (msg) { chat.appendChild(addBubble(msg)); });
    } else {
      step();
    }
  }

  // ---------- "pra quem é": celular reaproveitado, com abas ----------
  // Roteiros transcritos dos PNG que existiam antes (docs/s3-redesign.md,
  // S3 6/9) — mesmo texto, sem imagem. addBubble() acima é genérico o
  // bastante pra reaproveitar aqui.
  var segScripts = {
    clinicas: {
      name: 'Sorriso Certo Odonto',
      messages: [
        { who: 'in', text: 'Oi, gostaria de marcar uma limpeza', t: '14:02' },
        { who: 'out', text: 'Oi! Claro, vou verificar aqui pra você. É por convênio ou particular?', t: '14:02' },
        { who: 'in', text: 'Particular', t: '14:02' },
        { who: 'out', text: 'Temos horário livre amanhã às 15h ou às 16h30. Qual fica melhor pra você?', t: '14:03' },
        { who: 'in', text: '15h tá ótimo', t: '14:03' },
        { who: 'out', text: 'Prontinho! Agendado: amanhã, 15h, limpeza. O valor é R$150 — quer que eu já mande o Pix?', t: '14:03' }
      ]
    },
    saloes: {
      name: 'Studio Corte & Cia',
      messages: [
        { who: 'in', text: 'Boa tarde, tem horário pra corte hoje?', t: '17:10' },
        { who: 'out', text: 'Boa tarde! Deixa eu ver aqui pra você.', t: '17:10' },
        { who: 'out', text: 'Tenho livre às 18h ou às 19h15, qual prefere?', t: '17:10' },
        { who: 'in', text: '19h15 mesmo', t: '17:11' },
        { who: 'out', text: 'Fechado! Corte marcado hoje às 19h15. Até daqui a pouco!', t: '17:11' },
        { who: 'in', text: 'Show, obrigado!', t: '17:11' }
      ]
    },
    petshops: {
      name: 'Amigo Fiel Petshop',
      messages: [
        { who: 'in', text: 'Oi, queria agendar banho e tosa pro meu cachorro', t: '10:20' },
        { who: 'out', text: 'Oi! Com todo prazer, vou verificar! Qual o porte dele — pequeno, médio ou grande?', t: '10:20' },
        { who: 'in', text: 'Médio, um vira-lata', t: '10:21' },
        { who: 'out', text: 'Perfeito! Tenho horário amanhã de manhã às 9h ou à tarde às 14h. Qual prefere?', t: '10:21' },
        { who: 'in', text: 'De manhã', t: '10:21' },
        { who: 'out', text: 'Combinado! Amanhã 9h, banho e tosa. Até lá!', t: '10:22' }
      ]
    }
  };

  var segChat = document.getElementById('seg-chat');
  var segPhoneName = document.getElementById('seg-phone-name');
  var segTabs = Array.prototype.slice.call(document.querySelectorAll('[data-seg]'));
  var segPanels = {};
  segTabs.forEach(function (tab) {
    segPanels[tab.getAttribute('data-seg')] = document.querySelector('[data-seg-panel="' + tab.getAttribute('data-seg') + '"]');
  });

  function renderSeg(seg) {
    var data = segScripts[seg];
    if (!segChat || !data) return;
    segChat.innerHTML = '';
    if (segPhoneName) segPhoneName.textContent = data.name;
    data.messages.forEach(function (msg, idx) {
      var el = addBubble(msg);
      if (!reduce) el.style.animationDelay = (idx * 90) + 'ms';
      segChat.appendChild(el);
    });
    // Os roteiros têm 6 mensagens — mais do que cabe nos 520px do celular
    // sem rolar. .phone-body tem overflow:hidden (igual ao #chat do hero),
    // então sem isto a ÚLTIMA mensagem (a confirmação, o clímax de cada
    // roteiro) ficava cortada e invisível. Rola pro fim: mesmo efeito de um
    // chat de verdade, que sempre abre na mensagem mais recente.
    segChat.scrollTop = segChat.scrollHeight;
  }

  function activateSeg(seg) {
    segTabs.forEach(function (tab) {
      var active = tab.getAttribute('data-seg') === seg;
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
    });
    Object.keys(segPanels).forEach(function (key) {
      if (segPanels[key]) segPanels[key].hidden = key !== seg;
    });
    renderSeg(seg);
  }

  if (segTabs.length) {
    segTabs.forEach(function (tab, idx) {
      tab.addEventListener('click', function () { activateSeg(tab.getAttribute('data-seg')); });
      tab.addEventListener('keydown', function (e) {
        var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        var next = segTabs[(idx + dir + segTabs.length) % segTabs.length];
        activateSeg(next.getAttribute('data-seg'));
        next.focus();
      });
    });
    activateSeg(segTabs[0].getAttribute('data-seg'));
  }
})();
