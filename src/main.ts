import "./style.scss";
import { Game } from "./Game/Game";
import { Engine } from "./Engine/Engine";
import { CustomPhysicsScene } from "./Game/CustomPhysicsScene";

const game = new Engine(document.querySelector("#backGround") as HTMLCanvasElement, Game);
//const game = new Engine(document.querySelector("#backGround") as HTMLCanvasElement, CustomPhysicsScene);