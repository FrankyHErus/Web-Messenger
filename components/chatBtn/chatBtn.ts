import Block from '../../utils/block';
import template from './chatBtn.handlebars';

export type ChatProps = {
  avatarUrl : string;
  username : string;
  lastMsg : string;
}

interface ChatBtnProps {
  chats : ChatProps[];
}

export class ChatBtnList extends Block<ChatBtnProps> {
  constructor(props: ChatBtnProps) {
    super('ul', props);
    this.element?.classList.add("chat-list");
    
  }

  render() {
    return this.compile(template, this.props);
  }
}
