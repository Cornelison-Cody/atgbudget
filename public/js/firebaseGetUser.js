initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var uid = user.uid;
            user.getIdToken().then(function(accessToken) {
                localStorage.setItem('uid', uid);
                localStorage.setItem("name", displayName);
                clearMainContent();
                buildSidebar(displayName);
                viewItems();
            });

        } else {
            // User is signed out.
            localStorage.removeItem('uid');
            localStorage.removeItem("name");
            clearSideBar();
            clearMainContent();
            buildHomeScreen();
        }
    }, function(error) {
        console.log(error);
    });
};

window.addEventListener('load', function() {
    initApp()
});