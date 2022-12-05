Данный веб-проект - мессенджер. Подключен webpack, используется лоадер для handlebars, подключен лоадер для scss. 

Является SPA, подключен TypeScript. Код проходит проверки ESLint (наследуются правила Airbnb), также одключен Stylelint.

Присутствует Dockerfile для сборки проекта.

Подключен precommit при помощи Husky. Пакеты обновлены до последней версии

Команды для запуска:

    "build:dev": "webpack --mode=development",
    "build:prod": "webpack --mode=production --define-process-env-node-env=production"
    (собирает проект при помощи сборщика webpack)

    "serve": "webpack serve"
    (запускает проект на http://localhost:8080)

Ссылка на дизайн в Figma:
https://www.figma.com/file/KMFGI1h7pylLzD8G0NITfr/Chat-Design

Также сайт задеплоен на Render.com:
https://web-messenger.onrender.com
