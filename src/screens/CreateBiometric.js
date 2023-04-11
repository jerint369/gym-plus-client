
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import axios from 'axios';
import Home from './Home';
import { useNavigation } from '@react-navigation/native';

export default CreateBiometric = (props) => {
    const navigation = useNavigation();
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setSelectedGender] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
    const [weightLoss, setIsWeightLoss] = useState(false);
    const [muscleGain, setIsMuscleGain] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const genderOptions = ['male', 'female'];

    
    const userId = props.currentUser.userId;
    const firstName = props.currentUser.firstName;
    const lastName = props.currentUser.lastName;
    const email = props.currentUser.email;
    const phoneNumber = props.currentUser.phoneNumber;
    const currentUser = {
        userId,
        firstName,
        lastName,
        email,
        phoneNumber,
        weight,
        height,
        age,
        gender,
        weightLoss,
        muscleGain,
    };

    const handleGenderSelect = (selectedOption) => {
        setSelectedGender(selectedOption);
        setShowOptions(false);
    };

    const handleCheckbox1Change = () => {
        setIsWeightLoss(!weightLoss);
    };

    const handleCheckbox2Change = () => {
        setIsMuscleGain(!muscleGain);
    };

    const isAtLeastOneChecked = () => {
        return weightLoss || muscleGain;
    };

    const handleSubmit = async () => {
        var errors = false;
        if (gender === null) {
            errors = true;
            Alert.alert('Error', 'Please select your gender');
        }
        if (weight.trim() === '' || isNaN(weight)) {
            errors = true;
            Alert.alert('Error', 'Please enter a valid weight');
            return;
        }

        if (height.trim() === '' || isNaN(height)) {
            errors = true;
            Alert.alert('Error', 'Please enter a valid height');
            return;
        }
        if (age.trim() === '' || isNaN(age)) {
            errors = true;
            Alert.alert('Error', 'Please enter a valid age');
            return;
        }
        if (weightLoss === false && muscleGain === false) {
            errors = true;
            Alert.alert('Error', 'Please select atleast one plan');
            return;
        }

        if (errors == false) {
            try {
                const userResponse = await axios.put(
                    `http://10.192.144.153:3000/training/${userId}`,
                    {
                        height,
                        weight,
                        gender,
                        age,
                        muscleGain,
                        weightLoss,
                    }
                );
                
                if (userResponse === undefined) {
                    alert("Sorry, couldn't add your biometrics")

                }
                else {
                    console.log("Successfully Added Biometrics!");
                     navigation.navigate("Home", { currentUser: currentUser } );
                }
            } catch (error) {
                setErrorMessage("can not add biometric info");
                console.log(errorMessage)
            }

        }



    };

    return (

        <ScrollView style={styles.container}>
            <Text style={styles.header}>Biometric Details</Text>

            <View style={styles.flexcontainer}>
                <Text style={styles.label}>Plan*</Text>
                <View style={styles.flexcontainer1}>
                    <CheckBox
                        title="Weight Loss"
                        checked={weightLoss}
                        onPress={handleCheckbox1Change}
                        containerStyle={styles.checkboxContainer1}
                        textStyle={styles.checkboxText1}
                    />
                    <CheckBox
                        title="Muscle gain"
                        checked={muscleGain}
                        onPress={handleCheckbox2Change}
                        containerStyle={styles.checkboxContainer2}
                        textStyle={styles.checkboxText2}
                    />
                </View>
            </View>
            {!isAtLeastOneChecked() && <Text style={styles.error}>Please select at least one plan.</Text>}

            <View style={styles.flexcontainer}>
                <Text style={styles.label}>Height (m)*</Text>
                <TextInput
                    style={styles.input}
                    value={height}
                    onChangeText={text => setHeight(text)}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.flexcontainer}>
                <Text style={styles.label}>Weight (kg)*</Text>
                <TextInput
                    style={styles.input}
                    value={weight}
                    onChangeText={text => setWeight(text)}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.flexcontainer}>
                <Text style={styles.label}>Age*</Text>
                <TextInput
                    style={styles.input}
                    value={age}
                    onChangeText={text => setAge(text)}
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.flexcontainer}>
                <Text style={styles.label}>Gender*</Text>
                <View style={styles.dropdown}>
                    <TouchableOpacity onPress={() => setShowOptions(!showOptions)} style={styles.dropdownButton}>
                        <Text style={styles.dropdownButtonText}>{gender || 'Select Gender'}</Text>
                        <Text style={showOptions ? styles.arrowUp : styles.arrowDown}>▼</Text>
                    </TouchableOpacity>
                    {showOptions && (
                        <View style={styles.dropdownOptions}>
                            {genderOptions.map((option) => (
                                <TouchableOpacity key={option} onPress={() => handleGenderSelect(option)}>
                                    <Text style={styles.dropdownOption}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    flexcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        marginLeft: 0,
    },
    flexcontainer1: {
        flexDirection: 'column',
        alignItems: 'left',

        width: 250,
        marginLeft: 0,
    },
    header: {
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        marginTop: 16,
        width: 100,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginTop: 15,
        backgroundColor: '#fff',
        width: 150,
        marginLeft: 15,
    },
    checkboxContainer: {
        marginTop: 10,
    },
    checkboxContainer1: {
        marginTop: 16,
        marginLeft: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    checkboxContainer2: {
        marginTop: 0,
        marginLeft: 0,
        backgroundColor: 'transparent',
        borderWidth: 0,


    },
    checkboxLabel: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#f2f2f2',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    dropdown: {
        position: 'relative',
        width: 200,
        marginTop: 20,
        zIndex: 1,
        marginLeft: 15,
    },
    dropdownButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: 150,
    },
    dropdownButtonText: {
        color: '#333',
        textAlign: 'left',
    },
    dropdownOptions: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    dropdownOption: {
        padding: 5,
    },
    arrowUp: {
        fontSize: 13,
        transform: [{ rotate: '180deg' }],
    },
    arrowDown: {
        fontSize: 13,
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        marginLeft: 0,
    },
    checkboxText: {
        color: '#333',
        fontWeight: 'normal',
        marginLeft: 0,
    },
    error: {
        color: 'red',
        marginTop: -20,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 50,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },


});









