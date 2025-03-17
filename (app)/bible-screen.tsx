import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Modal,
  Share,
  Animated
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as FileSystem from 'expo-file-system';

// Types
interface BibleBook {
  id: string;
  name: string;
  abbrev: string;
  chapters: number;
  testament: 'old' | 'new';
  category: string;
}

interface BibleVerse {
  id: string;
  verse: number;
  text: string;
  isHighlighted: boolean;
  isBookmarked: boolean;
  notes: string | null;
}

interface BibleChapter {
  bookId: string;
  bookName: string;
  chapter: number;
  verses: BibleVerse[];
}

// JSON Bible Data Format
interface BibleJsonBook {
  abbrev: string;
  book: string;
  chapters: string[][];
}

// Categories mapping
const BOOK_CATEGORIES: Record<string, { testament: 'old' | 'new', category: string }> = {
  'Genesis': { testament: 'old', category: 'Pentateuch' },
  'Exodus': { testament: 'old', category: 'Pentateuch' },
  'Leviticus': { testament: 'old', category: 'Pentateuch' },
  'Numbers': { testament: 'old', category: 'Pentateuch' },
  'Deuteronomy': { testament: 'old', category: 'Pentateuch' },
  'Joshua': { testament: 'old', category: 'Historical' },
  'Judges': { testament: 'old', category: 'Historical' },
  'Ruth': { testament: 'old', category: 'Historical' },
  '1 Samuel': { testament: 'old', category: 'Historical' },
  '2 Samuel': { testament: 'old', category: 'Historical' },
  '1 Kings': { testament: 'old', category: 'Historical' },
  '2 Kings': { testament: 'old', category: 'Historical' },
  '1 Chronicles': { testament: 'old', category: 'Historical' },
  '2 Chronicles': { testament: 'old', category: 'Historical' },
  'Ezra': { testament: 'old', category: 'Historical' },
  'Nehemiah': { testament: 'old', category: 'Historical' },
  'Esther': { testament: 'old', category: 'Historical' },
  'Job': { testament: 'old', category: 'Wisdom' },
  'Psalms': { testament: 'old', category: 'Wisdom' },
  'Proverbs': { testament: 'old', category: 'Wisdom' },
  'Ecclesiastes': { testament: 'old', category: 'Wisdom' },
  'Song of Solomon': { testament: 'old', category: 'Wisdom' },
  'Isaiah': { testament: 'old', category: 'Major Prophets' },
  'Jeremiah': { testament: 'old', category: 'Major Prophets' },
  'Lamentations': { testament: 'old', category: 'Major Prophets' },
  'Ezekiel': { testament: 'old', category: 'Major Prophets' },
  'Daniel': { testament: 'old', category: 'Major Prophets' },
  'Hosea': { testament: 'old', category: 'Minor Prophets' },
  'Joel': { testament: 'old', category: 'Minor Prophets' },
  'Amos': { testament: 'old', category: 'Minor Prophets' },
  'Obadiah': { testament: 'old', category: 'Minor Prophets' },
  'Jonah': { testament: 'old', category: 'Minor Prophets' },
  'Micah': { testament: 'old', category: 'Minor Prophets' },
  'Nahum': { testament: 'old', category: 'Minor Prophets' },
  'Habakkuk': { testament: 'old', category: 'Minor Prophets' },
  'Zephaniah': { testament: 'old', category: 'Minor Prophets' },
  'Haggai': { testament: 'old', category: 'Minor Prophets' },
  'Zechariah': { testament: 'old', category: 'Minor Prophets' },
  'Malachi': { testament: 'old', category: 'Minor Prophets' },
  'Matthew': { testament: 'new', category: 'Gospel' },
  'Mark': { testament: 'new', category: 'Gospel' },
  'Luke': { testament: 'new', category: 'Gospel' },
  'John': { testament: 'new', category: 'Gospel' },
  'Acts': { testament: 'new', category: 'Historical' },
  'Romans': { testament: 'new', category: 'Pauline Epistle' },
  '1 Corinthians': { testament: 'new', category: 'Pauline Epistle' },
  '2 Corinthians': { testament: 'new', category: 'Pauline Epistle' },
  'Galatians': { testament: 'new', category: 'Pauline Epistle' },
  'Ephesians': { testament: 'new', category: 'Pauline Epistle' },
  'Philippians': { testament: 'new', category: 'Pauline Epistle' },
  'Colossians': { testament: 'new', category: 'Pauline Epistle' },
  '1 Thessalonians': { testament: 'new', category: 'Pauline Epistle' },
  '2 Thessalonians': { testament: 'new', category: 'Pauline Epistle' },
  '1 Timothy': { testament: 'new', category: 'Pauline Epistle' },
  '2 Timothy': { testament: 'new', category: 'Pauline Epistle' },
  'Titus': { testament: 'new', category: 'Pauline Epistle' },
  'Philemon': { testament: 'new', category: 'Pauline Epistle' },
  'Hebrews': { testament: 'new', category: 'General Epistle' },
  'James': { testament: 'new', category: 'General Epistle' },
  '1 Peter': { testament: 'new', category: 'General Epistle' },
  '2 Peter': { testament: 'new', category: 'General Epistle' },
  '1 John': { testament: 'new', category: 'General Epistle' },
  '2 John': { testament: 'new', category: 'General Epistle' },
  '3 John': { testament: 'new', category: 'General Epistle' },
  'Jude': { testament: 'new', category: 'General Epistle' },
  'Revelation': { testament: 'new', category: 'Apocalyptic' },
};

