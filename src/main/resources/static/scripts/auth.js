// Authentication JavaScript for CUET Library Management System

document.addEventListener("DOMContentLoaded", () => {
  initializeAuthForms()
  initializeTabs()
})

function initializeAuthForms() {
  const studentLoginForm = document.getElementById("student-login-form")
  const adminLoginForm = document.getElementById("admin-login-form")
  const registrationForm = document.getElementById("registration-form")

  if (studentLoginForm) {
    studentLoginForm.addEventListener("submit", handleStudentLogin)
  }

  if (adminLoginForm) {
    adminLoginForm.addEventListener("submit", handleAdminLogin)
  }

  if (registrationForm) {
    registrationForm.addEventListener("submit", handleRegistration)
  }
}

function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-button")
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
        if (content.id === targetTab + "-tab") {
          content.classList.add("active")
        }
      })
    })
  })
}

async function handleStudentLogin(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const loginData = {
    studentId: formData.get("studentId"),
    password: formData.get("password"),
  }

  try {
    showLoading(e.target)

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })

    const result = await response.json()

    if (response.ok) {
      // Store authentication token
      localStorage.setItem("authToken", result.accessToken)
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          studentId: result.studentId,
          name: result.name,
          role: result.role,
        }),
      )

      showAlert("Login successful! Redirecting...", "success")

      // Redirect based on role
      setTimeout(() => {
        if (result.role === "ADMIN") {
          window.location.href = "admin.html"
        } else {
          window.location.href = "dashboard.html"
        }
      }, 1500)
    } else {
      showAlert(result.message || "Login failed", "error")
    }
  } catch (error) {
    console.error("Login error:", error)
    showAlert("Network error. Please try again.", "error")
  } finally {
    hideLoading(e.target)
  }
}

async function handleAdminLogin(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const loginData = {
    studentId: formData.get("email"), // Using email as studentId for admin
    password: formData.get("password"),
  }

  try {
    showLoading(e.target)

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })

    const result = await response.json()

    if (response.ok && result.role === "ADMIN") {
      localStorage.setItem("authToken", result.accessToken)
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          studentId: result.studentId,
          name: result.name,
          role: result.role,
        }),
      )

      showAlert("Admin login successful! Redirecting...", "success")

      setTimeout(() => {
        window.location.href = "admin.html"
      }, 1500)
    } else {
      showAlert("Invalid admin credentials", "error")
    }
  } catch (error) {
    console.error("Admin login error:", error)
    showAlert("Network error. Please try again.", "error")
  } finally {
    hideLoading(e.target)
  }
}

async function handleRegistration(e) {
  e.preventDefault()

  const formData = new FormData(e.target)

  // Validate password confirmation
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  if (password !== confirmPassword) {
    showAlert("Passwords do not match", "error")
    return
  }

  const registrationData = {
    studentId: formData.get("studentId"),
    name: formData.get("name"),
    email: formData.get("email"),
    password: password,
    department: formData.get("department"),
    session: formData.get("session"),
  }

  try {
    showLoading(e.target)

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registrationData),
    })

    const result = await response.json()

    if (response.ok) {
      showAlert("Registration successful! Please login to continue.", "success")

      setTimeout(() => {
        window.location.href = "login.html"
      }, 2000)
    } else {
      showAlert(result.message || "Registration failed", "error")
    }
  } catch (error) {
    console.error("Registration error:", error)
    showAlert("Network error. Please try again.", "error")
  } finally {
    hideLoading(e.target)
  }
}

function showLoading(form) {
  const submitButton = form.querySelector('button[type="submit"]')
  if (submitButton) {
    submitButton.disabled = true
    submitButton.innerHTML = '<span class="loading"></span> Processing...'
  }
}

function hideLoading(form) {
  const submitButton = form.querySelector('button[type="submit"]')
  if (submitButton) {
    submitButton.disabled = false
    // Restore original text based on form type
    if (form.id === "student-login-form") {
      submitButton.innerHTML = "Sign In as Student"
    } else if (form.id === "admin-login-form") {
      submitButton.innerHTML = "Sign In as Admin"
    } else if (form.id === "registration-form") {
      submitButton.innerHTML = "Create Account"
    }
  }
}

function showAlert(message, type = "info") {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll(".alert")
  existingAlerts.forEach((alert) => alert.remove())

  const alertDiv = document.createElement("div")
  alertDiv.className = `alert alert-${type}`
  alertDiv.textContent = message

  // Insert at the top of the auth container
  const authContainer = document.querySelector(".auth-container")
  if (authContainer) {
    authContainer.insertBefore(alertDiv, authContainer.firstChild)
  }

  setTimeout(() => {
    alertDiv.remove()
  }, 5000)
}

// Check if user is already logged in
function checkAuthStatus() {
  const token = localStorage.getItem("authToken")
  const userInfo = localStorage.getItem("userInfo")

  if (token && userInfo) {
    const user = JSON.parse(userInfo)

    // Redirect if already logged in
    if (window.location.pathname.includes("login.html") || window.location.pathname.includes("register.html")) {
      if (user.role === "ADMIN") {
        window.location.href = "admin.html"
      } else {
        window.location.href = "dashboard.html"
      }
    }
  }
}

// Logout function
function logout() {
  localStorage.removeItem("authToken")
  localStorage.removeItem("userInfo")
  window.location.href = "index.html"
}

// Check auth status on page load
checkAuthStatus()

// Export functions for global use
window.AuthUtils = {
  logout,
  checkAuthStatus,
}
