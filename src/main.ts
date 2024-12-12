import "./style.scss";
import { Game } from "./Game/Game";
import { Engine } from "./Engine/Engine";

const game = new Engine(document.querySelector("#backGround") as HTMLCanvasElement, Game);