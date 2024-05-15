package com.gestiontache.dto;

public record AuthRequestDTO (
        String grantType, String username, String password, boolean withRefreshToken, String refreshToken
        ){ }

