import { Game } from "./game";

const container = document.querySelector("div.playgrid");

if (container) {
    new Game(container as HTMLElement).run();
}
