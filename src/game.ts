import { Card } from './card'

class Game {

    public cards : Card[]
    public container : Element
    public cardTemplate : Element = document.querySelector('.card')!

    constructor(container : Element){
        this.container = container
        const cards : string[] = ["1_pig.png", "2_squirrel.png", "3_rabbit.png", "4_frog.png", "5_fox.png", "6_bear.png", "7_monkey.png", "8_panda.png", "9_chick.png", "10_tiger.png", "11_penguin.png", "12_racoon.png"]
        this.cards = cards.map(card => new Card(card, this.cardTemplate))
        this.cards = this.shuffle(this.cards)
    }

    public run(){
        this.container.addEventListener('click', this.click)
        this.cards.map(card => card.render())
    }

    public click(){

    }

    public shuffle(list : any[]){
        for (let i = list.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        };
        return list
    }
}

export{Game}