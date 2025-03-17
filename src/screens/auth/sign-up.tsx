import { ActivityIndicator, Alert, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCallback, useRef, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/utils/lib/superbase';
import { useAuth } from '@/context/auth-context';
import useOnBoarded from '@/hooks/useOnboarded';
import { AuthStackParamList } from '@/src/navigations/auth-navigation';

// Custom components
import InputField from '@/components/inputField';
import LoaderComponent from '@/components/loaderComponent';
import { churchBranch } from '@/utils/church-branches-types';

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { isAuthenticated } = useAuth();
    const { setIsOnboarded } = useOnBoarded();
    const bottomSheetRef = useRef(null);
    const navigation = useNavigation<NavigationProp<AuthStackParamList>>();
    
    const redirectLink = '/(tabs)/(home)/home-screen?emailVerified=true';
    const [formInput, setFormInput] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        branch: ""
    });
    const [loading, setLoading] = useState(false);
    const [churchBranchesIsloading, setChurchBranchesIsLoading] = useState(false);
    const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
    const [churchBranches, setChurchBranches] = useState<churchBranch[] | null>([]);
    const [selectedBranch, setSelectedBranch] = useState<{id:string, name: string} | null>(null);

    // Church branches with IDs
    // const churchBranches = [
    //     { id: 1, name: "Main Campus" },
    //     { id: 2, name: "North Campus" },
    //     { id: 3, name: "South Campus" },
    //     { id: 4, name: "East Campus" },
    //     { id: 5, name: "West Campus" },
    //     { id: 6, name: "Downtown Campus" }
    // ];

    const validateForm = () => {
        const { name, email, password, confirmPassword, branch } = formInput;
        
        if (!name.trim()) {
            setErrorMessage('Name is required');
            return false;
        }
        if (!email.trim()) {
            setErrorMessage('Email is required');
            return false;
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
            setErrorMessage('Invalid email address');
            return false;
        }
        if (!branch.trim()) {
            setErrorMessage('Please select a church branch');
            return false;
        }
        if (!password) {
            setErrorMessage('Password is required');
            return false;
        }
        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long');
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return false;
        }
        
        setErrorMessage('');
        return true;
    };

    const updateFormInput = (name: string, value: string) => {
        setFormInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const initiateSignUp = async () => {
        try {
            const { email, password, name, branch } = formInput;
            
            const {
                data: { session },
                error,
            } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: { 
                    data: {
                        name: formInput.name.toLowerCase(),
                        church_branch_id: selectedBranch?.id, // Convert branch to a number
                    },
                }
            });
          
            if (error) {
                setErrorMessage(error.message);
                setLoading(false);
                console.log(error);
                return;
            }
            
            if (!session) {
                Alert.alert('Success', 'Please check your inbox for email verification!');
                setLoading(false);
                return;
            }
        
            if (session) {
                // fetchUserProfile(session.user.id);
                // console.log('session: ', session)
            }
                
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setErrorMessage('An unexpected error occurred');
                console.error(err);
            }
        };
        // const fetchUserProfile = async (user_id:string) => {
        //     const {data, error} = await supabase.from('user_profiles').select("*").eq("user_id", user_id).single();
        //     console.log('user profile: ',data)
        //     if (error) {
        //         return console.log(error);
        //     }
        // }
        
    const handleSubmit = () => {
        setLoading(true);
        if (validateForm()) {
            initiateSignUp();
        } else {
            setLoading(false);
        }
    };

    const selectBranch = (branch: { id: string, name: string }) => {
        updateFormInput('branch', branch.id.toString()); // Store the ID as a string
        setSelectedBranch(branch); // Display the name in the UI
        setBottomSheetOpen(false);
    };
    
    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            setBottomSheetOpen(false);
        }
    }, []);
    
    const handleChurchBranchClick = () => {
        if (!(churchBranches && churchBranches?.length > 0)) {
            fetchChurchBranches();
        }
        setBottomSheetOpen(true);
    }
  
    const fetchChurchBranches = async () => {
        console.log('was clicked')
        try {
            setChurchBranchesIsLoading(true);
            const {data,error,status} = await supabase.from("church_branches").select("*");
            setChurchBranches(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }finally{
            setChurchBranchesIsLoading(false);
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <LoaderComponent isLoading={loading} />
            
            <LinearGradient
                colors={['#3b82f6', '#1e40af']}
                style={styles.headerGradient}
            >
                <View style={styles.logoContainer}>
                    <Image 
                        style={styles.logo} 
                        source={require('../../../assets/images/dcic-logo.png')} 
                        resizeMode="contain"
                    />
                </View>
            </LinearGradient>
            
            <View style={styles.formWrapper}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.formContainer}>
                        <Text style={styles.pageTitle}>Create Account</Text>
                        <Text style={styles.welcomeText}>Join our community today</Text>
                        
                        {errorMessage ? (
                            <View style={styles.errorContainer}>
                                <Ionicons name="alert-circle" size={20} color="#ef4444" />
                                <Text style={styles.errorText}>{errorMessage}</Text>
                            </View>
                        ) : null}
                        
                        <View style={styles.inputGroup}>
                            <View style={styles.inputWithIcon}>
                                <InputField
                                    name="name"
                                    onChangeText={(value) => updateFormInput('name', value)}
                                    label="Full Name"
                                    placeholder="John Doe"
                                />
                            </View>
                            
                            <View style={styles.inputWithIcon}>
                                <InputField
                                    name="email"
                                    onChangeText={(value) => updateFormInput('email', value)}
                                    label="Email Address"
                                    placeholder="user@email.com"
                                />
                            </View>
                            
                            <View>
                                <Text style={styles.inputLabel}>Church Branch</Text>
                                <TouchableOpacity 
                                    onPress={handleChurchBranchClick} 
                                    style={styles.branchSelector}
                                >
                                    <Text style={selectedBranch ? styles.branchText : styles.branchPlaceholder}>
                                        {selectedBranch?.name || 'Select Church Branch'}
                                    </Text>
                                    <Ionicons name="chevron-down" size={20} color="#6b7280" />
                                </TouchableOpacity>
                            </View>
                            
                            <View style={styles.inputWithIcon}>
                                <InputField
                                    onChangeText={(value) => updateFormInput('password', value)}
                                    label="Password"
                                    type="password"
                                    placeholder="At least 8 characters"
                                />
                            </View>
                            
                            <View style={styles.inputWithIcon}>
                                <InputField
                                    onChangeText={(value) => updateFormInput('confirmPassword', value)}
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Re-enter your password"
                                />
                            </View>
                        </View>
                        
                        <TouchableOpacity 
                            style={styles.submitButton} 
                            onPress={handleSubmit}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <Text style={styles.submitButtonText}>Creating account...</Text>
                            ) : (
                                <Text style={styles.submitButtonText}>Sign Up</Text>
                            )}
                        </TouchableOpacity>
                        
                        <View style={styles.divider}>
                            <View style={styles.dividerLine} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.dividerLine} />
                        </View>
                        
                        <View style={styles.socialSignup}>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-google" size={20} color="#ea4335" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-apple" size={20} color="#000" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialButton}>
                                <Ionicons name="logo-facebook" size={20} color="#1877f2" />
                            </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity 
                            onPress={() => navigation.navigate("signIn")}
                            style={styles.signInLink}
                        >
                            <Text style={styles.signInText}>
                                Already have an account? <Text style={styles.signInHighlight}>Sign In</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            
            {bottomSheetOpen && (
                <Modal transparent={true} animationType="fade">
                    <GestureHandlerRootView style={styles.bottomSheetContainer}>
                        <TouchableOpacity 
                            style={styles.sheetOverlay}
                            activeOpacity={1}
                            onPress={() => setBottomSheetOpen(false)}
                        />
                        <BottomSheet
                            ref={bottomSheetRef}
                            onChange={handleSheetChanges}
                            snapPoints={['40%']}
                            enablePanDownToClose={true}
                            onClose={() => setBottomSheetOpen(false)}
                        >
                            <BottomSheetView style={styles.sheetContent}>
                                {
                                    churchBranchesIsloading 
                                    ?(
                                        <ActivityIndicator  size={30} />
                                    )
                                    
                                    :(
                                        churchBranches ?
                                        <>
                                            <Text style={styles.sheetTitle}>Select Church Branch</Text>
                                            <ScrollView style={styles.branchList}>
                                                {churchBranches.map((branch, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        style={styles.branchItem}
                                                        onPress={() => selectBranch({id: branch.id, name: branch.name})}
                                                    >
                                                        <Text style={styles.branchItemText}>{branch.name}</Text>
                                                        {selectedBranch?.name === branch.name && (
                                                            <Ionicons name="checkmark" size={20} color="#3b82f6" />
                                                        )}
                                                    </TouchableOpacity>
                                                ))}
                                                <TouchableOpacity onPress={fetchChurchBranches} style={styles.refreshButton}>
                                                    <Text style={styles.refreshTitle}>Refresh</Text>
                                                </TouchableOpacity>
                                            </ScrollView>
                                        </>
                                        : 
                                        (
                                            <Text>No Church branch was found</Text>
                                        )
                                    )
                                }
                            </BottomSheetView>
                        </BottomSheet>
                    </GestureHandlerRootView>
                </Modal>
            )}
        </SafeAreaView>
    );
};

