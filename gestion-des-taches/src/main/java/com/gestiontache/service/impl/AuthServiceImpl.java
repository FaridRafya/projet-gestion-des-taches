package com.gestiontache.service.impl;

import com.gestiontache.dto.RegistrationRequestDTO;
import com.gestiontache.entities.Role;
import com.gestiontache.entities.User;
import com.gestiontache.repositories.RoleRepository;
import com.gestiontache.repositories.UserRepository;
import com.gestiontache.service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AuthServiceImpl implements AuthService {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private JwtEncoder jwtEncoder;

    public AuthServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JwtEncoder jwtEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtEncoder = jwtEncoder;
    }

    @Override
    public User findUserByUsername(String username) {
        User appUser=userRepository.findByUsername(username);
        if(appUser==null) throw new RuntimeException(String.format("This username %s do not exist",username));
        return appUser;
    }
    @Override
    public User findUserByUsernameOrEmail(String usernameOrEmail) {
        System.out.println(usernameOrEmail);
        User appUser=userRepository.findByUsernameOrEmail(usernameOrEmail,usernameOrEmail);
        if(appUser==null) throw new RuntimeException("Bad Credentials");
        return appUser;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }




/*    @Override
    public Role addRoleToUser(String username, String roleName, boolean deleteRequestRole) {
        User appUser=userRepository.findByUsername(username);
        if(appUser==null) throw new RuntimeException(String.format("This username %s do not exist",username));
        Role appRole=roleRepository.findByRoleName(roleName);
        if(appRole==null) throw new RuntimeException(String.format("This Role %s do not exist",roleName));
        if(appUser.getAppRoles()==null) appUser.setAppRoles(new ArrayList<>());
        appUser.getAppRoles().add(appRole);
        if(deleteRequestRole) appUser.getRequestedRoles().remove(roleName);
        return appRole;
    }*/



    @Override
    public User register(RegistrationRequestDTO requestDTO, boolean activate) {
        User appUser=userRepository.findByUsername(requestDTO.getUsername());
        if(appUser!=null) throw new RuntimeException("This username is not available");
        if(!requestDTO.getPassword().equals(requestDTO.getPassword()))
            throw new RuntimeException("Passwords not match");
        appUser=User.builder()
                .username(requestDTO.getUsername())
                .password(passwordEncoder.encode(requestDTO.getPassword()))
                .firstName(requestDTO.getFirstName())
                .lastName(requestDTO.getLastName())

                .email(requestDTO.getEmail())
                //  .status(activate?AccountStatus.ACTIVATED:AccountStatus.CREATED)
                .build();

        Role userRole = roleRepository.findByRoleName(requestDTO.getRole());
        appUser.setAppRoles(new HashSet<Role>(Arrays.asList(userRole)));


        User savedAppUser = userRepository.save(appUser);

        return savedAppUser;
    }
    @Override
    public Map<String, String> generateToken(String username, boolean withRefreshToken) {
        Map<String, String> idToken = new HashMap<>();
        Instant instant = Instant.now();
        User appUser=findUserByUsernameOrEmail(username);
        String scope=appUser.getAppRoles().stream().map(r->r.getRoleName()).collect(Collectors.joining(" "));
        JwtClaimsSet jwtClaimsSet = JwtClaimsSet.builder()
                .subject(username)
                .issuer("http://localhost:8088/auth-service")
                .expiresAt(instant.plus(withRefreshToken ? 5 : 30, ChronoUnit.MINUTES))
                .issuedAt(instant)
                .claim("scope", scope)
                .build();
        String jwtAccessToken = jwtEncoder.encode(JwtEncoderParameters.from(jwtClaimsSet)).getTokenValue();
        idToken.put("access-token", jwtAccessToken);
        if (withRefreshToken) {
            JwtClaimsSet jwtRefreshClaimsSet = JwtClaimsSet.builder()
                    .subject(username)
                    .issuer("http://localhost:8088/auth-service")
                    .expiresAt(instant.plus(30, ChronoUnit.MINUTES))
                    .issuedAt(instant)
                    .build();
            String jwtRefreshToken = jwtEncoder.encode(JwtEncoderParameters.from(jwtRefreshClaimsSet)).getTokenValue();
            idToken.put("refresh-token", jwtRefreshToken);
        }
        return idToken;
    }
}
