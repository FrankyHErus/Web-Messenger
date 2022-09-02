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

export class chatBtnList extends Block {
  constructor(props: chatBtnProps) {
    super('ul', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}