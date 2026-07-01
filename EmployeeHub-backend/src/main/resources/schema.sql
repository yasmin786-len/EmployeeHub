-- ============================================================
-- Employee Management System - Database Schema
-- ============================================================
-- NOTE: This file is provided for reference only.
-- Hibernate (spring.jpa.hibernate.ddl-auto=update) will automatically
-- create/update the `employees` table when the Spring Boot app starts.
-- You only need to create the database itself; running this script
-- manually is optional.
-- ============================================================

CREATE DATABASE IF NOT EXISTS employee_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE employee_db;

CREATE TABLE IF NOT EXISTS employees (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    first_name      VARCHAR(50)     NOT NULL,
    last_name       VARCHAR(50)     NOT NULL,
    email           VARCHAR(100)    NOT NULL UNIQUE,
    phone           VARCHAR(20)     NOT NULL,
    department      VARCHAR(50)     NOT NULL,
    designation     VARCHAR(50)     NOT NULL,
    salary          DECIMAL(12,2)   NOT NULL,
    joining_date    DATE            NOT NULL,
    status          VARCHAR(20)     NOT NULL DEFAULT 'ACTIVE',
    created_at      DATETIME        NOT NULL,
    CONSTRAINT chk_employees_status CHECK (status IN ('ACTIVE', 'INACTIVE')),
    CONSTRAINT chk_employees_salary CHECK (salary > 0)
);

-- ============================================================
-- Sample seed data (optional)
-- ============================================================
INSERT INTO employees
    (first_name, last_name, email, phone, department, designation, salary, joining_date, status, created_at)
VALUES
    ('Aarav', 'Sharma', 'aarav.sharma@example.com', '+91-9876543210', 'Engineering', 'Senior Software Engineer', 95000.00, '2022-03-15', 'ACTIVE', NOW()),
    ('Priya', 'Verma', 'priya.verma@example.com', '+91-9876543211', 'Human Resources', 'HR Manager', 72000.00, '2021-07-01', 'ACTIVE', NOW()),
    ('Rohan', 'Mehta', 'rohan.mehta@example.com', '+91-9876543212', 'Finance', 'Financial Analyst', 65000.00, '2023-01-10', 'ACTIVE', NOW()),
    ('Sneha', 'Iyer', 'sneha.iyer@example.com', '+91-9876543213', 'Marketing', 'Marketing Lead', 78000.00, '2020-11-20', 'INACTIVE', NOW()),
    ('Vikram', 'Nair', 'vikram.nair@example.com', '+91-9876543214', 'Engineering', 'DevOps Engineer', 88000.00, '2022-09-05', 'ACTIVE', NOW());
