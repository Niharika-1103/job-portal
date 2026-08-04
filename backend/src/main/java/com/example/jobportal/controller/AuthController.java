package com.example.jobportal.controller;

import com.example.jobportal.dto.AuthRequest;
import com.example.jobportal.dto.AuthResponse;
import com.example.jobportal.dto.RecruiterDto;
import com.example.jobportal.dto.UserDto;
import com.example.jobportal.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody UserDto request) {
        return new ResponseEntity<>(authService.registerUser(request), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.loginUser(request));
    }

    @PostMapping("/recruiter/register")
    public ResponseEntity<AuthResponse> registerRecruiter(@Valid @RequestBody RecruiterDto request) {
        return new ResponseEntity<>(authService.registerRecruiter(request), HttpStatus.CREATED);
    }

    @PostMapping("/recruiter/login")
    public ResponseEntity<AuthResponse> loginRecruiter(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.loginRecruiter(request));
    }

    @PostMapping("/admin/login")
    public ResponseEntity<AuthResponse> loginAdmin(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.loginAdmin(request));
    }
}
