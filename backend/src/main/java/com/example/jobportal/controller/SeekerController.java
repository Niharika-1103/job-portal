package com.example.jobportal.controller;

import com.example.jobportal.model.Application;
import com.example.jobportal.model.Job;
import com.example.jobportal.model.SavedJob;
import com.example.jobportal.repository.ApplicationRepository;
import com.example.jobportal.repository.JobRepository;
import com.example.jobportal.repository.SavedJobRepository;
import com.example.jobportal.repository.UserRepository;
import com.example.jobportal.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seeker")
@CrossOrigin(origins = "*")
public class SeekerController {
    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final SavedJobRepository savedJobRepository;
    private final AuthService authService;

    public SeekerController(UserRepository userRepository, JobRepository jobRepository,
                            ApplicationRepository applicationRepository, SavedJobRepository savedJobRepository,
                            AuthService authService) {
        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
        this.savedJobRepository = savedJobRepository;
        this.authService = authService;
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getJobs() {
        return ResponseEntity.ok(jobRepository.findByActiveTrue());
    }

    @PostMapping("/apply/{jobId}")
    public ResponseEntity<String> applyJob(@PathVariable Long jobId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username).orElseThrow();
        var job = jobRepository.findById(jobId).orElseThrow();
        if (applicationRepository.existsByUserAndJob(user, job)) {
            return ResponseEntity.badRequest().body("You have already applied to this job");
        }
        Application application = new Application();
        application.setUser(user);
        application.setJob(job);
        applicationRepository.save(application);
        return new ResponseEntity<>("Applied successfully", HttpStatus.CREATED);
    }

    @GetMapping("/applications")
    public ResponseEntity<List<Application>> getApplications() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username).orElseThrow();
        return ResponseEntity.ok(applicationRepository.findByUser(user));
    }

    @GetMapping("/saved")
    public ResponseEntity<List<SavedJob>> getSavedJobs() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username).orElseThrow();
        return ResponseEntity.ok(savedJobRepository.findByUser(user));
    }

    @PostMapping("/save/{jobId}")
    public ResponseEntity<String> saveJob(@PathVariable Long jobId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username).orElseThrow();
        var job = jobRepository.findById(jobId).orElseThrow();
        if (savedJobRepository.findByUserAndJob(user, job).isPresent()) {
            return ResponseEntity.badRequest().body("Job already saved");
        }
        SavedJob savedJob = new SavedJob();
        savedJob.setUser(user);
        savedJob.setJob(job);
        savedJobRepository.save(savedJob);
        return ResponseEntity.ok("Saved successfully");
    }

    @DeleteMapping("/save/{savedJobId}")
    public ResponseEntity<Void> unsaveJob(@PathVariable Long savedJobId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        var user = userRepository.findByUsername(username).orElseThrow();
        SavedJob savedJob = savedJobRepository.findById(savedJobId).orElseThrow();
        if (!savedJob.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("Saved job does not belong to you");
        }
        savedJobRepository.delete(savedJob);
        return ResponseEntity.noContent().build();
    }
}
