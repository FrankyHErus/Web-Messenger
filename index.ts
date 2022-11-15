//page
import { AuthPage } from "./pages/Auth/authPage"
import { ChatPage } from "./pages/Chat/chatPage"
import { RegPage } from "./pages/Reg/regPage"
import { SettPage } from "./pages/Settings/settPage"
import { NFPage } from "./pages/404/404Page"
import { SPPage } from "./pages/505/505Page"
import  Router  from "./utils/router";
import { chatBtnList } from "./components/chatBtn/chatBtn"
import { Message } from "./components/msg/message"
import { ChatProps } from "./components/chatBtn/chatBtn"
import authController from "./controllers/authController"
import messController from "./controllers/messController"
import authApi, { SignupData } from "./api/authApi"
import { SigninData } from "./api/authApi"
import { isArray } from "util"
import settController from "./controllers/settController"
import { UserPassword } from "./api/settApi"


const inputData : Map<string, string> = new Map();

interface ServerMsgData{
    "id": number, 
    "user_id": number,
    "chat_id": number, 
    "type": string, 
    "time": string, 
    "content": string, 
    "is_read": boolean,
    "file": string
}

function checkString(regex : RegExp, el : HTMLInputElement){
    if(regex.test(el.value)){
        inputData.set(el.name, el.value);
        el.style.border= "1px solid #000"
    }else{
        inputData.set(el.name, el.value);
        el.style.border = "1px solid #ff0000"
    }
}

function updateMessages(msgData : ServerMsgData[]){

    console.log("Received data: ");

    let arr : object[] = [];

    if(isArray(msgData)){
        for(let i = msgData.length - 1; i >= 0; i--){
            arr.push({"from": msgData[i].user_id, "text": msgData[i].content});
        }
    }else{
        arr.push({"from": msgData["user_id"], "text": msgData["content"]});
    }

    let data = new Message({messages : arr});

    console.log(data.getContent());
    document.getElementById("message-block")?.append(data.getContent()!);
}

