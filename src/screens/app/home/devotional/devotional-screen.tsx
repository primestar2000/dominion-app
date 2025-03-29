import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Alert,
  RefreshControl
} from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { format, parseISO } from 'date-fns';
import { DevotionalItem } from '@/utils/devotional-types';
import DevotionalCard from '@/components/features/devotional/devotional-card';
import AddButtonCircle from '@/components/add-button-circle';
import { Modal } from 'react-native';
import CreateDevotionalModal from '@/components/features/devotional/create-devotional-modal';
import DatePickerCustom from '@/components/my-date-picker';
import { supabase } from '@/utils/lib/superbase';
import { databaseTables } from '@/constants/db-tables';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {  setDevotionalState } from '@/redux/app/devotional-slice';
import LoaderComponent from '@/components/loaderComponent';



// Sample data
export const sampleDevotionals: DevotionalItem[] = [
  {
    id: '1',
    title: 'Walking in Faith',
    date: '2025-03-15',
    memory_verse: {
      content: 'For we walk by faith, not by sight.',
      scripture: '2 Corinthians 5:7',
    },
    contents_paragraph: [
      'Faith is the foundation of our Christian journey.',
      'When we walk by faith, we trust God even when we cannot see the full picture.',
      'This requires surrendering our need for control and certainty.',
    ],
    food_for_thought: 'What area of your life needs more faith right now?',
    prayer: 'Lord, help me to trust You more fully, especially in areas where I struggle to see Your plan.',
  },
  {
    id: '2',
    title: 'The Power of Gratitude',
    date: '2025-03-16',
    memory_verse: {
      content: 'Give thanks in all circumstances; for this is God\'s will for you in Christ Jesus.',
      scripture: '1 Thessalonians 5:18',
    },
    contents_paragraph: [
      'Gratitude transforms our perspective on life.',
      'Even in difficult seasons, there are blessings to be counted.',
      'Thankfulness is a powerful spiritual discipline that draws us closer to God.',
    ],
    food_for_thought: 'What three things are you most grateful for today?',
    prayer: 'Father, open my eyes to see Your blessings in my life. Help me cultivate a heart of thanksgiving.',
  },
  {
    id: '3',
    title: 'Finding Rest',
    date: '2025-03-17',
    memory_verse: {
      content: 'Come to me, all you who are weary and burdened, and I will give you rest.',
      scripture: 'Matthew 11:28',
    },
    contents_paragraph: [
      'Rest is not merely the absence of activity but a gift from God.',
      'True rest comes from surrendering our burdens to Jesus.',
      'Sabbath rest is essential for our spiritual, emotional, and physical wellbeing.',
    ],
    food_for_thought: 'How can you create more space for rest in your daily life?',
    prayer: 'Jesus, I bring my weariness to You. Teach me to find rest in Your presence.',
  },
];

const DevotionalListScreen = () => {
  const dispatch = useAppDispatch();
  const {devotionals} = useAppSelector( store => store.devotionals);
  // const [devotionals, setDevotionals] = useState<DevotionalItem[]>(sampleDevotionals);
  const [modalIsOpenned, setModalIsOpenned] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const renderDevotionalItem = ({ item }: { item: DevotionalItem }) => (
    <DevotionalCard item={item} />
  );

  const fetchDevotionals = async () => {
    try {
      setIsFetching(true);
      console.log('fetching devotionals')
      const {data, error} = await supabase.from(databaseTables.devotionals).select("*");
      if (error) {
        Alert.alert(error.message);
      }
      if(data){
        dispatch(setDevotionalState(data))
      }
      
    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong!');
      
    }finally{
      setIsFetching(false);
      setIsRefreshing(false);
    }
  }

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchDevotionals();
  }

  useEffect(()=>{
    if (devotionals.length < 1) {
      fetchDevotionals();
    }
  },[])
  if (isFetching) {
    return(
      <LoaderComponent isLoading={true} />
    )
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Daily Devotionals</Text>
          <AddButtonCircle onPress={()=>{setModalIsOpenned(true)}} enableOnAdmin={true} />
        </View>
      
        <FlatList
          data={devotionals}
          renderItem={renderDevotionalItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
      {
        modalIsOpenned && 
        <Modal animationType='slide' onRequestClose={()=>{setModalIsOpenned(false)}}>
          <CreateDevotionalModal onClose={()=>setModalIsOpenned(false)} onSave={()=>{}} />
        </Modal>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    // fontFamily: 'Roboto-Bold',
  },
  filterButton: {
    padding: 8,
  },
  listContainer: {
    padding: 16,
  },
  separator: {
    height: 16,
  },
 
});

export default DevotionalListScreen;