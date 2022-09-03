import Block from '../../utils/block';
import template from './chatBtn.hbs';

export type ChatProps = {
  avatarUrl : string;
  username : string;
  lastMsg : string;
}

interface chatBtnProps {
  chats : ChatProps[];
}

export class chatBtnList extends Block<chatBtnProps> {
  constructor(props: chatBtnProps) {
    super('ul', props);
    this.element?.classList.add("chat-list")
  }

  render() {
    return this.compile(template, this.props);
  }
}