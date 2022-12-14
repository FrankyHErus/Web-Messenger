import Block from '../../utils/block';
import template from './routePage.handlebars';

interface RoutePageProps {
  title: string;
}
  
export class RoutePage extends Block<RoutePageProps> {
  constructor(props: RoutePageProps) {
    super('div', props);
  }

  init() {
  }

  render() {
    return this.compile(template, this.props);
  }
}
