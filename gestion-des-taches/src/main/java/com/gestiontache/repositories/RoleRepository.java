package com.gestiontache.repositories;

import com.gestiontache.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {



    Role findByRoleName(String roleName);
}
