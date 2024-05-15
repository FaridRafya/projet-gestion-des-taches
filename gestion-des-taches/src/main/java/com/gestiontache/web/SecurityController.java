package com.gestiontache.web;

import com.gestiontache.dto.AuthRequestDTO;
import com.gestiontache.dto.RegistrationRequestDTO;
import com.gestiontache.entities.User;
import com.gestiontache.service.AuthService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@Slf4j
public class SecurityController {


    private AuthService authenticationService;
    private AuthenticationManager authenticationManager;
    private JwtEncoder jwtEncoder;
    private JwtDecoder jwtDecoder;

    public SecurityController(AuthService authenticationService, AuthenticationManager authenticationManager, JwtEncoder jwtEncoder, JwtDecoder jwtDecoder) {
        this.authenticationService = authenticationService;
        this.authenticationManager = authenticationManager;
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
    }
    @PostMapping(path = "/public/register")
    public User register(@RequestBody RegistrationRequestDTO requestDTO){
        return  this.authenticationService.register(requestDTO,false);
    }
    @GetMapping("/test")
    //  @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public Map<String,Object> test(Authentication authentication) {
        return Map.of("message","message testing securityy"
                ,"authentication",authentication);    }

    @GetMapping("/messageTest")
    // @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public Map<String,Object> messageTest(Authentication authentication) {
        return Map.of("message","message testing securityy"
                ,"authentication",authentication);    }

    @PostMapping("/token")
    public Map<String,String> token(Authentication authentication){
        String username = authentication.getName();
        return authenticationService.generateToken(username,false);
    }

    @PostMapping("/public/auth")
    public ResponseEntity<Map<String,String>> auth(AuthRequestDTO authRequestDTO , HttpServletRequest request){
        String username = authRequestDTO.username();
        String granType = authRequestDTO.grantType();

        if (granType == null)
            return new ResponseEntity<>(Map.of("errorMessage", "grantType is required"), HttpStatus.UNAUTHORIZED);

        if (granType.equals("password")){
            Authentication authentication=authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, authRequestDTO.password()));
            username = authentication.getName();
        }
        else if (granType.equals("refreshToken")){
            if (authRequestDTO.refreshToken()==null) return new ResponseEntity<>(Map.of("error message ","refreshToken is required"), HttpStatus.UNAUTHORIZED);
            Jwt decodedRefreshToken = null;
            decodedRefreshToken = jwtDecoder.decode(authRequestDTO.refreshToken());
            username = decodedRefreshToken.getClaim("username");


        } else {
            return new ResponseEntity<>(Map.of("errorMessage", String.format("GrantType %s not supported", granType)), HttpStatus.UNAUTHORIZED);
        }
        Map<String, String> idToken = authenticationService.generateToken(username, authRequestDTO.withRefreshToken());
        return ResponseEntity.ok(idToken);


    }


    @GetMapping( "/admin/users")
    //@PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<List<User> >usersList(){
        return new ResponseEntity<>(authenticationService.getAllUsers(),HttpStatus.OK) ;
    }
}
