import Block from '../../utils/block';
import template from './message.hbs';

interface MessageProps {
  messages : object[]
}

export class Message extends Block<MessageProps> {
  constructor(props: MessageProps) {
    super('ul', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}
