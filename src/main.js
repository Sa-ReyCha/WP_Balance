import './style.css'

// Navbar scroll shadow
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('bg-white', 'shadow-md')
    navbar.classList.remove('bg-transparent')
  } else {
    navbar.classList.remove('bg-white', 'shadow-md')
    navbar.classList.add('bg-transparent')
  }
})

// Mobile menu toggle
const menuBtn = document.getElementById('menu-btn')
const mobileMenu = document.getElementById('mobile-menu')
const iconOpen = document.getElementById('icon-open')
const iconClose = document.getElementById('icon-close')

menuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden')
  mobileMenu.classList.toggle('hidden', isOpen)
  iconOpen.classList.toggle('hidden', !isOpen)
  iconClose.classList.toggle('hidden', isOpen)
})

// Close mobile menu when clicking a link
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden')
    iconOpen.classList.remove('hidden')
    iconClose.classList.add('hidden')
  })
})
