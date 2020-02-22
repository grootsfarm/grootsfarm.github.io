// Firebase initialization
var firebaseConfig = {
    apiKey: "AIzaSyBrq1R6seX7ASu79GRTTKG96yX7vCh7yjg",
    authDomain: "groots-7f64d.firebaseapp.com",
    databaseURL: "https://groots-7f64d.firebaseio.com",
    projectId: "groots-7f64d",
    storageBucket: "groots-7f64d.appspot.com",
    messagingSenderId: "746284437799",
    appId: "1:746284437799:web:a2a35bd17c1222eb99d902",
    measurementId: "G-0HGT2CZ2EM"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

// Reference collection contact
var messagesRef = firebase.database().ref('messages');
// Reference collection contact
var subscriptionRef = firebase.database().ref('subscriptions');
// Listener for contact submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Listener for contact submit
document.getElementById('Subscribe').addEventListener('submit', submitSubscribeForm);
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
            Host : "smtp.gmail.com",
            Username : "farm.groots",
            Password : "verticalfarm",
            To : 'farm.groots@gmail.com',
            From : email,
            Subject : sbjct,
            Body : "Hello lamjartlin <br>"+ name + "-->" + message
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
    if (!email ||
        !String(email).match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi) ||
        email.length > 30 ||
        email.length < 5
    )
        return false;
    return true;
}