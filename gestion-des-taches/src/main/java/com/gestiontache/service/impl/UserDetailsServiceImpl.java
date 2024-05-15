package com.gestiontache.service.impl;


import com.gestiontache.service.AuthService;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private AuthService authService;
    public UserDetailsServiceImpl(AuthService authService) {
        this.authService = authService;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.gestiontache.entities.User appUser=authService.findUserByUsernameOrEmail(username);
        Collection<GrantedAuthority> authorities=appUser.getAppRoles()
                .stream().map(appRole -> new SimpleGrantedAuthority(appRole.getRoleName()))
                .collect(Collectors.toList());
        return new User(username, appUser.getPassword(), authorities);
    }
}

