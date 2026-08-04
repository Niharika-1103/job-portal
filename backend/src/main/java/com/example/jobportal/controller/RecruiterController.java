package com.example.jobportal.controller;

import com.example.jobportal.dto.JobDto;
import com.example.jobportal.model.Application;
import com.example.jobportal.model.Company;
import com.example.jobportal.model.Job;
import com.example.jobportal.model.Recruiter;
import com.example.jobportal.repository.ApplicationRepository;
import com.example.jobportal.repository.CompanyRepository;
import com.example.jobportal.repository.JobRepository;
import com.example.jobportal.repository.RecruiterRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiter")
@CrossOrigin(origins = "*")
public class RecruiterController {
    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;
    private final RecruiterRepository recruiterRepository;
    private final ApplicationRepository applicationRepository;

    public RecruiterController(JobRepository jobRepository, CompanyRepository companyRepository,
                               RecruiterRepository recruiterRepository, ApplicationRepository applicationRepository) {
        this.jobRepository = jobRepository;
        this.companyRepository = companyRepository;
        this.recruiterRepository = recruiterRepository;
        this.applicationRepository = applicationRepository;
    }

    private Company getCurrentCompany() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Recruiter recruiter = recruiterRepository.findByEmail(email).orElseThrow();
        return recruiter.getCompany();
    }

    private Job getOwnedJob(Long id) {
        Job job = jobRepository.findById(id).orElseThrow();
        Company company = getCurrentCompany();
        if (!company.getId().equals(job.getCompany().getId())) {
            throw new AccessDeniedException("Job does not belong to your company");
        }
        return job;
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<Job>> getJobs() {
        return ResponseEntity.ok(jobRepository.findByCompany(getCurrentCompany()));
    }

    @PostMapping("/jobs")
    public ResponseEntity<Job> createJob(@RequestBody JobDto request) {
        Company company = getCurrentCompany();
        Job job = new Job();
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCategory(request.getCategory());
        job.setLocation(request.getLocation());
        job.setType(request.getType());
        job.setExperience(request.getExperience());
        job.setSalaryRange(request.getSalaryRange());
        job.setCompany(company);
        return new ResponseEntity<>(jobRepository.save(job), HttpStatus.CREATED);
    }

    @PutMapping("/jobs/{id}")
    public ResponseEntity<Job> updateJob(@PathVariable Long id, @RequestBody JobDto request) {
        Job job = getOwnedJob(id);
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setCategory(request.getCategory());
        job.setLocation(request.getLocation());
        job.setType(request.getType());
        job.setExperience(request.getExperience());
        job.setSalaryRange(request.getSalaryRange());
        return ResponseEntity.ok(jobRepository.save(job));
    }

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<Void> deleteJob(@PathVariable Long id) {
        jobRepository.delete(getOwnedJob(id));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/jobs/{id}/applications")
    public ResponseEntity<List<Application>> getJobApplications(@PathVariable Long id) {
        Job job = getOwnedJob(id);
        return ResponseEntity.ok(applicationRepository.findByJob(job));
    }
}

