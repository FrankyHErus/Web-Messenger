import Block from '../../utils/block';
import template from './Chat.hbs';
import { chatBtnList } from "../../components/chatBtn/chatBtn"
//import { Message } from "../../components/msg/message"

export const messagesData : object[] = [
    {"from": 0, "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet euismod porttitor. Donec porta, lectus a ornare egestas, quam arcu hendrerit justo, a malesuada neque purus nec elit. Sed facilisis fringilla nulla, non commodo ipsum. In hac habitasse platea dictumst. Praesent non leo facilisis, hendrerit sapien efficitur, laoreet mauris. Nam vitae blandit diam. Nam auctor est mauris, a dapibus erat egestas quis. Fusce eu porta turpis. Proin quis erat est. Duis et turpis consectetur, rhoncus erat nec, porttitor dui."},
    {"from": 0, "text": "Cras dolor neque, aliquam id sagittis vitae, maximus eget nunc. Curabitur egestas, mi sit amet tincidunt placerat, mauris sapien suscipit sapien, eget aliquam magna mauris nec odio. Etiam vel urna eget quam fringilla convallis id vitae sem."},
    {"from": 1, "text": "Cras quam ligula, pretium a erat nec, bibendum accumsan arcu. Curabitur nunc ante, tincidunt sit amet nibh at, ullamcorper volutpat mi. Donec a vestibulum nisi, vel placerat quam. Quisque et velit rutrum, aliquam urna ac, varius justo."},
    {"from": 1, "text": "Donec sollicitudin hendrerit enim, et eleifend velit sagittis eget. Vivamus interdum pretium nisi, vel ornare sapien ornare ac. Phasellus vulputate nisl non sodales dignissim. Vestibulum justo felis, gravida a ultrices at, pulvinar sed purus. Curabitur commodo velit mi, ac malesuada eros luctus quis."},
    {"from": 0, "text": "Vivamus et aliquam turpis. Nullam ultrices, quam in tristique aliquam, justo elit commodo nisi, sed mollis tortor ligula quis sapien. Donec vehicula sed quam sit amet ultrices."}
];

export const chatsData : object[] = [
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
];

interface ChatPageProps {
}
  
export class ChatPage extends Block {

    constructor(props: ChatPageProps) {
        super('main', props);
        this.element.classList.add("container-full");
    }

    init() {
        this.children.list = new chatBtnList({
            chats : chatsData
        })
    }

    render() { 
        return this.compile(template, this.props);
    }
}
/*
import Handlebars from "handlebars";
import messageTemp from '../../components/msg/message.tmpl'
import chatTemp from '../../components/chatBtn/chatBtn.tmpl'

let messages : object[] = [
    {"from": 0, "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin aliquet euismod porttitor. Donec porta, lectus a ornare egestas, quam arcu hendrerit justo, a malesuada neque purus nec elit. Sed facilisis fringilla nulla, non commodo ipsum. In hac habitasse platea dictumst. Praesent non leo facilisis, hendrerit sapien efficitur, laoreet mauris. Nam vitae blandit diam. Nam auctor est mauris, a dapibus erat egestas quis. Fusce eu porta turpis. Proin quis erat est. Duis et turpis consectetur, rhoncus erat nec, porttitor dui."},
    {"from": 0, "text": "Cras dolor neque, aliquam id sagittis vitae, maximus eget nunc. Curabitur egestas, mi sit amet tincidunt placerat, mauris sapien suscipit sapien, eget aliquam magna mauris nec odio. Etiam vel urna eget quam fringilla convallis id vitae sem."},
    {"from": 1, "text": "Cras quam ligula, pretium a erat nec, bibendum accumsan arcu. Curabitur nunc ante, tincidunt sit amet nibh at, ullamcorper volutpat mi. Donec a vestibulum nisi, vel placerat quam. Quisque et velit rutrum, aliquam urna ac, varius justo."},
    {"from": 1, "text": "Donec sollicitudin hendrerit enim, et eleifend velit sagittis eget. Vivamus interdum pretium nisi, vel ornare sapien ornare ac. Phasellus vulputate nisl non sodales dignissim. Vestibulum justo felis, gravida a ultrices at, pulvinar sed purus. Curabitur commodo velit mi, ac malesuada eros luctus quis."},
    {"from": 0, "text": "Vivamus et aliquam turpis. Nullam ultrices, quam in tristique aliquam, justo elit commodo nisi, sed mollis tortor ligula quis sapien. Donec vehicula sed quam sit amet ultrices."}
];

let chats : object[] = [
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
    {"avatarUrl": "/", "username": "username", "lastMsg": "The text of last message"},
];


window.addEventListener("load", () => {
    let msgTemplate = Handlebars.compile(messageTemp);
    let chatTemplate = Handlebars.compile(chatTemp);

    let messagesEl : HTMLElement | null = document.getElementById("message-block");
    let chatListEl : HTMLElement | null = document.getElementById("chat-list");

    if(messagesEl != null){
        messagesEl.innerHTML += msgTemplate({messages})
    }

    if(chatListEl != null){
        chatListEl.innerHTML += chatTemplate({chats})
    }
});

*/