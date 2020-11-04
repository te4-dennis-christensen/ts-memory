import { Card } from './card'

class Game {

    public cards : Card[]
    public container : HTMLElement
    public cardTemplate : HTMLTemplateElement = document.querySelector('template.card') as HTMLTemplateElement
    public flippedCards : {'obj': Card, 'el': HTMLElement}[] = []
    public matches : number = 0

    constructor(container : HTMLElement){
        this.container = container
        // const cards : string[] = ["1_pig.png", "1_pig.png"]
        const cards : string[] = ["1_pig.png", "2_squirrel.png", "3_rabbit.png", "4_frog.png", "5_fox.png", "6_bear.png", "7_monkey.png", "8_panda.png", "9_chick.png", "10_tiger.png", "11_penguin.png", "12_racoon.png", "1_pig.png", "2_squirrel.png", "3_rabbit.png", "4_frog.png", "5_fox.png", "6_bear.png", "7_monkey.png", "8_panda.png", "9_chick.png", "10_tiger.png", "11_penguin.png", "12_racoon.png"]
        this.cards = cards.map(card => new Card(card, this.cardTemplate, this.container))
        this.shuffleCards()
    }

    public run(){
        const game = this
        this.container.addEventListener('click', (e) => {game.click(e)})
        this.cards.map(card => card.render())
    }

    public async click(e : Event){
        let target = e.target as HTMLElement
        let cardHtml = target.parentElement!
        if(target.tagName != 'IMG' || cardHtml.dataset.paired === 'bananpaj'){return;}
        let uuid = cardHtml.dataset.uuid
        let cardObject = this.cards.find(card => card.uuid === uuid)!
        cardObject.flip(cardHtml)
        let t = {'obj': cardObject, 'el': cardHtml}
        this.flippedCards.push(t)
        if(this.flippedCards.length === 2){
            this.pairCheck()
        }
        if (this.matches === this.cards.length/2){
            await sleep(100)
            if(window.confirm('you won, do you want to play again?')){
                location.reload()
            }
        }
    }

    public async pairCheck(){
        let cards = this.flippedCards
        if (cards[0].obj.img === cards[1].obj.img){
            this.flippedCards.map(card => card.el.dataset.paired = 'bananpaj')
            this.flippedCards = []
            this.matches++
        } else {
            await sleep(500)
            this.flippedCards.forEach(card => {
                card.obj.flip(card.el)
            })
            this.flippedCards = []
        }
    }

    public shuffleCards(this : Game){
        for (let i = this.cards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        };
    }
}

async function sleep(time : number){
    return await new Promise(resolve => setTimeout(resolve, time));
};

export{Game}