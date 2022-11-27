import Block from '../../utils/block';
import template from './Chat.hbs';

interface chatsData {
    "avatarUrl" : string,
    "username" : string,
    "lastMsg" : string
}

interface ChatPageProps {
}
  
export class ChatPage extends Block<ChatPage> {

    constructor(props: ChatPageProps) {
        super('main', props);
        this.element?.classList.add("container-full");
    }

    render() { 
        return this.compile(template, this.props);
    }
}
