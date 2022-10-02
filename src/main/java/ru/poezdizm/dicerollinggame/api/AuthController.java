package ru.poezdizm.dicerollinggame.api;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.poezdizm.dicerollinggame.model.response.JwtResponse;
import ru.poezdizm.dicerollinggame.model.UserModel;
import ru.poezdizm.dicerollinggame.model.response.MessageResponse;
import ru.poezdizm.dicerollinggame.security.jwt.JwtUtils;
import ru.poezdizm.dicerollinggame.security.details.UserDetailsImpl;
import ru.poezdizm.dicerollinggame.service.UserService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    private final JwtUtils jwtUtils;

    @CrossOrigin(origins = "*", maxAge = 3600)
    @PostMapping("/signin")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody UserModel loginModel) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginModel.getUsername(), loginModel.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        return ResponseEntity.ok(JwtResponse.builder().token(jwt).id(userDetails.getId())
                .username(userDetails.getUsername()).roles(roles).build());
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageResponse> registerUser(@RequestBody UserModel registrationModel) {
        boolean success = userService.registerUser(registrationModel);
        if (!success) {
            return ResponseEntity.badRequest().body(new MessageResponse("User was not registered"));
        }

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}