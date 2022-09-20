import Block from '../../utils/block';
import template from './500.hbs';

interface spPageProps {
}
  
export class SPPage extends Block<spPageProps> {
    constructor(props: spPageProps) {
        super('main', props);
        this.element?.classList.add("container");
    }

    render() { 
        return this.compile(template, this.props);
    }
}