// Storage keys for highlighted verses, bookmarks, and notes
const STORAGE_KEYS = {
  HIGHLIGHTS: 'bible_highlights',
  BOOKMARKS: 'bible_bookmarks',
  NOTES: 'bible_notes',
  FONT_SIZE: 'bible_font_size',
  LAST_READ: 'bible_last_read',
};

export default function BibleScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // State for Bible data
  const [bibleData, setBibleData] = useState<BibleJsonBook[]>([]);
  
  // State for Bible navigation
  const [books, setBooks] = useState<BibleBook[]>([]);
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [currentChapterData, setCurrentChapterData] = useState<BibleChapter | null>(null);
  
  // UI state
  const [isLoading, setIsLoading] = useState(true);
  const [isBookListVisible, setIsBookListVisible] = useState(true);
  const [isChapterListVisible, setIsChapterListVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Action states
  const [selectedVerse, setSelectedVerse] = useState<BibleVerse | null>(null);
  const [isVerseActionsVisible, setIsVerseActionsVisible] = useState(false);
  const [isNoteModalVisible, setIsNoteModalVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState<string>('');
  
  // User preferences state
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState<number>(1);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  
  // Load Bible data on component mount
  useEffect(() => {
    loadBibleData();
    loadUserPreferences();
  }, []);
  
  // Animation effect for chapter content
  useEffect(() => {
    if (currentChapterData) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [currentChapterData, fadeAnim]);
  
  // Save user preferences whenever they change
  useEffect(() => {
    saveUserPreferences();
  }, [highlights, bookmarks, notes, fontSizeMultiplier]);
  
  // Load and process the Bible JSON data
  const loadBibleData = async () => {
    setIsLoading(true);
    
    try {
      // For development, you can use a require statement
      // In production, you might want to use FileSystem to read from local file
      
      // Option 1: For development with a bundled asset
      const data = require('../../assets/en_bbe.json');
      
      // Option 2: For production with a local file
      // const fileUri = `${FileSystem.documentDirectory}bible.json`;
      // const fileContent = await FileSystem.readAsStringAsync(fileUri);
      // const data = JSON.parse(fileContent);
      
      setBibleData(data);
      
      // Process the data to get our books structure
      const processedBooks: BibleBook[] = data.map((book: BibleJsonBook) => {
        // Get category and testament from our mapping, or default values
        const bookInfo = BOOK_CATEGORIES[book.book] || { 
          testament: book.book.startsWith('1') || book.book.startsWith('2') || 
                    ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'].includes(book.book) 
                    ? 'old' : 'new', 
          category: 'Other' 
        };
        
        return {
          id: book.abbrev.toLowerCase(),
          name: book.book,
          abbrev: book.abbrev,
          chapters: book.chapters.length,
          testament: bookInfo.testament,
          category: bookInfo.category
        };
      });
      
      setBooks(processedBooks);
      setIsLoading(false);
      
      // Check if there's a last read position to restore
      loadLastReadPosition();
      
    } catch (error) {
      console.error('Error loading Bible data:', error);
      setIsLoading(false);
    }
  };
  
  // Load user preferences from storage
  const loadUserPreferences = async () => {
    try {
      // In a real app, you would use AsyncStorage:
      // const highlightsJson = await AsyncStorage.getItem(STORAGE_KEYS.HIGHLIGHTS);
      // For simplicity, we're using mock data
      
      // Mock saved data
      const highlightsJson = '["gen-1-1","jhn-3-16"]';
      const bookmarksJson = '["gen-1-1","rom-8-28","php-4-13"]';
      const notesJson = '{"gen-1-1":"This is the beginning of everything","jhn-3-16":"The most famous verse in the Bible"}';
      const fontSizeJson = '1.1';
      
      if (highlightsJson) setHighlights(JSON.parse(highlightsJson));
      if (bookmarksJson) setBookmarks(JSON.parse(bookmarksJson));
      if (notesJson) setNotes(JSON.parse(notesJson));
      if (fontSizeJson) setFontSizeMultiplier(JSON.parse(fontSizeJson));
      
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };
  
  // Save user preferences to storage
  const saveUserPreferences = async () => {
    try {
      // In a real app, you would use AsyncStorage:
      // await AsyncStorage.setItem(STORAGE_KEYS.HIGHLIGHTS, JSON.stringify(highlights));
      
      // For now, just log what would be saved
      console.log('Saving highlights:', highlights);
      console.log('Saving bookmarks:', bookmarks);
      console.log('Saving notes:', notes);
      console.log('Saving font size:', fontSizeMultiplier);
      
      // Save last read position if we have one
      if (selectedBook && selectedChapter) {
        const lastRead = {
          bookId: selectedBook.id,
          chapter: selectedChapter
        };
        console.log('Saving last read position:', lastRead);
      }
      
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };
  
  // Load last read position
  const loadLastReadPosition = async () => {
    try {
      // Mock last read data
      const lastReadJson = '{"bookId":"jhn","chapter":3}';
      
      if (lastReadJson) {
        const lastRead = JSON.parse(lastReadJson);
        const book = books.find(b => b.id === lastRead.bookId);
        
        if (book) {
          setSelectedBook(book);
          setSelectedChapter(lastRead.chapter);
          setIsBookListVisible(false);
          fetchChapterContent(book.id, lastRead.chapter);
        }
      }
    } catch (error) {
      console.error('Error loading last read position:', error);
    }
  };
  
  // Fetch chapter content from our Bible data
  const fetchChapterContent = (bookId: string, chapter: number) => {
    setIsLoading(true);
    setCurrentChapterData(null);
    
    // Find the book in our data
    const bookIndex = bibleData.findIndex(b => b.abbrev.toLowerCase() === bookId);
    
    if (bookIndex === -1 || !bibleData[bookIndex].chapters[chapter - 1]) {
      console.error('Chapter not found');
      setIsLoading(false);
      return;
    }
    
    // Get the verses for the chapter
    const chapterVerses = bibleData[bookIndex].chapters[chapter - 1];
    const bookName = bibleData[bookIndex].book;
    
    // Create verse objects
    const verses: BibleVerse[] = chapterVerses.map((text, index) => {
      const verseNumber = index + 1;
      const verseId = `${bookId}-${chapter}-${verseNumber}`;
      
      return {
        id: verseId,
        verse: verseNumber,
        text: text,
        isHighlighted: highlights.includes(verseId),
        isBookmarked: bookmarks.includes(verseId),
        notes: notes[verseId] || null
      };
    });
    
    // Set the chapter data
    setCurrentChapterData({
      bookId,
      bookName,
      chapter,
      verses
    });
    
    setIsLoading(false);
  };
  
  // Search the Bible
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchResults([]);
    
    // Search logic
    setTimeout(() => {
      const results: any[] = [];
      
      // Search through all books and chapters
      bibleData.forEach(book => {
        const bookId = book.abbrev.toLowerCase();
        const bookName = book.book;
        
        book.chapters.forEach((chapterVerses, chapterIndex) => {
          const chapterNum = chapterIndex + 1;
          
          chapterVerses.forEach((verseText, verseIndex) => {
            const verseNum = verseIndex + 1;
            
            // Case-insensitive search
            if (verseText.toLowerCase().includes(searchQuery.toLowerCase())) {
              results.push({
                id: `${bookId}-${chapterNum}-${verseNum}`,
                bookId,
                bookName,
                chapter: chapterNum,
                verse: verseNum,
                text: verseText
              });
            }
          });
        });
      });
      
      setSearchResults(results);
      setIsSearching(false);
    }, 500); // Simulate search delay
  };
  
  // Navigation handlers
  const handleBookSelect = (book: BibleBook) => {
    setSelectedBook(book);
    setIsBookListVisible(false);
    setIsChapterListVisible(true);
  };
  
  const handleChapterSelect = (chapter: number) => {
    setSelectedChapter(chapter);
    setIsChapterListVisible(false);
    fetchChapterContent(selectedBook!.id, chapter);
  };
  
  const handleBackToBooks = () => {
    setIsChapterListVisible(false);
    setIsBookListVisible(true);
    setSelectedBook(null);
  };
  
  const handleBackToChapters = () => {
    setCurrentChapterData(null);
    setSelectedChapter(null);
    setIsChapterListVisible(true);
  };
  
  // Verse action handlers
  const handleVersePress = (verse: BibleVerse) => {
    setSelectedVerse(verse);
    setIsVerseActionsVisible(true);
    setCurrentNote(verse.notes || '');
  };
  
  const handleToggleHighlight = () => {
    if (!selectedVerse || !currentChapterData) return;
    
    let updatedHighlights: string[];
    
    if (highlights.includes(selectedVerse.id)) {
      updatedHighlights = highlights.filter(id => id !== selectedVerse.id);
    } else {
      updatedHighlights = [...highlights, selectedVerse.id];
    }
    
    setHighlights(updatedHighlights);
    
    // Update current verse state
    const updatedVerses = currentChapterData.verses.map(v => 
      v.id === selectedVerse.id 
        ? { ...v, isHighlighted: !v.isHighlighted } 
        : v
    );
    
    setCurrentChapterData({
      ...currentChapterData,
      verses: updatedVerses
    });
    
    setSelectedVerse({
      ...selectedVerse,
      isHighlighted: !selectedVerse.isHighlighted
    });
  };
  
  const handleToggleBookmark = () => {
    if (!selectedVerse || !currentChapterData) return;
    
    let updatedBookmarks: string[];
    
    if (bookmarks.includes(selectedVerse.id)) {
      updatedBookmarks = bookmarks.filter(id => id !== selectedVerse.id);
    } else {
      updatedBookmarks = [...bookmarks, selectedVerse.id];
    }
    
    setBookmarks(updatedBookmarks);
    
    // Update current verse state
    const updatedVerses = currentChapterData.verses.map(v => 
      v.id === selectedVerse.id 
        ? { ...v, isBookmarked: !v.isBookmarked } 
        : v
    );
    
    setCurrentChapterData({
      ...currentChapterData,
      verses: updatedVerses
    });
    
    setSelectedVerse({
      ...selectedVerse,
      isBookmarked: !selectedVerse.isBookmarked
    });
  };
  
  const handleOpenNoteModal = () => {
    setIsVerseActionsVisible(false);
    setIsNoteModalVisible(true);
  };
  
  const handleSaveNote = () => {
    if (!selectedVerse || !currentChapterData) return;
    
    const updatedNotes = { ...notes };
    
    if (currentNote.trim()) {
      updatedNotes[selectedVerse.id] = currentNote.trim();
    } else {
      delete updatedNotes[selectedVerse.id];
    }
    
    setNotes(updatedNotes);
    
    // Update current verse state
    const updatedVerses = currentChapterData.verses.map(v => 
      v.id === selectedVerse.id 
        ? { ...v, notes: currentNote.trim() || null } 
        : v
    );
    
    setCurrentChapterData({
      ...currentChapterData,
      verses: updatedVerses
    });
    
    setSelectedVerse({
      ...selectedVerse,
      notes: currentNote.trim() || null
    });
    
    setIsNoteModalVisible(false);
  };
  
  const handleShareVerse = async () => {
    if (!selectedVerse || !currentChapterData) return;
    
    try {
      const message = `${currentChapterData.bookName} ${currentChapterData.chapter}:${selectedVerse.verse}\n\n"${selectedVerse.text}"\n\nShared from Bible App`;
      await Share.share({ message });
    } catch (error) {
      console.error('Error sharing verse:', error);
    }
    
    setIsVerseActionsVisible(false);
  };
  
  const handleCloseVerseActions = () => {
    setIsVerseActionsVisible(false);
    setSelectedVerse(null);
  };
  
  // Group books by testament and category
  const groupedBooks = books.reduce<{ [key: string]: BibleBook[] }>((acc, book) => {
    const key = `${book.testament}-${book.category}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(book);
    return acc;
  }, {});
  
  // Search handling
  const handleSearchActivate = () => {
    setIsSearchActive(true);
  };
  
  const handleSearchDeactivate = () => {
    setIsSearchActive(false);
    setSearchQuery('');
    setSearchResults([]);
  };
  
  // Font size handlers
  const handleDecreaseFontSize = () => {
    setFontSizeMultiplier(prev => Math.max(0.7, prev - 0.1));
  };
  
  const handleIncreaseFontSize = () => {
    setFontSizeMultiplier(prev => Math.min(1.5, prev + 0.1));
  };
  
  // Get chapters array for selected book
  const chaptersArray = selectedBook 
    ? Array.from({ length: selectedBook.chapters }, (_, i) => i + 1) 
    : [];
  
  // Render book list
  const renderBooksList = () => {
    return (
      <ScrollView style={styles.booksContainer} showsVerticalScrollIndicator={false}>
        {Object.entries(groupedBooks).map(([key, booksInGroup]) => {
          const [testament, category] = key.split('-');
          
          return (
            <View key={key} style={styles.bookGroup}>
              <Text style={styles.categoryHeader}>
                {testament === 'old' ? 'Old Testament' : 'New Testament'} - {category}
              </Text>
              
              {booksInGroup.map(book => (
                <TouchableOpacity
                  key={book.id}
                  style={styles.bookItem}
                  onPress={() => handleBookSelect(book)}
                >
                  <Text style={styles.bookName}>{book.name}</Text>
                  <Text style={styles.chapterCount}>{book.chapters} chapters</Text>
                  <Ionicons name="chevron-forward" size={20} color="#CCCCCC" />
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </ScrollView>
    );
  };
  
  // Render chapters grid
  const renderChaptersList = () => {
    return (
      <View style={styles.chaptersContainer}>
        <View style={styles.chaptersHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToBooks}>
            <Ionicons name="arrow-back" size={20} color="#333" />
            <Text style={styles.backButtonText}>Books</Text>
          </TouchableOpacity>
          <Text style={styles.selectedBookTitle}>{selectedBook?.name}</Text>
        </View>
        
        <View style={styles.chaptersGrid}>
          {chaptersArray.map(chapter => (
            <TouchableOpacity
              key={chapter}
              style={styles.chapterButton}
              onPress={() => handleChapterSelect(chapter)}
            >
              <Text style={styles.chapterButtonText}>{chapter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  
  // Render Bible content
  const renderBibleContent = () => {
    if (!currentChapterData) return null;
    
    return (
      <Animated.View style={[styles.chapterContainer, { opacity: fadeAnim }]}>
        <View style={styles.chapterHeader}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackToChapters}>
            <Ionicons name="arrow-back" size={20} color="#333" />
            <Text style={styles.backButtonText}>Chapters</Text>
          </TouchableOpacity>
          
          <Text style={styles.chapterTitle}>
            {currentChapterData.bookName} {currentChapterData.chapter}
          </Text>
          
          <TouchableOpacity
            style={styles.optionsButton}
            onPress={() => setIsOptionsModalVisible(true)}
          >
            <Ionicons name="text" size={20} color="#333" />
          </TouchableOpacity>
        </View>
        
        <ScrollView
          ref={scrollViewRef}
          style={styles.versesContainer}
          showsVerticalScrollIndicator={false}
        >
          {currentChapterData.verses.map((verse) => (
            <TouchableOpacity
              key={verse.id}
              style={[
                styles.verseContainer,
                verse.isHighlighted && styles.highlightedVerse
              ]}
              onPress={() => handleVersePress(verse)}
              activeOpacity={0.7}
            >
              <View style={styles.verseHeader}>
                <Text style={styles.verseNumber}>{verse.verse}</Text>
                {verse.isBookmarked && (
                  <Ionicons name="bookmark" size={14} color="#3D5AF1" />
                )}
              </View>
              
              <Text style={[
                styles.verseText,
                { fontSize: 16 * fontSizeMultiplier }
              ]}>
                {verse.text}
              </Text>
              
              {verse.notes && (
                <View style={styles.noteIndicator}>
                  <Ionicons name="document-text" size={14} color="#666" />
                  <Text style={styles.noteIndicatorText}>Note</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
          
          <View style={styles.chapterNavigation}>
            {currentChapterData.chapter > 1 && (
              <TouchableOpacity
                style={styles.chapterNavButton}
                onPress={() => {
                  if (selectedBook) {
                    fetchChapterContent(selectedBook.id, currentChapterData.chapter - 1);
                    setSelectedChapter(currentChapterData.chapter - 1);
                  }
                }}
              >
                <Ionicons name="arrow-back" size={16} color="#FFFFFF" />
                <Text style={styles.chapterNavButtonText}>Previous</Text>
              </TouchableOpacity>
            )}
            
            {selectedBook && currentChapterData.chapter < selectedBook.chapters && (
              <TouchableOpacity
                style={styles.chapterNavButton}
                onPress={() => {
                  if (selectedBook) {
                    fetchChapterContent(selectedBook.id, currentChapterData.chapter + 1);
                    setSelectedChapter(currentChapterData.chapter + 1);
                  }
                }}
              >
                <Text style={styles.chapterNavButtonText}>Next</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </Animated.View>
    );
  };
  
  // Render search results
  const renderSearchResults = () => {
    if (isSearching) {
      return (
        <View style={styles.searchLoadingContainer}>
          <ActivityIndicator size="large" color="#3D5AF1" />
          <Text style={styles.searchLoadingText}>Searching...</Text>
        </View>
      );
    }
    
    if (searchResults.length === 0) {
      return (
        <View style={styles.noResultsContainer}>
          <Ionicons name="search" size={48} color="#CCCCCC" />
          <Text style={styles.noResultsText}>No results found</Text>
          <Text style={styles.noResultsSubtext}>Try different keywords or phrases</Text>
        </View>
      );
    }
    
    return (
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.searchResultItem}
            onPress={() => {
              // Find book and navigate to chapter/verse
              const book = books.find(b => b.id === item.bookId);
              if (book) {
                setSelectedBook(book);
                setSelectedChapter(item.chapter);
                setIsSearchActive(false);
                setIsBookListVisible(false);
                setIsChapterListVisible(false);
                fetchChapterContent(book.id, item.chapter);
                
                // We could scroll to the specific verse after loading
                // Would need to implement this with a useEffect
              }
            }}
          >

            <View style={styles.searchResultHeader}>
                <Text style={styles.searchResultBook}>{item.bookName}</Text>
                <Text style={styles.searchResultReference}>{item.chapter}:{item.verse}</Text>
            <Text style={styles.searchResultText}>{item.text}</Text>
            </View>
        </TouchableOpacity>
        )}
        contentContainerStyle={styles.searchResultsContainer}
    />
    );
};

// Render the main content based on the current state
const renderMainContent = () => {
    if (isSearchActive) {
    return renderSearchResults();
    }

    if (isBookListVisible) {
    return renderBooksList();
    }

    if (isChapterListVisible) {
    return renderChaptersList();
    }

    return renderBibleContent();
};

// Render the component
return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" />

    {/* Header */}
    <View style={styles.header}>
        {!isSearchActive && (
        <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
        >
            <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        )}

        <View style={styles.headerTitleContainer}>
        {isSearchActive ? (
            <TextInput
            style={styles.searchInput}
            placeholder="Search Bible..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
            onSubmitEditing={handleSearch}
            />
        ) : (
            <Text style={styles.headerTitle}>Bible</Text>
        )}
        </View>

        <TouchableOpacity
        style={styles.headerButton}
        onPress={isSearchActive ? handleSearchDeactivate : handleSearchActivate}
        >
        <Ionicons
            name={isSearchActive ? "close" : "search"}
            size={24}
            color="#333"
        />
        </TouchableOpacity>
    </View>

    {/* Main Content */}
    {isLoading ? (
        <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3D5AF1" />
        <Text style={styles.loadingText}>Loading Bible...</Text>
        </View>
    ) : (
        renderMainContent()
    )}

    {/* Verse Actions Modal */}
    <Modal
        visible={isVerseActionsVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseVerseActions}
    >
        <View style={styles.modalOverlay}>
        <View style={styles.verseActionsModal}>
            <TouchableOpacity
            style={styles.verseActionButton}
            onPress={handleToggleHighlight}
            >
            <Ionicons
                name={selectedVerse?.isHighlighted ? "color-wand" : "color-wand-outline"}
                size={24}
                color="#3D5AF1"
            />
            <Text style={styles.verseActionText}>
                {selectedVerse?.isHighlighted ? "Remove Highlight" : "Highlight"}
            </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.verseActionButton}
            onPress={handleToggleBookmark}
            >
            <Ionicons
                name={selectedVerse?.isBookmarked ? "bookmark" : "bookmark-outline"}
                size={24}
                color="#3D5AF1"
            />
            <Text style={styles.verseActionText}>
                {selectedVerse?.isBookmarked ? "Remove Bookmark" : "Bookmark"}
            </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.verseActionButton}
            onPress={handleOpenNoteModal}
            >
            <Ionicons name="document-text-outline" size={24} color="#3D5AF1" />
            <Text style={styles.verseActionText}>Add Note</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.verseActionButton}
            onPress={handleShareVerse}
            >
            <Ionicons name="share-social-outline" size={24} color="#3D5AF1" />
            <Text style={styles.verseActionText}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.verseActionButton}
            onPress={handleCloseVerseActions}
            >
            <Ionicons name="close" size={24} color="#FF3B30" />
            <Text style={[styles.verseActionText, { color: "#FF3B30" }]}>Close</Text>
            </TouchableOpacity>
        </View>
        </View>
    </Modal>

    {/* Note Modal */}
    <Modal
        visible={isNoteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsNoteModalVisible(false)}
    >
        <View style={styles.modalOverlay}>
        <View style={styles.noteModal}>
            <Text style={styles.noteModalTitle}>Note for Verse {selectedVerse?.verse}</Text>
            <TextInput
            style={styles.noteInput}
            placeholder="Write your note here..."
            placeholderTextColor="#999"
            multiline={true}
            value={currentNote}
            onChangeText={setCurrentNote}
            />
            <View style={styles.noteModalButtons}>
            <TouchableOpacity
                style={styles.noteModalButton}
                onPress={() => setIsNoteModalVisible(false)}
            >
                <Text style={styles.noteModalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.noteModalButton}
                onPress={handleSaveNote}
            >
                <Text style={styles.noteModalButtonText}>Save</Text>
            </TouchableOpacity>
            </View>
        </View>
        </View>
    </Modal>

    {/* Options Modal */}
    <Modal
        visible={isOptionsModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOptionsModalVisible(false)}
    >
        <View style={styles.modalOverlay}>
        <View style={styles.optionsModal}>
            <Text style={styles.optionsModalTitle}>Text Size</Text>
            <View style={styles.fontSizeControls}>
            <TouchableOpacity
                style={styles.fontSizeButton}
                onPress={handleDecreaseFontSize}
            >
                <Ionicons name="remove" size={24} color="#3D5AF1" />
            </TouchableOpacity>
            <Text style={styles.fontSizeDisplay}>
                {Math.round(fontSizeMultiplier * 100)}%
            </Text>
            <TouchableOpacity
                style={styles.fontSizeButton}
                onPress={handleIncreaseFontSize}
            >
                <Ionicons name="add" size={24} color="#3D5AF1" />
            </TouchableOpacity>
            </View>
            <TouchableOpacity
            style={styles.optionsModalClose}
            onPress={() => setIsOptionsModalVisible(false)}
            >
            <Text style={styles.optionsModalCloseText}>Close</Text>
            </TouchableOpacity>
        </View>
        </View>
    </Modal>
    </SafeAreaView>
);
}

// Styles
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
},
headerButton: {
    padding: 8,
},
headerTitleContainer: {
    flex: 1,
    marginHorizontal: 12,
},
headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
},
searchInput: {
    fontSize: 16,
    color: '#333333',
    paddingVertical: 8,
},
loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
},
booksContainer: {
    flex: 1,
    padding: 16,
},
bookGroup: {
    marginBottom: 24,
},
categoryHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 12,
},
bookItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
},
bookName: {
    fontSize: 16,
    color: '#333333',
},
chapterCount: {
    fontSize: 14,
    color: '#999999',
},
chaptersContainer: {
    flex: 1,
    padding: 16,
},
chaptersHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
},
backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
},
backButtonText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 4,
},
selectedBookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
},
chaptersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
},
chapterButton: {
    width: '23%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 8,
},
chapterButtonText: {
    fontSize: 16,
    color: '#333333',
},
chapterContainer: {
    flex: 1,
},
chapterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
},
chapterTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginHorizontal: 16,
},
optionsButton: {
    padding: 8,
},
versesContainer: {
    flex: 1,
    padding: 16,
},
verseContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
},
highlightedVerse: {
    backgroundColor: '#FFF9C4',
},
verseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
},
verseNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3D5AF1',
    marginRight: 8,
},
verseText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
},
noteIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
},
noteIndicatorText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 4,
},
chapterNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
},
chapterNavButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3D5AF1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
},
chapterNavButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginHorizontal: 8,
},
searchLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
searchLoadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
},
noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
},
noResultsText: {
    fontSize: 18,
    color: '#666666',
    marginTop: 16,
},
noResultsSubtext: {
    fontSize: 14,
    color: '#999999',
    marginTop: 8,
},
searchResultsContainer: {
    padding: 16,
},
searchResultItem: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
},
searchResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
},
searchResultBook: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
},
searchResultReference: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
},
searchResultText: {
    fontSize: 14,
    color: '#666666',
},
modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
verseActionsModal: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
},
verseActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
},
verseActionText: {
    fontSize: 16,
    color: '#333333',
    marginLeft: 16,
},
noteModal: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
},
noteModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
},
noteInput: {
    height: 120,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333333',
    marginBottom: 16,
},
noteModalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
},
noteModalButton: {
    marginLeft: 16,
},
noteModalButtonText: {
    fontSize: 16,
    color: '#3D5AF1',
},
optionsModal: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
},
optionsModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
},
fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
},
fontSizeButton: {
    padding: 8,
},
fontSizeDisplay: {
    fontSize: 16,
    color: '#333333',
},
optionsModalClose: {
    alignSelf: 'flex-end',
},
optionsModalCloseText: {
    fontSize: 16,
    color: '#3D5AF1',
},
});