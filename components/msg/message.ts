import Block from '../../utils/block';
import template from './message.hbs';

interface MessageProps {
  messages : object[]
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super('section', props);

    this.element?.classList.add("wrapper");
  }

  render() {
    return this.compile(template, this.props);
  }
}