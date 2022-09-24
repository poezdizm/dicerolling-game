package ru.poezdizm.dicerollinggame.model.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class JwtResponse {
    private String token;
    private Integer id;
    private String username;
    private List<String> roles;

}