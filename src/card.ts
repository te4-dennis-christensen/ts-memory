import {v4 as uuid} from 'uuid'

class Card{

    public img : string
    public template : HTMLTemplateElement
    public container : Element
    public uuid : string
    public flipped : boolean = false
    public paired : boolean = false
    
   
    constructor(img : string, template : HTMLTemplateElement, container : Element){
        this.img = img
        this.template = template
        this.container = container
        this.uuid = uuid()
    }

    public render(){
        const card = (this.template.content.cloneNode(true) as Element).querySelector('.card')
        card?.setAttribute('data-uuid', this.uuid)
        this.container.appendChild(card!)
    }

    public flip(card : HTMLElement){
        let img = card.querySelector('img')!
        if(this.flipped === false){
            img.src = `./img/${this.img}`
            this.flipped = true
        }else{
            img.src = `./img/back.png`
            this.flipped = false
        }
    }

}

export {Card}