package ru.poezdizm.dicerollinggame.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.poezdizm.dicerollinggame.entity.Role;
import ru.poezdizm.dicerollinggame.entity.User;
import ru.poezdizm.dicerollinggame.model.LoginModel;
import ru.poezdizm.dicerollinggame.repository.UserRepository;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder bCryptPasswordEncoder;

    public User getUser(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public boolean registerUser(LoginModel registrationModel) {
        if (registrationModel.getUsername().isBlank() || registrationModel.getPassword().isBlank() ||
                getUser(registrationModel.getUsername()) != null) {
            return false;
        }

        User user = new User();

        user.setUsername(registrationModel.getUsername());
        user.setPassword(registrationModel.getPassword());
        user.setRoles(Collections.singleton(Role.USER));

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        userRepository.save(user);
        return true;
    }

}
