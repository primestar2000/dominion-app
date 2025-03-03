import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import InputField from '@/components/inputField';
import SubmitButton from '@/components/submit-button';
import { Link } from 'expo-router';

// import Toast from 'react-native-toast-message';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../firebaseConfig';

const SignIn = ({ navigation }:{navigation: any}) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({
        type: "info",
        text1: "",
        text2: "",
    });

    // useEffect(() => {
    //     if (message.text1) {
    //         Toast.show({
    //             type: message.type,
    //             text1: message.text1,
    //             text2: message.text2,
    //             text1Style: { fontSize: 20 },
    //         });
    //     }
    // }, [message]);

    // const alertMessage = ({ messageType, text1, text2 }) => {
    //     setMessage({
    //         type: messageType || "info",
    //         text1,
    //         text2,
    //     });
    // };

    // const handleSubmit = () => {
    //     if (!email || !password) {
    //         alertMessage({ messageType: 'error', text1: 'Input Error', text2: 'Please fill all fields' });
    //         return;
    //     }

    //     setLoading(true);

    //     signInWithEmailAndPassword(auth, email, password).then(()=>{   
    //         alertMessage({messageType: 'success', text1: 'success', text2: "Authenticated"})
    //     }).catch((error)=>{
    //         alertMessage({messageType: 'error', text1: 'Authentication Error', text2: error.message})
    //     }).finally(
    //         ()=>{
    //             setLoading(false)
    //         }
    //     );
    // };

    return (
        <SafeAreaView style={{ flex: 1, width: "100%" }}>   
            <View style={styles.frame}>
                <View style={styles.logoFrame}>
                    <Image style={styles.logo} source={require('../../assets/images/dcic-logo.png')} />
                </View>
                <View style={styles.formContainer}>
                    <Text style={styles.pageTitle}>Sign In</Text>
                    <Text style={styles.welcomeText}>Welcome Back To Your App</Text>
                    <InputField 
                    name=''
                        label={"Email Address"} 
                        placeholder={"user@email.com"} 
                        // value={email} 
                        onChangeText={setEmail} 
                    />
                    <InputField 
                    name=''
                        type={"password"} 
                        label={"Password"} 
                        // value={password} 
                        onChangeText={setPassword} 
                    />
                    <SubmitButton onPress={()=>{}} loading={loading} />
                    <Link href={'/(authentication)/sign-up'} asChild>
                        <TouchableOpacity>
                            <Text style={styles.signUpLink}>Create Account</Text>
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity >
                        <Text style={styles.signUpLink}>Forgot Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <StatusBar />
        </SafeAreaView>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        width: "100%",
        backgroundColor: "#e0dddd",
    },
    logoFrame: {
        width: 150,
        height: 150,
        marginHorizontal: "auto",
        marginTop: 50,
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
