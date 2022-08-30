import Block from '../../utils/block';
import template from './Auth.hbs';
import { Form } from "../../components/form/form"

let formsData : object[] = [
    {"name": "login", "type": "text", "placeholder": "Login"}, 
    {"name": "password", "type": "password", "placeholder": "Password"}
];

interface AuthPageProps {
    class : string
}
  
export class AuthPage extends Block {
    constructor(props: AuthPageProps) {
        super('main', props);
        this.element.classList.add("container");
        this.element.classList.add("container-row");
    }

    init() {
        this.children.forms = new Form({
            data : formsData
        })
    }

    render() { 
        return this.compile(template, this.props);
    }
}