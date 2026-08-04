package com.example.jobportal.repository;

import com.example.jobportal.model.Resume;
import com.example.jobportal.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    Optional<Resume> findByUser(User user);
}
