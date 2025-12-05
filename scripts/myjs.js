const temi = {
  normale: {
    primary: 'rgb(92,107,42)',
    overlay: 'rgba(0,0,0,0.4)',
    hero: 'heroimage.jpg',
    castello: 'castello1.jpg',
    borgo: 'borgo1.jpg'
  },
  natale: {
    primary: 'rgb(139,0,0)',
    overlay: 'rgba(139,0,0,0.3)',
    hero: 'natale-hero.jpg',
    castello: 'natale-castello.jpg',
    borgo: 'natale-borgo.jpg'
  },
  halloween: {
    primary: 'rgb(139,69,19)',
    overlay: 'rgba(0,0,0,0.7)',
    hero: 'halloween-hero.jpg',
    castello: 'halloween-castello.jpg',
    borgo: 'halloween-borgo.jpg'
  },
  
  sanpatrizio: {
    primary: 'rgb(0,128,0)',
    overlay: 'rgba(0,100,0,0.3)',
    hero: 'sanpatrizio-hero.jpg',
    castello: 'sanpatrizio-castello.jpg',
    borgo: 'sanpatrizio-borgo.jpg'
  }
};

function getTemaCorrente() {
  const oggi = new Date();
  const mese = oggi.getMonth() + 1;
  const giorno = oggi.getDate();

  if ((mese === 12 && giorno >= 8) || (mese === 1 && giorno <= 6)) {
    return 'natale';
  }
  if (mese === 10 && giorno >= 25) {
    return 'halloween';
  }
  if (mese === 3 && giorno === 17) {
    return 'sanpatrizio';
  }
  return 'normale';
}

function caricaTemaPreferito() {
  const temaSalvato = localStorage.getItem('temaPreferito');
  return temaSalvato || getTemaCorrente();
}

function applicaTema(nomeTema) {
  const tema = temi[nomeTema];
  const root = document.documentElement;
  
  root.style.setProperty('--color-primary', tema.primary);
  root.style.setProperty('--color-overlay', tema.overlay);
  
  const hero = document.querySelector('.hero');
  const herocastello = document.querySelector('.herocastello');
  const heroborgo = document.querySelector('.heroborgo');
  
  if (hero) {
    hero.style.backgroundImage = `url('./immagini/${tema.hero}')`;
  }
  if (herocastello) {
    herocastello.style.backgroundImage = `url('./immagini/${tema.castello}')`;
  }
  if (heroborgo) {
    heroborgo.style.backgroundImage = `url('./immagini/${tema.borgo}')`;
  }
  
  localStorage.setItem('temaPreferito', nomeTema);
  aggiornaSelettoreTema(nomeTema);
}

function aggiornaSelettoreTema(temaAttivo) {
  document.querySelectorAll('.tema-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.tema === temaAttivo) {
      btn.classList.add('active');
    }
  });
}

function inizializzaSelettoreTema() {
  const bottoni = document.querySelectorAll('.tema-btn');
  
  bottoni.forEach(btn => {
    btn.addEventListener('click', function() {
      applicaTema(this.dataset.tema);
      document.querySelectorAll('.tema-btn').forEach(b => {
        b.classList.remove('active');
      });
      this.classList.add('active');
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const temaAttuale = caricaTemaPreferito();
  applicaTema(temaAttuale);
  inizializzaSelettoreTema();
});

function initLanguageSwitch() {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;

      // pagina corrente (senza query/anchor)
      const path = window.location.pathname;
      const file = path.split('/').pop() || 'index.html';

      // mappa file IT -> EN
      const map = {
        'index.html': 'indexeng.html',
        'castello.html': 'castelloeng.html',
        'borgo.html': 'borgoeng.html',
        'visite.html': 'visiteeng.html',
        'contatti.html': 'contattieng.html'
      };

      const reverseMap = Object.fromEntries(
        Object.entries(map).map(([it, en]) => [en, it])
      );

      let target = file;

      if (lang === 'en') {
        // se sei nella versione IT, passa alla corrispondente ENG
        target = map[file] || file;
      } else {
        // se sei nella versione ENG, passa alla corrispondente IT
        target = reverseMap[file] || file;
      }

      if (target !== file) {
        window.location.href = target;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const temaAttuale = caricaTemaPreferito();
  applicaTema(temaAttuale);
  inizializzaSelettoreTema();
  initLanguageSwitch();   // <--- aggiungi questa riga
});
