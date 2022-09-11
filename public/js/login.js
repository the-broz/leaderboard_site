var loginButton = document.getElementById("submit")
var usernameField = document.getElementById("username")
var passwordField = document.getElementById("password")

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-analytics.js";
                     import { onValue, getDatabase, ref, child, push, update } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-database.js";
  const firebaseConfig = {
    apiKey: "AIzaSyCQEOWjysLQNGwDemk-jp4k3cWdAuitHZw",
    authDomain: "leaderboards-site.firebaseapp.com",
    databaseURL: "https://leaderboards-site-default-rtdb.firebaseio.com",
    projectId: "leaderboards-site",
    storageBucket: "leaderboards-site.appspot.com",
    messagingSenderId: "943539476503",
    appId: "1:943539476503:web:82e4398689311b3fec2452",
    measurementId: "G-D16RW8RJYM"
  };
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
                     const database = getDatabase();
                     var thedata = undefined;
                    function getLoginData(){
                               const starCountRef = ref(database, 'users/');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  thedata = data;
          for (var i = 0; i < Object.keys(thedata).length; i++){
                    
                    
            if (thedata[Object.keys(thedata)[i]].securityToken == getCookie("SECURITYTOKEN_DONOTSHARE")){
                // thats it!
                console.log("correct")
                loginButton.value = "Logging in..."
                      location.replace('http://localhost:3000/');
              
            }else{
            console.log("TOKEN NO LONGER VALID.")
            }
        }

},{
  onlyOnce: true
});
                    }

                    getLoginData();

loginButton.addEventListener("click",attemptLogin,false);

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function attemptLogin(e){
    e.preventDefault();
    getLoginData();
    console.log(thedata);
          
          
    for (var i = 0; i < Object.keys(thedata).length; i++){
        console.log(usernameField.value)
        console.log("the "+thedata[usernameField.value])
        if (thedata[usernameField.value] != undefined){
            console.log("help")
            if (thedata[usernameField.value].password == passwordField.value){
                // thats it!
                      var randomId = makeid(15);
                      const updates = {};
          updates['/users/'+usernameField.value+'/securityToken'] = randomId;
                console.log("correct")
                loginButton.value = "Logging in..."
                document.cookie = "SECURITYTOKEN_DONOTSHARE="+randomId+"; expires=Thu, 30 Dec 2040  12:00:00 UTC";
                      location.replace('http://localhost:3000/');
                      update(ref(database),updates);
            }
        }
           
    }
         
}