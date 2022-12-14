package ru.poezdizm.dicerollinggame.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.poezdizm.dicerollinggame.entity.Role;
import ru.poezdizm.dicerollinggame.entity.UserEntity;
import ru.poezdizm.dicerollinggame.model.UserModel;
import ru.poezdizm.dicerollinggame.repository.UserRepository;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder bCryptPasswordEncoder;

    private final UserStatsService statsService;

    public UserEntity getUser(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public boolean registerUser(UserModel registrationModel) {
        if (registrationModel.getUsername().isBlank() || registrationModel.getPassword().isBlank() ||
                getUser(registrationModel.getUsername()) != null) {
            return false;
        }

        UserEntity userEntity = new UserEntity();

        userEntity.setUsername(registrationModel.getUsername());
        userEntity.setPassword(registrationModel.getPassword());
        userEntity.setRoles(Collections.singleton(Role.USER));

        userEntity.setPassword(bCryptPasswordEncoder.encode(userEntity.getPassword()));

        userEntity = userRepository.save(userEntity);

        statsService.createStats(userEntity);

        return true;
    }

}
