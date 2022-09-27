package ru.poezdizm.dicerollinggame.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.poezdizm.dicerollinggame.entity.*;
import ru.poezdizm.dicerollinggame.entity.game.*;
import ru.poezdizm.dicerollinggame.model.game.GameCellModel;
import ru.poezdizm.dicerollinggame.model.game.GameModel;
import ru.poezdizm.dicerollinggame.model.game.GameSimplifiedModel;
import ru.poezdizm.dicerollinggame.model.game.PlayerModel;
import ru.poezdizm.dicerollinggame.repository.*;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final GameSettingsRepository settingsRepository;

    private final UserRepository userRepository;

    private final CellService cellService;

    public List<GameSimplifiedModel> getGamesByCurrentUser(String username) {
        return gameRepository.findAllByGamePlayers_Player_Username(username)
                .stream().map(GameService::mapSimplifiedGame).toList();
    }

    public GameModel getGame(Long gameId, String username) throws IllegalArgumentException {
        GameEntity game = gameRepository.findById(gameId)
                .orElseThrow(() -> new IllegalArgumentException("Game was not found"));
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User was not found"));
        if (game.getGamePlayers().stream()
                .filter(player -> Objects.equals(player.getPlayer().getUsername(), username)).toList().isEmpty()) {
            game = joinGame(game, user);
        }

        return mapGame(game, user);
    }

    private GameEntity joinGame(GameEntity game, UserEntity user) throws IllegalArgumentException {
        GameBoardEntity board = game.getGameBoards().stream().filter(it -> it.getPlayer() == null)
                .findAny().orElseThrow(() -> new IllegalArgumentException("Game has no more space for players"));
        GameToPlayerEntity player = game.getGamePlayers().stream().filter(Objects::isNull)
                .findAny().orElseThrow(() -> new IllegalArgumentException("Game has no more space for players"));

        player.setPlayer(user);
        player.setPosition(0);
        board.setPlayer(user);

        return gameRepository.save(game);
    }

    public void saveGame(GameSettingsEntity settings) {
        GameEntity game = new GameEntity();
        game.setGameSettings(settings);
        game.setIsStarted(false);

        Random random = new Random(settings.getSeed());

        GameToPlayerEntity player = new GameToPlayerEntity();
        player.setGame(game);
        player.setPlayer(settings.getOwner());
        player.setPosition(0);
        game.setGamePlayers(List.of(player));

        List<GameBoardEntity> boards = new LinkedList<>();
        GameBoardEntity firstBoard = generateBoard(random, game, settings, settings.getOwner(), null);
        GameCellEntity sharedCell = null;
        if (settings.getHasSharedCell()) {
            int sharedPosition = random.nextInt(1 + settings.getMaxCellNumber());
            sharedCell = firstBoard.getGameCells()
                    .stream().filter(cell -> cell.getPosition() == sharedPosition).toList().get(0);
            sharedCell.setIsShared(true);
        }
        boards.add(firstBoard);

        if (!settings.getIsShared()) {
            for (int i = 1; i < settings.getPlayersNumber(); i++) {
                Random localRandom = new Random(settings.getSeed() + i);
                boards.add(generateBoard(localRandom, game, settings, null, sharedCell));
            }
        }
        game.setGameBoards(boards);

        gameRepository.save(game);
    }

    private GameBoardEntity generateBoard(Random random, GameEntity game, GameSettingsEntity settings,
                                          UserEntity player, GameCellEntity sharedCell) {
        GameBoardEntity board = new GameBoardEntity();
        board.setGame(game);

        int grayZoneStart = 0;
        int grayZoneEnd = 0;
        if (settings.getGrayZoneNumber() > 0) {
            grayZoneStart = 1 + random.nextInt(settings.getMaxCellNumber() - settings.getGrayZoneNumber());
            grayZoneEnd = grayZoneStart + settings.getGrayZoneNumber() - 1;
        }

        ArrayList<CellEntity> randomCells = cellService.getRandomCellList(random, settings.getMaxCellNumber());
        if (sharedCell != null && randomCells.contains(sharedCell.getCell())) {
            CellEntity cellBuffer = randomCells.get(sharedCell.getPosition() - 1);
            randomCells.set(randomCells.indexOf(sharedCell.getCell()), cellBuffer);
        }

        List<GameCellEntity> gameCells = new ArrayList<>();
        for (int i = 1; i <= settings.getMaxCellNumber(); i++) {
            GameCellEntity gameCell = new GameCellEntity();
            gameCell.setBoard(board);
            gameCell.setIsGray(i <= grayZoneEnd && i >= grayZoneStart);
            gameCell.setPosition(i);
            if (sharedCell != null && sharedCell.getPosition().equals(i)) {
                gameCell.setCell(sharedCell.getCell());
                gameCell.setIsShared(true);
            } else {
                gameCell.setCell(randomCells.get(i - 1));
                gameCell.setIsShared(false);
            }
            gameCells.add(gameCell);
        }

        board.setGameCells(gameCells);

        if (player != null) {
            board.setPlayer(player);
        }

        return board;
    }

    public void deleteGameAndSettings(Long gameId, String username) throws IllegalArgumentException {
        GameEntity gameToDelete = gameRepository.findById(gameId)
                .orElseThrow(() -> new IllegalArgumentException("Game was not found"));
        GameSettingsEntity settings = gameToDelete.getGameSettings();
        if (!Objects.equals(settings.getOwner().getUsername(), username)) {
            throw new IllegalArgumentException("User is not an owner of this game");
        }
        gameRepository.delete(gameToDelete);
        settingsRepository.delete(settings);
    }

    private static GameSimplifiedModel mapSimplifiedGame(GameEntity entity) {
        return GameSimplifiedModel.builder().id(entity.getId()).title(entity.getGameSettings().getTitle()).build();
    }

    private static GameModel mapGame(GameEntity game, UserEntity currentPlayer) throws IllegalArgumentException {
        GameModel gameModel = GameModel.builder().id(game.getId()).title(game.getGameSettings().getTitle())
                .players(game.getGamePlayers().stream().map(GameService::mapPlayer).toList())
                .isStarted(game.getIsStarted()).build();

        GameBoardEntity board = game.getGameBoards().stream()
                .filter(it -> Objects.equals(it.getPlayer().getUsername(), currentPlayer.getUsername())).findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Game has no boards"));
        GameToPlayerEntity player = game.getGamePlayers().stream()
                .filter(it -> Objects.equals(it.getPlayer().getUsername(), currentPlayer.getUsername())).findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Game has no boards"));

        List<GameCellModel> gameCells = new ArrayList<>();
        for (GameCellEntity cell : board.getGameCells()) {
            boolean isAvailable = false;
            if (gameModel.getIsStarted() && player.getLastRoll() != null) {
                isAvailable = (player.getPosition() + player.getLastRoll().getRollValue()) == cell.getPosition();
            }
            boolean isReadable = player.getPosition() == cell.getPosition();
            gameCells.add(mapGameCell(cell, isReadable, isAvailable));
        }
        gameModel.setCells(gameCells);

        return gameModel;
    }

    private static PlayerModel mapPlayer(GameToPlayerEntity entity) {
        PlayerModel player = PlayerModel.builder().id(entity.getId()).position(entity.getPosition())
                .username(entity.getPlayer().getUsername()).build();
        if (entity.getLastRoll() != null) {
            player.setLastRollValue(entity.getLastRoll().getRollValue());
        }

        return player;
    }

    private static GameCellModel mapGameCell(GameCellEntity entity, boolean isReadable, Boolean isAvailable) {
        GameCellModel gameCell = GameCellModel.builder().id(entity.getId()).color(entity.getCell().getType().getColor())
                .isAvailable(isAvailable).isGray(entity.getIsGray()).isShared(entity.getIsShared())
                .position(entity.getPosition()).build();
        if (isReadable) {
            gameCell.setContent(entity.getCell().getContent());
        }
        return gameCell;
    }

}
