package com.gestiontache.dto;

import com.gestiontache.entities.Role;
import lombok.Data;

@Data
public class RegistrationRequestDTO {

    String username;
    String firstName;
    String lastName;
    String email;
    String password; String confirmPassword;
    String role ;
}
