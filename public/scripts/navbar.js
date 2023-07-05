const navbarToggle = document.getElementById('navbarToggle');
const navbarLinks = document.getElementById('navbarLinks');

navbarToggle.addEventListener('click', function() {
  navbarToggle.classList.toggle('active');
  navbarLinks.classList.toggle('active');
});