export default SignUp;

// const styles = StyleSheet.create({
//     // Your styles remain unchanged
// });

// export default SignUp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    headerGradient: {
        height: 200,
        width: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        marginTop: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    formWrapper: {
        flex: 1,
        marginTop: -50,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: '#f9fafb',
        overflow: 'hidden',
    },
    formContainer: {
        padding: 24,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: "center",
        color: '#1f2937',
        marginBottom: 8,
    },
    welcomeText: {
        textAlign: "center",
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 24,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fee2e2',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    errorText: {
        color: '#ef4444',
        marginLeft: 8,
        fontSize: 14,
    },
    inputGroup: {
        gap: 16,
        marginBottom: 24,
    },
    inputWithIcon: {
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        top: 42,
        left: 12,
        zIndex: 10,
    },
    input: {
        paddingLeft: 40,
    },
    inputLabel: {
        marginBottom: 8,
        fontWeight: '600',
        fontSize: 14,
        color: '#4b5563',
    },
    branchSelector: {
        backgroundColor: '#fff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        borderRadius: 8,
        padding: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    branchText: {
        color: '#1f2937',
        fontSize: 16,
    },
    branchPlaceholder: {
        color: '#9ca3af',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 8,
        padding: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#6b7280',
        fontSize: 14,
    },
    socialSignup: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 24,
    },
    socialButton: {
        backgroundColor: '#fff',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    signInLink: {
        alignItems: 'center',
        marginTop: 16,
    },
    signInText: {
        color: '#6b7280',
        fontSize: 14,
    },
    signInHighlight: {
        color: '#3b82f6',
        fontWeight: '600',
    },
    bottomSheetContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    sheetOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    sheetContent: {
        padding: 24,
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1f2937',
        marginBottom: 16,
    },
    branchList: {
        maxHeight: 200,
    },
    branchItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    branchItemText: {
        fontSize: 16,
        color: '#1f2937',
    },
    refreshButton: {
        padding: 10,
        marginHorizontal: "auto",
        paddingTop: 20,
    },
    refreshTitle: {
      color: '#3b82f6',
      fontWeight: "600"
    }
});