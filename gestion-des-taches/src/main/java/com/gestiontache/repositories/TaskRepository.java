package com.gestiontache.repositories;

import com.gestiontache.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {

    List<Task> findByProjetId(Long id) ;
    List<Task>  findByEtatTask(String etat);

    List<Task>  findByUsername(String username);

}
