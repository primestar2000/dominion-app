import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import StudyComponent from '@/components/studyComponent';
import FloatableButton from '@/components/FloatableButton';
import Tags from '@/components/Tags';
import { studyData2, studyDataProp } from '@/utils/data';
import { Link, useRouter} from 'expo-router';
import { StudyType, StudyTypeRequest } from '@/utils/study-types';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StudyNavigatorParamList } from '@/src/navigations/study-navigation';
import CreateStudyModal from './create-study-modal';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import retriveStudiesThunk from '@/redux/app/retrieve-studies-thunk';
import { ResponceMessageType } from '@/utils/other-types';
import { Alert } from 'react-native';
import LoaderComponent from '@/components/loaderComponent';

const categoriesData = [
    { title: "All", active: true },
    { title: "Old Testament", active: false },
    { title: "New Testament", active: false },
];

const StudiesScreen = () => {
  const dispatch = useAppDispatch();
  const fetchedStudies = useAppSelector(store => store.studies.studies)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showCreateStudyModal, setShowCreateStudyModal] = useState<boolean>(false);

  
  // const {navigate} = useNavigation<NavigationProp<StudyNavigatorParamList>>();
  const renderStudyComponent = ({ item }:{item:StudyType}) => <StudyComponent study={item} />;

  useEffect(()=>{
    if (fetchedStudies.length < 1) {
      refetchStudies()
    }
  },[])
  const refetchStudies = async() => {
    setLoading(true);
    dispatch(retriveStudiesThunk()).then((result)=>{
      if (result.meta.requestStatus === "rejected") {
        const message = result.payload as ResponceMessageType
        Alert.alert(message.message);
      }
      // if (result.meta.requestStatus === "fulfilled") {
        // useToastMessage
      // }
    }).finally(()=>{
      setLoading(false)
      setIsRefreshing(false);
    })
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    refetchStudies();
  }
  return (
    <View style={styles.container}>
      <FloatableButton
        icon={<MaterialIcons name='add' size={30} color={"blue"} />}
        onPress={() => {setShowCreateStudyModal(true)}}
        enableOnlyAdmin={true}
        />

      {loading ? (
        // <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        //   <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        // </View>
        <LoaderComponent isLoading={loading} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : fetchedStudies.length > 0 ?
      (
        <FlatList
          data={fetchedStudies}
          renderItem={renderStudyComponent}
          keyExtractor={(item) => item?.id}
          contentContainerStyle={styles.contentCont}
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
        />
      ):
      <View style={{flex:1 , justifyContent: "center", alignItems: "center"}}>
        <Text>No study Found</Text>
        <Button title='Refresh' onPress={refetchStudies} />
      </View>
    }
      {
        showCreateStudyModal && (
          <CreateStudyModal onClose={()=>setShowCreateStudyModal(false)} />
        )
      }
    </View>
  );
};

export default StudiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  floatableButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 1,
  },
  categoriesText: {
    fontWeight: "700",
    fontSize: 18,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  categorySection: {
    paddingHorizontal: 10,
  },
  categoryList: {
    flexDirection: 'row',
    gap: 10,
  },
  contentCont: {
    paddingHorizontal: 10,
    gap: 2,
    marginVertical: 20
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
