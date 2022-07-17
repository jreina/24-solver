import { Card, Deck } from "./deck";
import chance from "chance";
import EventEmitter from "events";
import { AnyRecord } from "dns";
import { Func } from "../types/Func";

type Round = [Card, Card, Card, Card];

interface PlayerData {
  id: string;
  score: number;
  cards: Array<Card>;
}

export enum GameEvent {
  DeckChanged = "onDeckChanged",
  PlayersChanged = "onPlayersChanged",
  DiscardsChanged = "onDiscardsChanged",
  CurrentChanged = "onCurrentChanged",
}

export class Game {
  private _deck = [...Deck];
  private _discards: Array<Card> = [];
  private _current!: Round;
  private _chance = chance();
  private _players: Array<PlayerData> = [];

  private _gameEventEmitter = new EventEmitter();

  constructor() {
    this.draw();
  }

  public draw(): void {
    this._current = this._chance.pickset(this._deck, 4) as Round;
    this._deck = this._deck.filter((item) => this._current.includes(item));
    this._discards.push(...this._current);
    this._gameEventEmitter.emit(GameEvent.CurrentChanged, this._current);
    this._gameEventEmitter.emit(GameEvent.DeckChanged, this._deck);
    this._gameEventEmitter.emit(GameEvent.DiscardsChanged, this._discards);
  }

  public get current() {
    return this._current;
  }

  public get discards() {
    return this._discards;
  }

  public get deck() {
    return this._deck;
  }

  /**
   * Adds an empty player with the specified id.
   */
  public addPlayer(id: string) {
    if (this._players.find((player) => player.id === id)) {
      throw new Error(`Player with id ${id} already exists`);
    }
    this._players.push({ id, cards: [], score: 0 });
  }

  public get gameEvents() {
    return this._gameEventEmitter;
  }

  public addListener(
    event: GameEvent.CurrentChanged,
    handler: Func<Round, void>
  );
  public addListener(
    event: GameEvent.DeckChanged | GameEvent.DiscardsChanged,
    handler: Func<Array<Card>, void>
  );
  public addListener(
    event: GameEvent.PlayersChanged,
    handler: Func<Array<PlayerData>, void>
  );
  public addListener(event: GameEvent, handler: Func<any, void>) {
    this._gameEventEmitter.on(event, handler);
  }

  public removeListener(event: GameEvent, handler: Func<AnyRecord, void>) {
    this._gameEventEmitter.off(event, handler);
  }

  public restart() {
    this._players.forEach((player) => {
      player.score = 0;
    });
    this._deck = [...Deck];
    this.draw();
    this._gameEventEmitter.emit(GameEvent.PlayersChanged, this._players);
  }
}
