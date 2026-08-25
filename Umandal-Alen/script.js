const aside = document.querySelector('aside');
const NAV_TRIGGER_ZONE_PX = 35;

function openNav() {
  aside.classList.add('nav-open');
}

function closeNav() {
  aside.classList.remove('nav-open');
}

document.addEventListener('mousemove', (event) => {
  if (event.clientX <= NAV_TRIGGER_ZONE_PX) {
    openNav();
  }
});

document.addEventListener('click', (event) => {
  const isClickInTriggerZone = event.clientX <= NAV_TRIGGER_ZONE_PX;
  const isNavClosed = !aside.classList.contains('nav-open');

  if (isClickInTriggerZone && isNavClosed) {
    openNav();
    return;
  }

  if (!aside.contains(event.target)) {
    closeNav();
  }
});

aside.addEventListener('mouseleave', closeNav);

aside.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNav);
});

