# CUET Library Management System

A comprehensive library management system built with Spring Boot and modern web technologies, featuring a green-themed UI reflecting CUET's "green heaven" identity.

## Features

- **User Management**: Student and admin authentication with JWT tokens
- **Book Management**: Complete CRUD operations for books with real-time availability
- **Borrowing System**: Book borrowing, renewal, and return functionality
- **Fine Management**: Automatic fine calculation and online payment support
- **Notes Sharing**: PDF upload/download system for study materials
- **Reservation System**: Pre-booking system for popular books
- **Responsive Design**: Mobile-first approach with green color scheme

## Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** (JWT Authentication)
- **Spring Data JPA**
- **MySQL 8.0**
- **Maven**

### Frontend
- **HTML5, CSS3, JavaScript**
- **Responsive Design**
- **Lucide Icons**
- **Green Theme** (CUET's identity)

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Git (optional)

## Installation & Setup

### 1. Database Setup
\`\`\`sql
-- Create database
CREATE DATABASE cuet_library;

-- Create user (optional)
CREATE USER 'library_user'@'localhost' IDENTIFIED BY 'library_password';
GRANT ALL PRIVILEGES ON cuet_library.* TO 'library_user'@'localhost';
FLUSH PRIVILEGES;
\`\`\`

### 2. Clone/Download Project
\`\`\`bash
# If using Git
git clone <repository-url>
cd cuet-library-system

# Or download and extract the project files
\`\`\`

### 3. Configure Database
Edit `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cuet_library?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=your_mysql_password
