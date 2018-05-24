const db = firebase.firestore();
 const settings = {/* your settings... */ timestampsInSnapshots: true};
 db.settings(settings);

//Get elements 
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const login = document.getElementById('login');
    const signUp = document.getElementById('signUp');
    const logOut = document.getElementById('logOut');
    const txtName = document.getElementById('txtNickname');
    const loginUser = document.getElementById('mainDisplay');
    
    // create the div object
    const err_msg = document.querySelector("#err_msg");


	// Create a  variable to hide the div
	var notLogin = document.getElementById("notLoginIn");
	var logOutBtn = document.getElementById("hidebtn");
	var btnSignUp = document.getElementById("btnSignUp");

    
function start_signUp(){
	
		if(txtEmail.value ==""){
			console.log("Please enter Email");
			return false;
		}
		console.log("txtNickname.value"+ txtNickname.value);
		if (txtNickname.value == ""){
			console.log("Please enter a display name");
			return false;
		}
		
		if((txtPassword.value =="")||(txtPassword.value.length<6)){
			console.log("Enter password or password must contain 6 characters");
			return false;
			
		}else{
				const email = txtEmail.value;
//				console.log("display email: " + txtEmail.value);
				
				const password = txtPassword.value;
//				console.log("display Password: " + txtPassword.value);
				
				const name = txtName.value;
//				console.log("display name: " + txtName.value);
				
				
        firebase.auth().createUserWithEmailAndPassword(email,password)
			.then(function(user) {
			   console.log("signup sucessfully");  
		   }).catch(function(error){
			   console.log(error.code);
		   });
		}
}
				


//update the display name
function after_signUp(){
			
	const dpName = txtName.value;
	const email = txtEmail.value;
	
	firebase.auth().onAuthStateChanged(function(user) {

		if (user){
			user.updateProfile({
			  displayName: dpName
			}).then(function() {
//				console.log("Update display Name successful.");
			}).catch(function(error) {
				console.log("Update display Name not successful.");
			});
		}
	});	
	
	firebase.auth().onAuthStateChanged(function(user) {
		
		if (user){
			var uid = firebase.auth().currentUser.uid;
//			console.log("User ID" + uid);			
				db.collection("Users").doc(uid).set({
				email: email,
				displayName: dpName,
				hair: "hair1",
				body: "shirt1",
				hairColor: "0x002aff",
				skin: "0xdc9556",
				scores: 0
			}).then(function() {
//				console.log("Document successfully written on db !");
			}).catch(function(error){
				console.log("Document is not successfully written on db !",error); 
			});	
			setTimeout(function() {
				window.location.href = "login.html"}, 500);

		}

	});	
}

//
//function redirectPage(){
//	
//	window.location.href = "logIn.html";
//}


firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			
		setTimeout(function() {
				window.location.href = "logIn.html"}, 300);

		} else {
			
			logOutBtn.style.display = "none";
			console.log("Not log in yet.")

		}
});	


// logout button function
function log_out(){
	firebase.auth().signOut();
	// chnage the URL page.
    window.location.href = 'index.html';
}
	   
