import Block from '../../utils/block';
import template from './form.hbs';

interface FormProps {
  data : object[]
}

export class Form extends Block {
  constructor(props: FormProps) {
    super('form', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}