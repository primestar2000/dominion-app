import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import InputField from '@/components/inputField';
import { Link } from 'expo-router';


const SignUp = () => {
    // const { setAuthenticatedUser } = useContext(AppContext);
    // const [formInput, setFormInput] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    //     confirmPassword: ""
    // });
    // const [loading, setLoading] = useState(false);

    // const showToast = (type, text1, text2) => {
    //     Toast.show({
    //         type,
    //         text1,
    //         text2,
    //         text1Style: { fontSize: 14 },
    //         text2Style: { fontSize: 12 }
    //     });
    // };

    // const validateForm = () => {
    //     const { name, email, password, confirmPassword } = formInput;
    //     if (!name) {
    //         showToast('error', 'Name is required');
    //         return false;
    //     }
    //     if (!email) {
    //         showToast('error', 'Email is required');
    //         return false;
    //     }
    //     if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    //         showToast('error', 'Invalid email address');
    //         return false;
    //     }
    //     if (!password) {
    //         showToast('error', 'Password is required');
    //         return false;
    //     }
    //     if (password.length < 8) {
    //         showToast('error', 'Password must be at least 8 characters long');
    //         return false;
    //     }
    //     if (!confirmPassword) {
    //         showToast('error', 'Confirm password is required');
    //         return false;
    //     }
    //     if (confirmPassword !== password) {
    //         showToast('error', 'Passwords do not match');
    //         return false;
    //     }
    //     return true;
    // };

    // const handleSubmit = () => {
    //     if (validateForm()) {
    //         initiateSignUp();
    //     }
    // };

    // const initiateSignUp = () => {
    //     setLoading(true);
    //     const { name, email, password } = formInput;

    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             const user = userCredential.user;
    //             setAuthenticatedUser(user);
    //             return updateCurrentUser(auth.currentUser, { displayName: name });
    //         })
    //         .then(() => {
    //             setLoading(false);
    //             showToast('success', 'Sign Up Successful', 'Welcome to the app!');
    //         })
    //         .catch((error) => {
    //             setLoading(false);
    //             let errorMessage;

    //             switch (error.code) {
    //                 case 'auth/email-already-in-use':
    //                     errorMessage = 'This email address is already in use.';
    //                     break;
    //                 case 'auth/invalid-email':
    //                     errorMessage = 'Please enter a valid email address.';
    //                     break;
    //                 case 'auth/weak-password':
    //                     errorMessage = 'Password should be at least 6 characters.';
    //                     break;
    //                 default:
    //                     errorMessage = error.message;
    //             }
    //             showToast('error', 'Sign Up Error', errorMessage);
    //         });
    // };

    // const updateFormInput = (name, value) => {
    //     setFormInput({ ...formInput, [name]: value });
    // };

    // useEffect(() => {
    //     console.log(formInput);
    // }, [formInput]);

    return (
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
            <ScrollView>
                <View style={styles.frame}>
                    <View style={styles.logoFrame}>
                        <Image style={styles.logo} source={require('../../assets/images/dcic-logo.png')} />
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={styles.pageTitle}>Sign Up</Text>
                        <Text style={styles.welcomeText}>Welcome Back To Your App</Text>

                        <InputField
                            name="name"
                            // onChangeText={(value) => updateFormInput('name', value)}
                            onChangeText={()=>{}}
                            label="Name"
                            />
                        <InputField
                            name="email"
                            onChangeText={()=>{}}
                            // onChangeText={(value) => updateFormInput('email', value)}
                            label="Email Address"
                            placeholder="user@email.com"
                            />
                        <InputField
                            // onChangeText={(value) => updateFormInput('password', value)}
                            onChangeText={()=>{}}
                            label="Password"
                            type="password"
                            />
                        <InputField
                            onChangeText={()=>{}}
                            // onChangeText={(value) => updateFormInput('confirmPassword', value)}
                            label="Confirm Password"
                            type="password"
                        />
                        {/* <SubmitButton onPress={handleSubmit} loading={loading} /> */}
                        <Link href={'/(authentication)/sign-in'} asChild>
                            <TouchableOpacity>
                                <Text style={styles.signUpLink}>Already An Existing User?</Text>
                            </TouchableOpacity>
                        </Link>
                    </View>
                </View>
            </ScrollView>
            <StatusBar barStyle={'default'} />
            {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        </SafeAreaView>
    );
};

export default SignUp;

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        width: "100%",
        backgroundColor: "#f0f4f5",
    },
    logoFrame: {
        width: 120,
        height: 120,
        marginHorizontal: "auto",
        marginTop: 30,
    },
    logo: {
        width: "100%",
        height: "100%",
    },
    formContainer: {
        padding: 20,
        gap: 10,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: "800",
        textAlign: "center",
    },
    welcomeText: {
        textAlign: "center",
        fontSize: 20,
        color: "#363636",
    },
    signUpLink: {
        textAlign: "center",
        marginVertical: 10,
        color: "blue",
    },
});
