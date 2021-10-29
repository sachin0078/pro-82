import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default class LoginScreen extends React.Component{

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
          var providerData = firebaseUser.providerData;
          for (var i = 0; i < providerData.length; i++) {
            if (
              providerData[i].providerId ===
              firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
              providerData[i].uid === googleUser.getBasicProfile().getId()
            ) {
              // We don't need to reauth the Firebase connection.
              return true;
            }
          }
        }
        return false;
      };
      
    onSignIn = googleUser => {
        var unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
            unsubscribe();
            
            if (!this.isUserEqual(googleUser, firebaseUser)) {
             
              var credential = firebase.auth.GoogleAuthProvider.credential(
                googleUser.idToken,
                googleUser.accessToken
              );
      
              
              firebase
                .auth()
                .signInWithCredential(credential)
                .then(function (result) {
                  if (result.additionalUserInfo.isNewUser) {
                    firebase
                      .database()
                      .ref("/users/" + result.user.uid)
                      .set({
                        gmail: result.user.email,
                        profile_picture: result.additionalUserInfo.profile.picture,
                        locale: result.additionalUserInfo.profile.locale,
                        first_name: result.additionalUserInfo.profile.given_name,
                        last_name: result.additionalUserInfo.profile.family_name,
                        current_theme: "dark"
                      })
                      .then(function (snapshot) { });
                  }
                })
                .catch(error => {
                  
                  var errorCode = error.code;
                  var errorMessage = error.message;
                 
                  var email = error.email;
                 
                  var credential = error.credential;
                  
                });
            } else {
              console.log("User already signed-in Firebase.");
            }
          });
    }

    signInWithGoogleAsync = async () => {
        try {
          const result = await Google.logInAsync({
            behaviour: "web",
            
            iosClientId:
              "133161873827-ms76dns1mnjhllcoq3tenljha0iqobre.apps.googleusercontent.com",
            scopes: ["profile", "email"]
          });
    
          if (result.type === "success") {
            this.onSignIn(result);
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          console.log(e.message);
          return { error: true };
        }
      };
    render(){
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text>Login</Text>
            </View>
        )
    
}
    }