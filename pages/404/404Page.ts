import Block from '../../utils/block';
import template from './404.handlebars';

interface nfPageProps {
}
  
export class NFPage extends Block<nfPageProps> {
    constructor(props: nfPageProps) {
        super('main', props);
        this.element?.classList.add("container");
    }

    render() { 
        return this.compile(template, this.props);
    }
}
