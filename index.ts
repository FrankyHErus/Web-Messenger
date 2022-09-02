//pages
import { RoutePage } from "./pages/RoutePage/routePage"
import { AuthPage } from "./pages/Auth/authPage"
import { ChatPage } from "./pages/Chat/chatPage"
import { RegPage } from "./pages/Reg/regPage"
import { SettPage } from "./pages/Settings/settPage"
import { NFPage } from "./pages/404/404Page"
import { SPPage } from "./pages/505/505Page"
//components
import { chatBtnList } from "./components/chatBtn/chatBtn"
import { Message } from "./components/msg/message"
//data
import { chatsData } from "./pages/Chat/chatPage"
import { messagesData } from "./pages/Chat/chatPage"


const inputData : Map<string, string> = new Map();

function checkString(regex : RegExp, el : HTMLInputElement){
    if(regex.test(el.value)){
        inputData.set(el.name, el.value);
        el.style.border= "1px solid #000"
    }else{
        inputData.set(el.name, el.value);
        el.style.border = "1px solid #ff0000"
    }
}

function getAllInputData(){
    const arr = Array.from(document.getElementsByTagName("input"));
    arr.forEach(el => {
        if(el.type != "submit") {
            el.onblur = () => {
                switch(el.name){
                    case 'login':
                        checkString(/^[a-zA-Z0-9-_]{3,20}$/gm, el);
                        break;
                    case 'password':
                        checkString(/^(?=.*\d)(?=.*[A-Z]).{8,40}$/gm, el);
                        break;
                    case 'first_name':
                    case 'second_name':
                        checkString(/^[A-ZА-Я]{1}[a-zа-я]*$/gm, el)
                        break;
                    case 'email':
                        checkString(/^[a-zA-Z0-9-_]*@{1}[a-zA-Z]+\.{1}[a-zA-Z0-9-_]*$/gm, el)
                        break;
                    case 'phone':
                        checkString(/^\+?\d{10,15}$/gm, el);
                        break;
                    case 'message':
                        checkString(/^.+$/gm, el);
                        break;
                }
                inputData.set(el.name, el.value);
            }
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')!;

    const path = document.location.pathname;

    switch(path){

        case '/':
            const routePage = new RoutePage({ title : "Route page"});
  
            root.append(routePage.getContent()!);
          
            routePage.dispatchComponentDidMount();

            break;

        case '/Auth/Auth.hbs':
            const authPage = new AuthPage({ class : "container"});
  
            root.append(authPage.getContent()!);

            break;
        
        case '/Chat/Chat.hbs':

            const chatPage = new ChatPage({});
            root.append(chatPage.getContent()!);

            const chatList = new chatBtnList({chats : chatsData})
            document.getElementById("chat-list")?.append(chatList.getContent()!);

            const messages = new Message({messages : messagesData})
            document.getElementById("message-block")?.append(messages.getContent()!)
          
            chatPage.dispatchComponentDidMount();

            break;
    
        case '/Reg/Reg.hbs':
            const regPage = new RegPage({});
            root.append(regPage.getContent()!);
          
            regPage.dispatchComponentDidMount();
            break;
    
        case '/Settings/Settings.hbs' :
            const settPage = new SettPage({});
            root.append(settPage.getContent()!);
          
            settPage.dispatchComponentDidMount();
            break;

        case '/404/404.hbs' :
            const nfPage = new NFPage({});
            root.append(nfPage.getContent()!);
            
            nfPage.dispatchComponentDidMount();
            break;

        case '/505/500.hbs' :

            const spPage = new SPPage({});
            root.append(spPage.getContent()!);
            
            spPage.dispatchComponentDidMount();
            break;    
    }

    try{
        getAllInputData();
    }catch(err){
        console.log(err);
    }
  });
