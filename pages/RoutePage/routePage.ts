import Block from '../../utils/block';
import template from './RoutePage.hbs';

interface RoutePageProps {
    title: string;
  }
  
  export class RoutePage extends Block {
    constructor(props: RoutePageProps) {
      super('div', props);
    }
  
    init() {
    }
  
    render() {
      return this.compile(template, this.props);
    }
  }