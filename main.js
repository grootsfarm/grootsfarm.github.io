
function scrollToElem(id) {
var elem = document.getElementById(id);
elem.scrollIntoView();
}
// firebase.analytics();
// Reference collection messages
var messagesRef = firebase.database().ref('messages');
// Reference collection subscriptions
var subscriptionRef = firebase.database().ref('subscriptions');
// Reference co
var favoriteproductsRef = firebase.database().ref('favoriteproducts');

// Listener for contact submit
document.getElementById('contactForm').addEventListener('submit', submitForm);
// Listener for contact submit
document.getElementById('Subscribe').addEventListener('submit', submitSubscribeForm);
// Like Lettuce
document.getElementById('likelettuce').addEventListener('click', likelettuce);
// Like Microgreens
document.getElementById('likeMicrogreens').addEventListener('click', likeMicrogreens);
// Like Lettuce
document.getElementById('likeBasil').addEventListener('click', likeBasil);
// Like Spanich
document.getElementById('likeSpanich').addEventListener('click', likeSpanich);

// Like Lettuce
function likelettuce(e) {
e.preventDefault();
Addlike("Lettuce");
}
// Like Spanich
function likeSpanich(e) {
e.preventDefault();
Addlike("Spanich");
}
// Like Microgreens
function likeMicrogreens(e) {
e.preventDefault();
Addlike("Microgreens");
}
// Like Basil
function likeBasil(e) {
e.preventDefault();
Addlike("Basil");
}
//Add like 
function Addlike(liked) {
$.getJSON("https://api.ipify.org?format=json",
function (data) {
userip = data.ip;
saveLike(userip, "Lettuce");
var exist = false;
var ref = firebase.database().ref('favoriteproducts');
ref.on("value", function (like) {
like.forEach(function (child) {
if (child.val().user === userip && child.val().like === liked)
exist = true;
})
if (!exist)
saveLike(userip, liked);
}, function (error) {
console.log("Error: " + error.code);
});
})
}
// submit form
function submitForm(e) {
e.preventDefault();
var name = getInputVal('name');
var email = getInputVal('email');
var sbjct = getInputVal('subject');
var message = getInputVal('message');
if (ValidateFields(name, email, sbjct, message)) { //Save message
saveMessage(name, email, sbjct, message);
// Notify 
document.querySelector('.notification').style.display = 'block';
// Hide Notification
setTimeout(() => {
document.querySelector('.notification').style.display = 'none';
}, 3000);
document.getElementById('contactForm').reset();
Email.send({
Host: "smtp.gmail.com",
Username: "farm.groots",
Password: "verticalfarm",
To: 'farm.groots@gmail.com',
From: email,
Subject: sbjct,
Body: "Hello lamjartlin <br>" + name + "-->" + message
});
}
else {
// Notify 
document.querySelector('.errorcontact').style.display = 'block';
// Hide Notification 
setTimeout(() => {
document.querySelector('.errorcontact').style.display = 'none';
}, 3000);
}
}
function getInputVal(id) {
return document.getElementById(id).value;
}
// submit submitSubscribeForm
function submitSubscribeForm(e) {
e.preventDefault();
var email = getInputVal('emailsub');
if (ValidateSubs(email)) {
//Save subscription
saveSubscription(email);
// Notify 
document.querySelector('.subscription').style.display = 'block';
// Hide Notification
setTimeout(() => {
document.querySelector('.subscription').style.display = 'none';
}, 3000);
document.getElementById('Subscribe').reset();
}
else {
// Notify 
document.querySelector('.errorsubscription').style.display = 'block';
// Hide Notification
setTimeout(() => {
document.querySelector('.errorsubscription').style.display = 'none';
}, 3000);
}
}
function getInputVal(id) {
return document.getElementById(id).value;
}
// Save Message
function saveMessage(name, email, sbjct, message) {
var newMessageRef = messagesRef.push();
newMessageRef.set({
name: name,
email: email,
subject: sbjct,
message: message
});
}
// Save Message
function saveSubscription(email) {
var newSubscriptionRef = subscriptionRef.push();
newSubscriptionRef.set({
email: email
});
}
//Save like 
function saveLike(userip, like) {
var newfavoriteproductsRef = favoriteproductsRef.push();
newfavoriteproductsRef.set({
user: userip,
like: like
});
}
//Validate Fields
function ValidateFields(name, email, sbjct, message) {
if (!name ||
!String(name).match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g) ||
name.length > 30 ||
name.length < 3
)
return false;
if (!email ||
!String(email).match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi) ||
email.length > 30 ||
email.length < 5
)
return false;
if (!sbjct ||
!String(sbjct).match(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g) ||
sbjct.length > 30 ||
sbjct.length < 5
)
return false;
if (!message ||
!String(message).match(/.*\S.*/) ||
message.length > 300 ||
message.length < 5
)
return false;
return true;
}
//Validate Fields subscription
function ValidateSubs(email) {
if (!email || !String(email).match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi) || email.length > 30 || email.length < 5)
return false;
return true;
}