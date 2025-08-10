-- Sample data for CUET Library Management System

-- Insert sample books
INSERT INTO books (title, isbn, total_copies, available_copies, department, category, description, image_url, created_at, updated_at) VALUES
('Database Management Systems', '978-0072465631', 5, 3, 'CSE', 'Textbook', 'Comprehensive guide to database systems', 'images/dbms.jpg', NOW(), NOW()),
('Software Engineering', '978-0133943030', 4, 2, 'CSE', 'Textbook', 'Modern software engineering practices', 'images/se.jpg', NOW(), NOW()),
('Computer Networks', '978-0132126953', 6, 4, 'CSE', 'Textbook', 'Network protocols and architecture', 'images/net.jpg', NOW(), NOW()),
('Artificial Intelligence: A Modern Approach', '978-0134610993', 3, 2, 'CSE', 'Textbook', 'AI concepts and applications', 'images/ArtificialIntelligenceAModernApproach.jpg', NOW(), NOW()),
('Operating System Concepts', '978-1118063330', 5, 3, 'CSE', 'Textbook', 'OS principles and design', 'images/os.jpg', NOW(), NOW()),
('Introduction to Algorithms', '978-0262033848', 4, 2, 'CSE', 'Reference', 'Comprehensive algorithms textbook', 'images/algorithm.png', NOW(), NOW());

-- Insert sample authors
INSERT INTO authors (name, biography, created_at) VALUES
('Raghu Ramakrishnan', 'Database systems expert', NOW()),
('Ian Sommerville', 'Software engineering researcher', NOW()),
('Andrew S. Tanenbaum', 'Computer networks authority', NOW()),
('Stuart Russell', 'AI researcher at UC Berkeley', NOW()),
('Peter Norvig', 'Former Google research director', NOW()),
('Abraham Silberschatz', 'Operating systems expert', NOW()),
('Thomas H. Cormen', 'Algorithms researcher at Dartmouth', NOW());

-- Create book-author relationships
INSERT INTO book_authors (book_id, author_id) VALUES
(1, 1), (2, 2), (3, 3), (4, 4), (4, 5), (5, 6), (6, 7);

-- Insert admin user (password: admin123)
INSERT INTO users (student_id, name, email, password, department, session, role, enabled, created_at, updated_at) VALUES
('admin', 'System Administrator', 'admin@cuet.ac.bd', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administration', '2024-25', 'ADMIN', true, NOW(), NOW());

-- Insert sample student (password: student123)
INSERT INTO users (student_id, name, email, password, department, session, role, enabled, created_at, updated_at) VALUES
('2204054', 'Mohammad Hasan', 'hasan@student.cuet.ac.bd', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'CSE', '2022-23', 'STUDENT', true, NOW(), NOW());
