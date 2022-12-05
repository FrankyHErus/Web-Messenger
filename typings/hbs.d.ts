declare module "*.handlebars" {
    import { TemplateDelegate } from 'handlebars';
  
    declare const template: TemplateDelegate;
  
    export default template;
  }
  