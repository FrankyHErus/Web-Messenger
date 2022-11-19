//page
import { AuthPage } from "./pages/Auth/authPage"
import { ChatPage } from "./pages/Chat/chatPage"
import { RegPage } from "./pages/Reg/regPage"
import { SettPage } from "./pages/Settings/settPage"
import { NFPage } from "./pages/404/404Page"
import { SPPage } from "./pages/505/505Page"
import  Router  from "./utils/router";
import { ChatBtnList } from "./components/chatBtn/chatBtn"
import { Message } from "./components/msg/message"
import { ChatProps } from "./components/chatBtn/chatBtn"
import authController from "./controllers/authController"
import messController from "./controllers/messController"
import authApi, { SignupData } from "./api/authApi"
import { SigninData } from "./api/authApi"
import settController from "./controllers/settController"
import settApi, { UserPassword } from "./api/settApi"
import router from "./utils/router"


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

function checkString(regex : RegExp, el : HTMLInputElement, incorrectMessage : string){
    if(regex.test(el.value)){
        inputData.set(el.name, el.value);
        el.style.border= "1px solid #000"
        el.nextElementSibling!.textContent = "";
    }else{
        inputData.set(el.name, el.value);
        el.style.border = "1px solid #ff0000"
        el.nextElementSibling!.textContent = incorrectMessage;
    }
}

