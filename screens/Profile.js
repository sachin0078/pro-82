import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class Profile extends React.Component{
constructor(props){
    super(props)
    this.state={
        fontsLoaded:false,
        isEnabled:false,
      light_theme:true,
    }
}

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
      }
    
      componentDidMount() {
        this._loadFontsAsync();
      }

    render() {
        if (!this.state.fontsLoaded) {
          return <AppLoading />
        } else {
          return (
            <View style={styles.container}>
               <SafeAreaView style={styles.droidSafeArea} />
              <View style={styles.appTitle}>
                <Image
                  source={require("../assets/logo.png")}
                  style={styles.appIcon}
                ></Image>
                <Text style={styles.appTitleText}>{'Spectagram'}</Text>
              </View>
              
                
                <View style={styles.themeContainer}>
                <Text style={styles.themeText}>Dark Theme</Text>
                <Switch
                style={{transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }]}}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={this.state.isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={()=>{this.toggleSwitch()}}
            value={this.state.isEnabled}
          />
                </View>
              </View>
            
          );
        }
      }
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#15193c"
        },
        droidSafeArea: {
          marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        },
        appTitle: {
          flex: 0.07,
          flexDirection: "row"
        },
        appIcon: {
          flex: 0.3,
          justifyContent: "center",
          alignItems: "center"
        },
        iconImage: {
          width: "100%",
          height: "100%",
          resizeMode: "contain"
        },
        appTitleTextContainer: {
          flex: 0.7,
          justifyContent: "center"
        },
        appTitleText: {
          color: "white",
          fontSize: RFValue(28),
          fontFamily: "Bubblegum-Sans"
        },
        bottonContainer: {
          flex: 0.85
        },
        
        nameText: {
          color: "white",
          fontSize: RFValue(40),
          fontFamily: "Bubblegum-Sans",
          marginTop: RFValue(10)
        },
        themeContainer: {
          flex: 0.2,
          flexDirection: "row",
          justifyContent: "center",
          marginTop: RFValue(20)
        },
        themeText: {
          color: "white",
          fontSize: RFValue(30),
          fontFamily: "Bubblegum-Sans",
          marginRight: RFValue(15)
        }
      });
      
