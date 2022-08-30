import Block from '../../utils/block';
import template from './404.hbs';

interface nfPageProps {
}
  
export class NFPage extends Block {
    constructor(props: nfPageProps) {
        super('main', props);
        this.element?.classList.add("container");
    }

    init() {
    }

    render() { 
        return this.compile(template, this.props);
    }
}