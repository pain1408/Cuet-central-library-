// Main JavaScript file for CUET Library Management System

// Declare lucide variable or import it here
const lucide = window.lucide // Assuming lucide is attached to the window object

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
    })
  }

  // Book slider functionality
  initializeBookSlider()

  // FAQ functionality
  initializeFAQ()

  // Tab functionality
  initializeTabs()
})

function initializeBookSlider() {
  const slider = document.querySelector(".books-slider")
  const cards = document.querySelectorAll(".book-card")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (!slider || !cards.length) return

  const visibleCount = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : 1
  let currentIndex = 0

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth
    const gap = 16 // 1rem gap
    const offset = currentIndex * (cardWidth + gap)
    slider.style.transform = `translateX(-${offset}px)`
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % (cards.length - visibleCount + 1)
    updateSlider()
  }

  function prevSlide() {
    currentIndex = currentIndex === 0 ? cards.length - visibleCount : currentIndex - 1
    updateSlider()
  }

  if (nextBtn) nextBtn.addEventListener("click", nextSlide)
  if (prevBtn) prevBtn.addEventListener("click", prevSlide)

  // Auto-slide every 5 seconds
  setInterval(nextSlide, 5000)

  // Update on window resize
  window.addEventListener("resize", updateSlider)
}

function initializeFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")
  const categoryBtns = document.querySelectorAll(".category-btn")
  const searchInput = document.getElementById("faq-search")

  // FAQ item toggle
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")
    const icon = question.querySelector("i")

    question.addEventListener("click", () => {
      const isOpen = answer.style.maxHeight && answer.style.maxHeight !== "0px"

      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherAnswer = otherItem.querySelector(".faq-answer")
          const otherIcon = otherItem.querySelector(".faq-question i")
          otherAnswer.style.maxHeight = "0px"
          otherIcon.style.transform = "rotate(0deg)"
        }
      })

      // Toggle current item
      if (isOpen) {
        answer.style.maxHeight = "0px"
        icon.style.transform = "rotate(0deg)"
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px"
        icon.style.transform = "rotate(180deg)"
      }
    })
  })

  // Category filtering
  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category

      // Update active button
      categoryBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Filter FAQ items
      faqItems.forEach((item) => {
        const itemCategory = item.dataset.category
        if (category === "all" || itemCategory === category) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  })

  // Search functionality
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase()

      faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question h3").textContent.toLowerCase()
        const answer = item.querySelector(".faq-answer").textContent.toLowerCase()

        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = "block"
        } else {
          item.style.display = "none"
        }
      })
    })
  }
}

function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn, .tab-button")
  const tabContents = document.querySelectorAll(".tab-content")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.dataset.tab

      // Update active button
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      button.classList.add("active")

      // Update active content
      tabContents.forEach((content) => {
        content.classList.remove("active")
        if (content.id === targetTab + "-tab" || content.id === targetTab) {
          content.classList.add("active")
        }
      })
    })
  })
}

// Utility functions
function showAlert(message, type = "info") {
  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type}`
  alertDiv.textContent = message

  document.body.insertBefore(alertDiv, document.body.firstChild)

  setTimeout(() => {
    alertDiv.remove()
  }, 5000)
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" }
  return new Date(dateString).toLocaleDateString("en-US", options)
}

function formatCurrency(amount) {
  return `৳${amount.toFixed(2)}`
}

// API helper functions
async function apiRequest(url, options = {}) {
  const token = localStorage.getItem("authToken")

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }

  const response = await fetch(url, { ...defaultOptions, ...options })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// Export functions for use in other scripts
window.LibraryUtils = {
  showAlert,
  formatDate,
  formatCurrency,
  apiRequest,
}