function getCookie(name : string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()!.split(';').shift();
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

enum Routes {
    Index = '/',
    Auth = '/sign-in',
    Chat = '/messenger',
    Reg = '/sign-up',
    Sett = '/settings',
    p404 = '/404',
    p500 = '/505'
}

function renderPage(){
    Router
    .use(Routes.Index, AuthPage)
    .use(Routes.Auth, AuthPage)
    .use(Routes.Chat, ChatPage)
    .use(Routes.Reg, RegPage)
    .use(Routes.Sett, SettPage)
    .use(Routes.p404, NFPage)
    .use(Routes.p500, SPPage)

    Router.start();
    const path = document.location.pathname;

    if(path == '/messenger') {
        let socket : WebSocket;
        messController.read().then(token => {
            if(token != undefined){
                let chatProps : ChatProps[] = [];

                let idList : string[] = [];

                token.forEach(el => {
                    chatProps.push({avatarUrl : el["avatar"], username : el["title"], lastMsg : (!el["last_message"]) ? " " : el["last_message"]["content"]}); 
                    idList.push(el["id"].toString());
                });

                const chatList = new chatBtnList({chats : chatProps});
                document.getElementById("chat-list")?.append(chatList.getContent()!);
                let nodes = document.querySelector(".chat-list")?.querySelectorAll(":scope > li");
                if(nodes){
                    for(let i = 0; i < nodes.length; i++){
                        nodes[i].id = idList[i];
                        nodes[i].addEventListener("click", () => {
                            nodes?.forEach(el => {
                                el.className = "";
                            });
                            document.getElementById(idList[i])!.className = "activeChat";

                            document.getElementById("message-block")!.innerHTML = "";
                            

                            fetch(`https://ya-praktikum.tech/api/v2/chats/token/${idList[i]}`, {
                                method: 'POST',
                                mode: 'cors',
                                credentials: 'include',
                            })
                            .then(response => response.json())
                            .then(data => {
                                let tokenForWS = data.token;
                                let userId = getCookie("id");
                                socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${idList[i]}/${tokenForWS}`);
                                socket.addEventListener('open', () => {
                                    console.log('Соединение установлено');

                                    socket.send(JSON.stringify({
                                        content: '0',
                                        type: 'get old',
                                    }));

                                    document.getElementById("sendMsgBtn")!.onclick = () => {
                                        let text = (<HTMLInputElement>document.getElementById("message-input")!).value

                                        console.log('Message: ' + text);
                                        socket.send(JSON.stringify({
                                            content: text,
                                            type: 'message',
                                        }));

                                        (<HTMLInputElement>document.getElementById('message-input')!).value = "";
                                    }
                                });

                                socket.addEventListener('close', event => {
                                    if (event.wasClean) {
                                    console.log('Соединение закрыто чисто');
                                    } else {
                                    console.log('Обрыв соединения');
                                    }
                                
                                    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
                                });

                                socket.addEventListener('message', event => {
                                    console.log('Получены данные', event.data);
                                    updateMessages(JSON.parse(event.data));
                                });
                            });
                        });
                    }
                }

                if(document.getElementById("message-block")!.children[0]){
                    document.getElementById("message-block")!.children[0].scrollTop = document.getElementById("message-block")!.children[0].scrollHeight;
                }
            }
        });

        document.getElementById("addChat")?.addEventListener("click", () => {
            let nameOfChat = prompt("Enter the name of new chat");
            if(nameOfChat != null && nameOfChat != ""){
                messController.createChat({title : nameOfChat}).then(() => {location.reload()});
            }
        });


    }else if(path == '/sign-in'){
        authController.logout();
        document.getElementById("loginBtn")?.addEventListener("click", () => {
            let values = Object.values(document.querySelectorAll("input")).map((child) => ([child.name, child.value]));

            const data = Object.fromEntries(values);

            authController.signin(data as SigninData);
        });
    }else if(path == '/sign-up'){
        document.getElementById("signUpBtn")?.addEventListener("click", () => {
            let values = Object.values(document.querySelectorAll("input")).map((child) => ([child.name, child.value]));

            const data = Object.fromEntries(values);

            authController.signup(data as SignupData);
        })
    }else if(path == '/settings'){
        authApi.read().then((data) => {
            (<HTMLInputElement>document.getElementsByName("first_name")[0]).value = data["first_name"];
            (<HTMLInputElement>document.getElementsByName("second_name")[0]).value = data["second_name"];
            (<HTMLInputElement>document.getElementsByName("display_name")[0]).value = data["display_name"];
            (<HTMLInputElement>document.getElementsByName("phone")[0]).value = data["phone"];
            (<HTMLInputElement>document.getElementsByName("email")[0]).value = data["email"];
            (<HTMLInputElement>document.getElementsByName("login")[0]).value = data["login"];
        })

        document.getElementById("settSubmitBtn")!.onclick = () =>{
            
            let values = Object.values(document.querySelectorAll("input:not([name='oldPassword']):not([name='newPassword'])")).map((child) => ([child.name, child.value]));

            const data = Object.fromEntries(values);

            settController.changeProfile(data).then(() => {
                alert("Profile changed!");
            }).catch((e) => {
                console.log(e.message);
            });

            if((<HTMLInputElement>document.getElementsByName("newPassword")[0]).value && (<HTMLInputElement>document.getElementsByName("oldPassword")[0]).value){
                const passData : UserPassword= {
                    oldPassword : (<HTMLInputElement>document.getElementsByName("oldPassword")[0]).value, 
                    newPassword : (<HTMLInputElement>document.getElementsByName("newPassword")[0]).value}
                    settController.changePassword(passData).then(() => {
                        alert("Password changed!");
                    }).catch((e) => {
                        console.log(e.message);
                    })
            }
        };
    }else if(path == '/'){
        document.location.pathname = '/sign-in'
    }

    try{
        getAllInputData();
    }catch(err){
        console.log(err);
    }
}

window.addEventListener('DOMContentLoaded', () => {

    renderPage();

  });
  