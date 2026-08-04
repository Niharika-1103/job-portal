package com.example.jobportal.service;

import com.example.jobportal.config.JwtService;
import com.example.jobportal.dto.AuthRequest;
import com.example.jobportal.dto.AuthResponse;
import com.example.jobportal.dto.RecruiterDto;
import com.example.jobportal.dto.UserDto;
import com.example.jobportal.model.Admin;
import com.example.jobportal.model.Company;
import com.example.jobportal.model.Recruiter;
import com.example.jobportal.model.Role;
import com.example.jobportal.model.User;
import com.example.jobportal.repository.AdminRepository;
import com.example.jobportal.repository.RecruiterRepository;
import com.example.jobportal.repository.RoleRepository;
import com.example.jobportal.repository.UserRepository;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final RecruiterRepository recruiterRepository;
    private final AdminRepository adminRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, RecruiterRepository recruiterRepository,
                       AdminRepository adminRepository, RoleRepository roleRepository,
                       PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.recruiterRepository = recruiterRepository;
        this.adminRepository = adminRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponse registerUser(UserDto request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setLocation(request.getLocation());
        user.setBio(request.getBio());

        Role seekerRole = roleRepository.findByName("ROLE_JOB_SEEKER")
                .orElseGet(() -> roleRepository.save(new Role("ROLE_JOB_SEEKER")));
        user.setRoles(Set.of(seekerRole));
        userRepository.save(user);
        return new AuthResponse(jwtService.generateToken(user.getUsername(), "JOB_SEEKER"), "JOB_SEEKER");
    }

    public AuthResponse loginUser(AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }
        return new AuthResponse(jwtService.generateToken(user.getUsername(), "JOB_SEEKER"), "JOB_SEEKER");
    }

    public AuthResponse registerRecruiter(RecruiterDto request) {
        Recruiter recruiter = new Recruiter();
        recruiter.setEmail(request.getEmail());
        recruiter.setPassword(passwordEncoder.encode(request.getPassword()));
        recruiter.setCompanyName(request.getCompanyName());
        recruiter.setFullName(request.getFullName());
        recruiter.setPhone(request.getPhone());
        recruiter.setLocation(request.getLocation());
        recruiter.setWebsite(request.getWebsite());

        Company company = new Company();
        company.setName(request.getCompanyName());
        company.setDescription("New company profile");
        company.setLocation(request.getLocation());
        recruiter.setCompany(company);
        recruiterRepository.save(recruiter);
        return new AuthResponse(jwtService.generateToken(request.getEmail(), "RECRUITER"), "RECRUITER");
    }

    public AuthResponse loginRecruiter(AuthRequest request) {
        Recruiter recruiter = recruiterRepository.findByEmail(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));
        if (!passwordEncoder.matches(request.getPassword(), recruiter.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }
        return new AuthResponse(jwtService.generateToken(recruiter.getEmail(), "RECRUITER"), "RECRUITER");
    }

    public AuthResponse loginAdmin(AuthRequest request) {
        Admin admin = adminRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new BadCredentialsException("Invalid credentials"));
        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }
        return new AuthResponse(jwtService.generateToken(admin.getUsername(), "ADMIN"), "ADMIN");
    }
}
