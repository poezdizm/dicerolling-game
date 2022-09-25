package ru.poezdizm.dicerollinggame.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ApiError {
    private String error;
    private String message;
    private String path;
    private Integer status;
}
