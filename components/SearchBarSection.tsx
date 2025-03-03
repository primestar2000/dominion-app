import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import ShadowCard from './shadowCard';

const SearchBarSection = () => {
  return (
    <View style={styles.frame}>
      <TouchableOpacity onPress={()=>{}} style={styles.backBtnSection}>
        <Entypo name="chevron-left" size={24} color={'gray'} />
        <Text style={styles.backBtnTitle}>Back</Text>
      </TouchableOpacity>
      <ShadowCard style={styles.searchContainer}>
        <Entypo style={{marginRight: 5}} name="magnifying-glass" size={20} color={'orange'} />
        <TextInput placeholder='Search' />
      </ShadowCard>
    </View>
  )
}

export default SearchBarSection

const styles = StyleSheet.create({
  frame: {
    paddingBottom: 20,
    flexDirection: 'row'
  },
  backBtnTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: 'gray'
  },
  backBtnSection: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 20
  },
  searchContainer: {
    width: "80%",
    margin: "auto",
    padding: 4,
    paddingHorizontal: 5,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20
  }
})