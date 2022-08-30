import Block from '../../utils/block';
import template from './chatBtn.hbs';

interface chatBtnProps {
  chats : object[];
}

export class chatBtnList extends Block {
  constructor(props: chatBtnProps) {
    super('ul', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}