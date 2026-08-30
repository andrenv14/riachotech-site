(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- hero: conversa auto-digitada ----------
  // Decorativa (aria-hidden no #chat) — a transcrição fixa ao lado é o que o
  // leitor de tela lê. Ver docs/s3-redesign.md.
  var chat = document.getElementById('chat');
  var heroScript = [
    { who: 'in', text: 'oi, tem horário livre amanhã de tarde?', t: '14:02' },
    { who: 'out', text: 'Deixa eu conferir a agenda… tenho 15h ou 16h30 livres, qual fica melhor pra você?', t: '14:02' },
    { who: 'in', text: 'pode ser 16h30', t: '14:03' },
    { who: 'out', text: 'Prontinho! Marcado amanhã às 16h30. Te mando um lembrete antes 👍', t: '14:03' }
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

  // ---------- revelação no scroll ----------
  var revealEls = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  }
})();
