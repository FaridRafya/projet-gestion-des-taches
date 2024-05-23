package com.gestiontache.service.impl;

import com.gestiontache.entities.Task;
import com.gestiontache.entities.User;
import com.gestiontache.repositories.TaskRepository;
import com.gestiontache.repositories.UserRepository;
import com.gestiontache.service.TaskService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceimpl implements TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskServiceimpl(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Task save(Task task) {
        User user = userRepository.findByUsername(task.getUsername());
        task.setUser(user);
        task = taskRepository.save(task);
        return task;
    }

    @Override
    public Task update(Task task)  {

        task = taskRepository.save(task);
        return task;
    }


    @Override
    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    @Override
    public List<Task> findAllByProjet(Long id) {
        return taskRepository.findByProjetId(id);
    }

    @Override
    public List<Task> findByEtat(String etat) {
        return taskRepository.findByEtatTask(etat);
    }

    @Override
    public List<Task> findByUserName(String username) {
        return taskRepository.findByUsername(username);
    }

    @Override
    public Optional<Task> findOne(Long id) throws Error {
        return taskRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
    taskRepository.deleteById(id);
    }
}
