import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import StudyComponent from '@/components/studyComponent';
import FloatableButton from '@/components/FloatableButton';
import Tags from '@/components/Tags';
import { studyData2, studyDataProp } from '@/utils/data';
import { Link, useRouter} from 'expo-router';
import { StudyType } from '@/utils/study-types';

const categoriesData = [
    { title: "All", active: true },
    { title: "Old Testament", active: false },
    { title: "New Testament", active: false },
];

const ListStudy = () => {
  const router = useRouter();
  const [studies, setStudies] = useState(studyData2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const fetchStudies = async () => {
  //   try {
  //     const response = await getDocs(collection(db, 'study'));
  //     const studiesData = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  //     setStudies(studiesData);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Failed to load studies.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   if (!studies) {
  //     fetchStudies();
  //   }
  // }, []);

  // const renderCategory = ({ item }) => <Tags data={item} />;
  const renderStudyComponent = ({ item }:{item:StudyType}) => <StudyComponent data={item} />;

  return (
    <View style={styles.container}>
      <FloatableButton
        icon={<MaterialIcons name='add' size={30} color={"blue"} />}
        onPress={() => {router.push({pathname: "/(tabs)/(study)/createStudy"})}}
    
        />


      {/* <SearchBarSection /> */}
      {/* <Text style={styles.categoriesText}>Categories</Text> */}
      
      {/* <View style={styles.categorySection}>
        <FlatList
          data={categoriesData}
          renderItem={renderCategory}
          keyExtractor={(item) => item.title}
          horizontal
          contentContainerStyle={styles.categoryList}
        />
      </View> */}

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={studies}
          renderItem={renderStudyComponent}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.contentCont}
        />
      )}
    </View>
  );
};

export default ListStudy;

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
