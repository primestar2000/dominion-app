import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';

const TopNav = () => {
  return (
    <SafeAreaView style={styles.frame}>
      <View style={{flexDirection: "row", gap: 10, alignItems: "center"}}>
        <View style={styles.logo}>
          <Image style={styles.logoImg} source={require("../assets/images/dcic-logo.png")} />
        </View>
        <Text style={styles.title}>Dominion Chapel</Text>
      </View>
      <TouchableOpacity >
        <Entypo  name="dots-three-vertical" size={20} color="#151313" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default TopNav

const styles = StyleSheet.create({
  frame: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity:  0.17,
    shadowRadius: 3.05,
    elevation: 4
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  logoImg: {
    height: "100%",
    width: "100%"
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    color: "#0517b7",
    textTransform: "uppercase"
  },
  menu: {
    
  }
})