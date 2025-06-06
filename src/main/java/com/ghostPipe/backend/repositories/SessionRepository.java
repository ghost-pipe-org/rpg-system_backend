package com.ghostPipe.backend.repositories;

import com.ghostPipe.backend.model.entities.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends  JpaRepository<Session, Long> {
    
}