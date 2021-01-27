// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

//variable to store user input
var user1_in=''
var user2_in=''

//Specifies the language of the input text. 
var lang_from='en';

//Specifies the language of the output text. 
var lang_to='fr';

 $("document").ready( function () {
        alert("This website hasn't been optimized for mobile, please ensure it's open on a PC/Laptop.");
    }); 

var x, i, j, l, ll, selElmnt, a, b, c;

//Receives rating for the translation
let srr = document.getElementById('sr');
srr.addEventListener('click',function(){
  var rating = document.getElementById("rating");
  var rnum=rating.value;
  if(rnum<=10 && rnum>=0){
    SendData(rnum);
    alert('Thank you for your feedback.');
    rating.disabled = true;
  }
   else{
    alert('Please enter a rating from 1-10');
    rating.disabled = false;
  }
  console.log(rnum);
});

//Dropdown customization
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];

        if(s.id=='l'){

        if (this.innerHTML=="French"){
          lang_from='fr'
        }
        else if(this.innerHTML=="Spanish"){
          lang_from='es'
        }
        else if(this.innerHTML=="Hindi"){
          lang_from='hi'
        }
        else if(this.innerHTML=="English"){
          lang_from='en'
        }
        }
      
        if(s.id=='r') {
          
      
        if (this.innerHTML=="French"){
          lang_to='fr'
        }
        else if(this.innerHTML=="Spanish"){
          lang_to='es'
        }
        else if(this.innerHTML=="Hindi"){
          lang_to='hi'
        }
        else if(this.innerHTML=="English"){
          lang_to='en'
        }
        
        }  
        console.log("got from func:"+this.innerHTML+s.id)
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);



//Adding Enter for textArea1
var lin = document.getElementById("lin");

// Execute a function when the user releases a key on the keyboard
lin.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
   
      // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("send1").click();
    
  }
});

//Adding Enter for textArea2
var rin = document.getElementById("rin");

// Execute a function when the user releases a key on the keyboard
rin.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("send2").click();
  }
});

//Adding Enter for Rating
var sur_send = document.getElementById("rating");

// Execute a function when the user releases a key on the keyboard
sur_send.addEventListener("keyup", function(event) {
  
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
   srr.click();
  }
});

//Clear button functionality
var clr=document.getElementById("cl");
clr.addEventListener('click',function(){
  console.log("clicked!!");
  var cb = document.getElementById("cbox");
  cb.innerHTML = "<div class='em'>  </div>";  
  
});
  
  
// event to capture send button click
$('#send1').click(function(e) {
  user1_in = $('.message_input').val();
  $('.message_input').val('');
  console.log("user1_in:", user1_in);
  if(user1_in===""){
    alert('Please enter some text for translation');
  }
  else{
     AddtoChat1(user1_in,'right');
  fetch("/translate?user_in="+ user1_in +"&lang_from="+lang_from+"&lang_to="+lang_to)
  .then(response=> {
    response.json().then(function(data) {
      console.log(data[0]['translations'][0].text);
      AddtoChat2(data[0]['translations'][0].text,'left');
    });
  });
  }

});

// event to capture send button2 click
$('.send_message2').click(function(e) {
  user2_in = $('.message_input2').val();
  $('.message_input2').val('');
  console.log("user2_in:", user2_in);
  if(user2_in==""){
    alert('Please enter some text for translation');
  }
  else{
  AddtoChat3(user2_in,'right');
  fetch("/translate?user_in="+ user2_in +"&lang_from="+lang_to+"&lang_to="+lang_from)
  .then(response=> {
    response.json().then(function(data) {
      console.log(data[0]['translations'][0].text);
      AddtoChat4(data[0]['translations'][0].text,'left');
    });
  });
  }
});


//To add text to 
function AddtoChat1(text,message_side) {
	var cb = document.getElementById("cbox");
  cb.innerHTML += "<div class='l_im'><div class='mtxt'>"+text+"</div></div>";  

};

function AddtoChat2(text,message_side) {
	var cb = document.getElementById("cbox");
  cb.innerHTML += "<div class='l_rm'><div class='mtxt'>"+text+"</div></div>";  

};

function AddtoChat3(text,message_side) {
	var cb = document.getElementById("cbox");
  cb.innerHTML += "<div class='r_im'><div class='mtxt'>"+text+"</div></div>";  

};

function AddtoChat4(text,message_side) {
	var cb = document.getElementById("cbox");
  cb.innerHTML += "<div class='r_rm'><div class='mtxt'>"+text+"</div></div>";  

};


var firebaseConfig = {
    apiKey: "AIzaSyBD4C2PFFCxjZcnb1EmVddXIXUetd_ruZQ",
    authDomain: "hciproject1-f2ee6.firebaseapp.com",
    databaseURL: "https://hciproject1-f2ee6-default-rtdb.firebaseio.com",
    projectId: "hciproject1-f2ee6",
    storageBucket: "hciproject1-f2ee6.appspot.com",
    messagingSenderId: "409660748500",
    appId: "1:409660748500:web:b7ee8ec185266ba32f4141"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


function SendData(state) {


  var myDBConn = firebase.database().ref();

  
  var a1 = myDBConn.child("p1");

 
  var test = a1.push({ rating: state});
  console.log(test);
}