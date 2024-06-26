package com.gestiontache.service;

import com.gestiontache.entities.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface TaskService {


    Task save(Task task) ;

    Task update(Task task) ;


    List<Task> findAll( ) ;
    List<Task> findAllByProjet(Long id ) ;

    List<Task> findByEtat(String etat) ;
    List<Task> findByUserName(String username) ;
    /**
     * Get the "id" Task.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Task> findOne(Long id)throws Error;
    void delete(Long id);

}
