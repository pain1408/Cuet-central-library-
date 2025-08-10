package com.cuet.library.controller;

import com.cuet.library.dto.ApiResponse;
import com.cuet.library.dto.BorrowRequest;
import com.cuet.library.entity.BorrowRecord;
import com.cuet.library.entity.User;
import com.cuet.library.entity.Book;
import com.cuet.library.service.AuthService;
import com.cuet.library.service.BorrowService;
import com.cuet.library.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/borrow")
@CrossOrigin(origins = "*")
public class BorrowController {

    @Autowired
    private BorrowService borrowService;

    @Autowired
    private AuthService authService;

    @Autowired
    private BookService bookService;

    @PostMapping
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public ResponseEntity<?> borrowBook(@Valid @RequestBody BorrowRequest borrowRequest) {
        try {
            User user = authService.getCurrentUser();
            Book book = bookService.findById(borrowRequest.getBookId())
                .orElseThrow(() -> new RuntimeException("Book not found"));
            
            BorrowRecord borrowRecord = borrowService.borrowBook(user, book);
            return ResponseEntity.ok(borrowRecord);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Failed to borrow book: " + e.getMessage()));
        }
    }

    @PostMapping("/{id}/return")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public ResponseEntity<?> returnBook(@PathVariable Long id) {
        try {
            BorrowRecord borrowRecord = borrowService.returnBook(id);
            return ResponseEntity.ok(borrowRecord);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Failed to return book: " + e.getMessage()));
        }
    }

    @PostMapping("/{id}/renew")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public ResponseEntity<?> renewBook(@PathVariable Long id) {
        try {
            BorrowRecord borrowRecord = borrowService.renewBook(id);
            return ResponseEntity.ok(borrowRecord);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Failed to renew book: " + e.getMessage()));
        }
    }

    @GetMapping("/my-books")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public ResponseEntity<List<BorrowRecord>> getMyBooks() {
        User user = authService.getCurrentUser();
        List<BorrowRecord> borrowRecords = borrowService.getUserBorrowHistory(user);
        return ResponseEntity.ok(borrowRecords);
    }

    @GetMapping("/active")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public ResponseEntity<List<BorrowRecord>> getActiveBorrows() {
        User user = authService.getCurrentUser();
        List<BorrowRecord> activeBorrows = borrowService.getActiveBorrows(user);
        return ResponseEntity.ok(activeBorrows);
    }

    @GetMapping("/overdue")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<BorrowRecord>> getOverdueRecords() {
        List<BorrowRecord> overdueRecords = borrowService.getOverdueRecords();
        return ResponseEntity.ok(overdueRecords);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT') or hasRole('ADMIN')")
    public ResponseEntity<?> getBorrowRecord(@PathVariable Long id) {
        return borrowService.findById(id)
            .map(record -> ResponseEntity.ok(record))
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getBorrowStats() {
        try {
            long activeBorrows = borrowService.getActiveBorrowCount();
            List<BorrowRecord> overdueRecords = borrowService.getOverdueRecords();
            
            return ResponseEntity.ok(new Object() {
                public final long active = activeBorrows;
                public final long overdue = overdueRecords.size();
            });
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(new ApiResponse(false, "Failed to get stats: " + e.getMessage()));
        }
    }
}
