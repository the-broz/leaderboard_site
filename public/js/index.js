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
                    const signInButton = document.getElementsByClassName("dropbtn")[0]
                               const starCountRef = ref(database, 'users/');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  thedata = data;
          for (var i = 0; i < Object.keys(thedata).length; i++){
                          
            if (thedata[Object.keys(thedata)[i]].securityToken == getCookie("SECURITYTOKEN_DONOTSHARE")){
                // thats it!
                console.log("correct")
                signInButton.innerHTML = Object.keys(thedata)[i]
                signInButton.onclick = myFunction;
            }else{
            
            }
        }

},{
  onlyOnce: true
});

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}