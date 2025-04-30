package com.ghostPipe.backend.repositories;

import com.ghostPipe.backend.model.entities.Player;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

}
