package com.gestiontache.web;


import com.gestiontache.entities.Task;
import com.gestiontache.service.TaskService;
import org.apache.tomcat.util.http.HeaderUtil;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class TaskController {

    private TaskService taskService;

    public TaskController(TaskService taskService) {

        this.taskService = taskService;
    }


    @PostMapping("/task")
    public ResponseEntity<Task> createTask(@RequestBody Task task) throws URISyntaxException {
      /*  log.debug("REST request to save Anp : {}", task);
        if ( task.getId() != null) {
            throw new TechnicalError(Error.ENTITY_EXIST_MESSAGE,Error.ENTITY_EXIST,ENTITY_NAME);
        }*/
        Task  result = taskService.save(task);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping("/task/id")
    public ResponseEntity<Task> update(@PathVariable Long id, @RequestBody Task task) {
        Task  result = taskService.update(task);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    @GetMapping("/task")
    public ResponseEntity<List<Task>> getAllTask( ) {
       List<Task> page = taskService.findAll();
        return ResponseEntity.ok().body(page);
    }


    @GetMapping("/task/etat/{username}")
    public ResponseEntity<List<Task>> getTaskByusername(@PathVariable String username) {
        try {
            List<Task> page = taskService.findByUserName(username);
            return ResponseEntity.ok().body(page);
        } catch (IllegalArgumentException e) {
            // Gérer le cas où l'état n'est pas valide
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            // Gérer d'autres exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/task/projet/{id}")
    public ResponseEntity<List<Task>> getTaskByProjet(@PathVariable Long id) {
        List<Task> page = taskService.findAllByProjet(id);
        return ResponseEntity.ok().body(page);
    }


    @GetMapping(path = "/task/{id}")
    public ResponseEntity<Task> read(@PathVariable Long id) {
        Optional<Task> task= taskService.findOne(id);
        return new ResponseEntity<>(task.get(),HttpStatus.OK);
    }

}
