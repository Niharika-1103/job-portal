package com.example.jobportal.repository;

import com.example.jobportal.model.Job;
import com.example.jobportal.model.SavedJob;
import com.example.jobportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SavedJobRepository extends JpaRepository<SavedJob, Long> {
    List<SavedJob> findByUser(User user);
    Optional<SavedJob> findByUserAndJob(User user, Job job);
}