function updateMessages(msgData : ServerMsgData[]){

    let arr : object[] = [];

    if(Array.isArray(msgData)){
        for(let i = msgData.length - 1; i >= 0; i--){
            let fromUserBool = false;
            let username = "";
            if(msgData[i]["user_id"] == Number(getCookie("id"))){
                fromUserBool = true;
                arr.push({"fromUser" : fromUserBool ,"from": "You", "text": msgData[i].content});

                let data = new Message({messages : arr});

                document.getElementById("message-block")?.replaceChildren(data.getContent()!);
            }else{
                settApi.getUser(msgData[i].user_id).then((userData : any) => {
                    console.log(userData);
                    username = (userData["display_name"]) ? userData["display_name"] : msgData[i]["user_id"];
                    console.log(username);
                    arr.push({"fromUser" : fromUserBool ,"from": username, "text": msgData[i].content});
                    
                    let data = new Message({messages : arr});

                    document.getElementById("message-block")?.replaceChildren(data.getContent()!);
                })
            }
        }
    }else{
        arr.push({"fromUser" : true, "from": "You", "text": msgData["content"]});

        let data = new Message({messages : arr});

        document.getElementById("message-block")?.append(data.getContent()!);
    }
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
                        checkString(/^[a-zA-Z0-9-_]{3,20}$/gm, el, "Digits, letters and \"-_\" only!");
                        break;
                    case 'password':
                        checkString(/^(?=.*\d)(?=.*[A-Z]).{8,40}$/gm, el, "Length: 8-40! At least 1 digit and capital letter!");
                        break;
                    case 'first_name':
                    case 'second_name':
                        checkString(/^[A-ZА-Я]{1}[a-zа-я]*$/gm, el, "Only letters and exactly 1 capital letter on the first position!")
                        break;
                    case 'email':
                        checkString(/^[a-zA-Z0-9-_]*@{1}[a-zA-Z]+\.{1}[a-zA-Z0-9-_]*$/gm, el, "Invalid email! Example: tempmail@mail.com")
                        break;
                    case 'phone':
                        checkString(/^\+?\d{10,15}$/gm, el, "\"+\" on the first position and 10-15 digits only!");
                        break;
                    case 'message':
                        checkString(/^.+$/gm, el, "");
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

    if(!getCookie("id") && path != '/sign-in' && path != '/sign-up'){
        router.go("/sign-in");
        renderPage();
    }

    if(path == '/messenger') {
        let activeChat : string;

        let socket : WebSocket;
        messController.read().then(token => {

            authApi.read().then((data) => {
                if(data["avatar"] != null && data["avatar"] != "" && data["avatar"] != undefined){

                    let imgUrl = "url('https://ya-praktikum.tech/api/v2/resources" + data["avatar"] + "')";
                    document.getElementById("userAvatar")!.style.backgroundImage = imgUrl;
                }
            })

            if(token != undefined){
                let chatProps : ChatProps[] = [];

                let idList : string[] = [];
                let nameList : string[] = [];
                let avatarsList : string[] = [];

                token.forEach(el => {
                    chatProps.push({avatarUrl : el["avatar"], username : el["title"], lastMsg : (!el["last_message"]) ? " " : el["last_message"]["content"]}); 
                    idList.push(el["id"].toString());
                    nameList.push(el["title"]);
                    avatarsList.push(el["avatar"]);
                });

                const chatList = new ChatBtnList({chats : chatProps});
                document.getElementById("chat-list")?.append(chatList.getContent()!);
                let nodes = document.querySelector(".chat-list")?.querySelectorAll(":scope > li");
                if(nodes){
                    for(let i = 0; i < nodes.length; i++){
                        nodes[i].id = idList[i];
                        if(avatarsList[i] != null && avatarsList[i] != "" && avatarsList[i] != undefined){
                            (<HTMLElement>nodes[i].querySelector('.avatar')).style.backgroundImage = "url('https://ya-praktikum.tech/api/v2/resources" + avatarsList[i] + "')";
                        }
                        nodes[i].addEventListener("click", () => {
                            nodes?.forEach(el => {
                                el.className = "";
                            });
                            document.getElementById(idList[i])!.className = "activeChat";

                            document.getElementById("message-block")!.innerHTML = "";
                            
                            activeChat = idList[i];
                            
                            document.querySelector(".chatContent")!.querySelector(".header")!.querySelector(".usernameTitle")!.textContent = nameList[i];

                            (<HTMLElement>document.querySelector(".chatContent")!.querySelector(".header")!.querySelector(".avatar")!).style.backgroundImage = "url('https://ya-praktikum.tech/api/v2/resources" + avatarsList[i] + "')";

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

        let opened = false;
        document.getElementById("contextOpener")!.onclick = () => {
            if(opened){
                document.getElementById("contextMenu")!.classList.add("hidden");
                opened = false;
            }else{
                document.getElementById("contextMenu")!.classList.remove("hidden");
                opened = true;
            }
        }

        document.getElementById("addUser")!.onclick = () => {
            let userId = prompt("Enter ID of user");
            if(userId != null && userId != ""){
                messController.addUser({"users" : [Number(userId)], "chatId": Number(activeChat)}).then(() => {
                    location.reload();
                });
            }
        }
        document.getElementById("removeUser")!.onclick = () => {
            let userId = prompt("Enter ID of user");
            if(userId != null && userId != ""){
                messController.removeUser({"users" : [Number(userId)], "chatId": Number(activeChat)}).then(() => {
                    location.reload();
                });
            }
        }
        document.getElementById("deleteChat")!.onclick = () => {
                messController.deleteChat({"chatId": Number(activeChat)}).then(() => {
                    location.reload();
                });
        }

        document.getElementById("chatImageLink")!.onclick = () => {
            document.getElementById("file")?.click();
        }

        let chatForm : HTMLFormElement =  <HTMLFormElement>document.getElementById('fileForm')!;

        chatForm.onchange = async (e) => {
            const formData = new FormData(chatForm);
            const target : HTMLInputElement = e.target as HTMLInputElement;
            formData.append("chatId", activeChat)
            if(target.files){
                formData.append("avatar", target.files[0]);
            }
            messController.setAvatar(formData).then(() => {
                renderPage()
            });
        }

    }else if(path == '/sign-in'){

        if(getCookie("id")){
            router.go("/messenger");
            renderPage();
        }

        document.getElementById("loginBtn")?.addEventListener("click", () => {

            let values = Object.values(document.querySelectorAll("input")).map((child) => ([child.name, child.value]));

            const data = Object.fromEntries(values);

            authController.logout();

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

            let imgUrl = "url('https://ya-praktikum.tech/api/v2/resources" + data["avatar"] + "')";

            document.getElementById("avatarBtn")!.style.backgroundImage = imgUrl;
            
            (<HTMLInputElement>document.getElementsByName("first_name")[0]).value = data["first_name"];
            (<HTMLInputElement>document.getElementsByName("second_name")[0]).value = data["second_name"];
            (<HTMLInputElement>document.getElementsByName("display_name")[0]).value = data["display_name"];
            (<HTMLInputElement>document.getElementsByName("phone")[0]).value = data["phone"];
            (<HTMLInputElement>document.getElementsByName("email")[0]).value = data["email"];
            (<HTMLInputElement>document.getElementsByName("login")[0]).value = data["login"];
        })

        document.getElementById("avatarBtn")!.onclick = () => {
            document.getElementById('fileId')!.click();
        }

        let formEl : HTMLFormElement =  <HTMLFormElement>document.getElementById('fileForm')!;

        formEl.onchange = async (e) => {
            const target : HTMLInputElement = <HTMLInputElement>e.target;
            const formData = new FormData(formEl);
            if(target.files){
                formData.append("avatar", target.files[0]);
            }
            settController.changeAvatar(formData).then(() => {
                renderPage()
            });
        }

        document.getElementById("settSubmitBtn")!.onclick = () =>{
            
            let values = (<HTMLInputElement[]>Object.values(document.querySelectorAll("input:not([name='oldPassword']):not([name='newPassword'])"))).map((child) => ([child.name, child.value]));

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

        document.getElementById("backBtn")!.onclick = () => {
            Router.back();
        }

        document.getElementById("logoutBtn")!.onclick = () => {
            authController.logout();
        }
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

