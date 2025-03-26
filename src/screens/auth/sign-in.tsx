import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { supabase } from '@/utils/lib/superbase';
import { NavigationProp } from '@react-navigation/native';

// Custom components
import InputField from '@/components/inputField';
import LoaderComponent from '@/components/loaderComponent';

const SignIn = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    async function signInWithEmail() {
        if (!email.trim() || !password.trim()) {
            setErrorMessage('Email and password are required');
            return;
        }

        try {
            setLoading(true);
            setErrorMessage('');
            
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            
            if (error) {
                setErrorMessage(error.message || 'Failed to sign in');
                return;
            }
            
            if (data.session && data.user) {
                // Alert.alert('Success', 'Logged in successfully');
            } else {
                setErrorMessage('Login was not successful');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleForgotPassword = () => {
        Linking.openURL('exp+dominion-mobile-app://expo-development-client/?url=http%3A%2F%2F192.168.55.37%3A8081/emailVerify');
    };


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
                <View style={styles.formContainer}>
                    <Text style={styles.pageTitle}>Welcome Back</Text>
                    <Text style={styles.welcomeText}>Sign in to continue</Text>
                    
                    {errorMessage ? (
                        <View style={styles.errorContainer}>
                            <Ionicons name="alert-circle" size={20} color="#ef4444" />
                            <Text style={styles.errorText}>{errorMessage}</Text>
                        </View>
                    ) : null}
                    
                    <View style={styles.inputGroup}>
                        <View style={styles.inputWithIcon}>
                            {/* <Ionicons name="mail-outline" size={20} color="#6b7280" style={styles.inputIcon} /> */}
                            <InputField 
                                name=""
                                label="Email Address" 
                                placeholder="user@email.com" 
                                onChangeText={setEmail}
                                // keyboardType="email-address"
                                // containerStyle={styles.input}
                                // autoCapitalize="none"
                            />
                        </View>
                        
                        <View style={styles.inputWithIcon}>
                            {/* <Ionicons name="lock-closed-outline" size={20} color="#6b7280" style={styles.inputIcon} /> */}
                            <InputField 
                                name=""
                                type="password" 
                                label="Password" 
                                placeholder="Enter your password"
                                onChangeText={setPassword}
                                // containerStyle={styles.input}
                            />
                        </View>
                    </View>
                    
                    <TouchableOpacity 
                        style={styles.forgotPasswordLink} 
                        onPress={handleForgotPassword}
                    >
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.submitButton} 
                        onPress={signInWithEmail}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <Text style={styles.submitButtonText}>Signing in...</Text>
                        ) : (
                            <Text style={styles.submitButtonText}>Sign In</Text>
                        )}
                    </TouchableOpacity>
                    
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or</Text>
                        <View style={styles.dividerLine} />
                    </View>
                    
                    <View style={styles.socialSignin}>
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
                        onPress={() => navigation.navigate("signUp")}
                        style={styles.createAccountLink}
                    >
                        <Text style={styles.createAccountText}>
                            Don't have an account? <Text style={styles.createAccountHighlight}>Create Account</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SignIn;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    headerGradient: {
        height: 220,
        width: '100%',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 160,
        marginTop: 20,
    },
    logo: {
        width: 120,
        height: 120,
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
        fontSize: 28,
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
        marginBottom: 8,
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
    forgotPasswordLink: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: '#3b82f6',
        fontSize: 14,
        fontWeight: '500',
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
        paddingHorizontal: 16,
        color: '#6b7280',
        fontSize: 14,
    },
    socialSignin: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 16,
        marginBottom: 24,
    },
    socialButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    createAccountLink: {
        alignItems: 'center',
        marginTop: 8,
    },
    createAccountText: {
        color: '#4b5563',
        fontSize: 14,
    },
    createAccountHighlight: {
        color: '#3b82f6',
        fontWeight: '600',
    },
});