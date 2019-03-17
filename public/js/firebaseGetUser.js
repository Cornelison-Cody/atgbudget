initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var uid = user.uid;
            user.getIdToken().then(function(accessToken) {
                document.getElementById('sign-in-status').textContent = displayName;
                document.getElementById('sign-in-status').style.display = 'block';
                document.getElementById('sign-in').textContent = 'Sign out';
                document.getElementById('sign-in').style.display = 'block';
                localStorage.setItem('uid', uid);
                localStorage.setItem("name", displayName);
            });
            document.getElementById('firebaseui-auth-container').style.display = "none";

        } else {
            // User is signed out.
            document.getElementById('sign-in-status').style.display = 'none';
            document.getElementById('sign-in').style.display = 'none';
            localStorage.removeItem('uid');
        }
    }, function(error) {
        console.log(error);
    });
};

window.addEventListener('load', function() {
    initApp()
});