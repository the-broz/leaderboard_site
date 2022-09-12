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

function removeItem(sKey, sPath, sDomain) {
  document.cookie = encodeURIComponent(sKey) + 
                "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + 
                (sDomain ? "; domain=" + sDomain : "") + 
                (sPath ? "; path=" + sPath : "");
}
      
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
                     const database = getDatabase();
                     var thedata = undefined;
                    const loggedIn = document.getElementsByClassName("logged")[0]
                    const oldPass = document.getElementById("old");
                    const newPass = document.getElementById("new");
                    const confirmPass = document.getElementById("confirm");
                    const button = document.getElementById("reset_pass");
                    const incorrect = document.getElementById("incorrect");
                    const mismatch = document.getElementById("mismatch");
                               const starCountRef = ref(database, 'users/');
var user
var userName
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  thedata = data;
          var loggedin = false
          for (var i = 0; i < Object.keys(thedata).length; i++){
                          
            if (thedata[Object.keys(thedata)[i]].securityToken == getCookie("SECURITYTOKEN_DONOTSHARE")){
                // thats it!
                user = thedata[Object.keys(thedata)[i]]
                      userName = Object.keys(thedata)[i]
                
                loggedin = true;
                
            }else{
                   
            }
        }
          if (!loggedIn){
                 location.replace("https://leaderboardsite.herokuapp.com/login")    
          }

},{
  onlyOnce: true
});

button.addEventListener("click",function(e){
e.preventDefault();
     if (user.password == oldPass.value){
                incorrect.style.display = "none";
                if (newPass.value == confirmPass.value){
                mismatch.style.display = "none";
                          const updates = {};
          updates['/users/'+userName+'/password'] = newPass.value;
                          update(ref(database),updates);
                          location.replace("https://leaderboardsite.herokuapp.com/")
                }else{
                          console.log("MISMATCH")
                mismatch.style.display = "block";
                }
                }else{
                          console.log("INCORRECT")
                    incorrect.style.display = "block";
                }
})
