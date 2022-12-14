import Block from '../../utils/block';
import template from './Chat.handlebars';
  
export class ChatPage extends Block<ChatPage> {

    constructor(props: ChatPage) {
        super('main', props);
        this.element?.classList.add("container-full");
    }

    render() { 
        return this.compile(template, this.props);
    }
}
