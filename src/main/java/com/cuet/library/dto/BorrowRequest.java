package com.cuet.library.dto;

import jakarta.validation.constraints.NotNull;

public class BorrowRequest {
    @NotNull(message = "Book ID is required")
    private Long bookId;

    // Constructors
    public BorrowRequest() {}

    public BorrowRequest(Long bookId) {
        this.bookId = bookId;
    }

    // Getters and Setters
    public Long getBookId() { return bookId; }
    public void setBookId(Long bookId) { this.bookId = bookId; }
}
