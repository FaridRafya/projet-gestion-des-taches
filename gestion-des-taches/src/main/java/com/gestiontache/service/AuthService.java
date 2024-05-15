package com.gestiontache.service;

import com.gestiontache.dto.RegistrationRequestDTO;
import com.gestiontache.entities.Role;
import com.gestiontache.entities.User;

import java.util.List;
import java.util.Map;

public interface AuthService {


    User findUserByUsername(String username);
    User findUserByUsernameOrEmail(String usernameOrEmail);
    List<User> getAllUsers();
    User register(RegistrationRequestDTO requestDTO, boolean activate);
    Map<String,String> generateToken(String username, boolean generateRefreshToken);


}
