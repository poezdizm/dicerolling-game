package ru.poezdizm.dicerollinggame.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ru.poezdizm.dicerollinggame.entity.*;
import ru.poezdizm.dicerollinggame.model.GameSimplifiedModel;
import ru.poezdizm.dicerollinggame.repository.GameRepository;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;

    private final CellService cellService;

    public List<GameSimplifiedModel> getGamesByCurrentUser(String username) {
        return gameRepository.findAllByGamePlayers_Player_Username(username)
                .stream().map(GameService::mapSimplifiedGame).toList();
    }

    public void saveGame(GameSettingsEntity settings) {
        GameEntity game = new GameEntity();
        game.setGameSettings(settings);

        Random random = new Random(settings.getSeed());

        GameToPlayerEntity player = new GameToPlayerEntity();
        player.setGame(game);
        player.setPlayer(settings.getOwner());
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

    private static GameSimplifiedModel mapSimplifiedGame(GameEntity entity) {
        return GameSimplifiedModel.builder().id(entity.getId()).title(entity.getGameSettings().getTitle()).build();
    }

}
