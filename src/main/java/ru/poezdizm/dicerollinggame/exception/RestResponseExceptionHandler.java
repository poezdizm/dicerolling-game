package ru.poezdizm.dicerollinggame.exception;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ru.poezdizm.dicerollinggame.model.response.ApiError;

@ControllerAdvice
public class RestResponseExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ValidationException.class})
    protected ResponseEntity<Object> handleValidationError(ValidationException ex, WebRequest request) {
        ApiError body = new ApiError(HttpStatus.BAD_REQUEST.getReasonPhrase(), ex.getMessage(),
                request.getDescription(false).replace("uri=",""),
                HttpStatus.BAD_REQUEST.value());
        return handleExceptionInternal(ex, body, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
}