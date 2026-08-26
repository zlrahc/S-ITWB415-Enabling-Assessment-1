// ----- dark mode toggle -----
(function() {
  const toggleBtn = document.getElementById('dark_mode_toggle');
  const body = document.body;
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    toggleBtn.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
})();

// ----- mobile menu -----
(function() {
  const menuBtn = document.getElementById('menu_btn');
  const nav = document.querySelector('nav');

  menuBtn.addEventListener('click', function() {
    nav.classList.toggle('show');
  });

  nav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      nav.classList.remove('show');
    });
  });
})();

// ----- active nav link on scroll -----
(function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  function updateActive() {
    let current = '';
    const scrollY = window.scrollY + 100;

    sections.forEach(function(section) {
      const offset = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollY >= offset && scrollY < offset + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActive);
  updateActive();
})();

// ----- project modal -----
(function() {
  const modal = document.getElementById('project_modal');
  const modalTitle = document.getElementById('modal_title');
  const modalDesc = document.getElementById('modal_desc');
  const modalLink = document.getElementById('modal_link');
  const closeBtn = document.querySelector('.close-btn');

  document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        return;
      }

      const titleEl = this.querySelector('h3 a') || this.querySelector('h3');
      const title = titleEl ? titleEl.textContent.trim() : 'Project';
      const desc = this.querySelector('p') ? this.querySelector('p').textContent : '';
      const link = this.querySelector('h3 a') ? this.querySelector('h3 a').getAttribute('href') : '#';

      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalLink.setAttribute('href', link);
      modal.classList.add('show-modal');
    });
  });

  closeBtn.addEventListener('click', function() {
    modal.classList.remove('show-modal');
  });

  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('show-modal');
    }
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modal.classList.remove('show-modal');
    }
  });
})();

// ----- contact form -----
(function() {
  const form = document.getElementById('contact_form');
  const formMsg = document.getElementById('form_msg');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      formMsg.textContent = '⚠️ Please fill in all fields.';
      formMsg.className = 'error-msg';
      return;
    }

    formMsg.textContent = '✅ Message sent (demo). Thanks!';
    formMsg.className = 'success-msg';
    form.reset();

    setTimeout(function() {
      formMsg.textContent = '';
      formMsg.className = '';
    }, 4000);
  });
})();