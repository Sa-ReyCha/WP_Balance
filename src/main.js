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

// Hero carousel
const carouselSlides = [
  { src: '/Cora_Mora.png',  label: 'Cora Mora'  },
  { src: '/Coco_Cloud.png', label: 'Coco Cloud' },
  { src: '/Reeses.png',     label: 'Reeses'     },
  { src: '/Pink.png',       label: 'Pink'       },
]

let carouselCurrent = 0
const carouselImg   = document.getElementById('carousel-img')
const carouselLabel = document.getElementById('carousel-label')
const carouselDots  = document.getElementById('carousel-dots')

carouselSlides.forEach((_, i) => {
  const dot = document.createElement('button')
  dot.setAttribute('aria-label', `Slide ${i + 1}`)
  updateDotClass(dot, i === 0)
  dot.addEventListener('click', () => carouselGoTo(i))
  carouselDots.appendChild(dot)
})

function updateDotClass(dot, active) {
  dot.className = `h-2 rounded-full transition-all duration-300 ${active ? 'w-4 bg-(--color-primary)' : 'w-2 bg-(--color-primary)/30'}`
}

function carouselGoTo(n) {
  carouselImg.style.opacity = '0'
  setTimeout(() => {
    carouselCurrent = (n + carouselSlides.length) % carouselSlides.length
    carouselImg.src = carouselSlides[carouselCurrent].src
    carouselImg.alt = carouselSlides[carouselCurrent].label
    carouselLabel.textContent = carouselSlides[carouselCurrent].label
    carouselImg.style.opacity = '1'
    carouselDots.querySelectorAll('button').forEach((d, i) => {
      updateDotClass(d, i === carouselCurrent)
    })
  }, 250)
}

setInterval(() => carouselGoTo(carouselCurrent + 1), 3000)
