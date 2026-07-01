package com.example.employeemanagement.exception;

/**
 * Thrown when attempting to create/update an Employee with an email
 * that already exists in the database.
 * Mapped to HTTP 409 (Conflict) by the GlobalExceptionHandler.
 */
public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }

}
