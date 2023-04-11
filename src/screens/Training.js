import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from "react-native-webview"

const Training = (props) => {
    return (
        <View style={styles.container}>
            <WebView
                style={styles.videoPlayer}
                javaScriptEnabled={true}
                source={{ uri: props.trainingData.videoUrl }}
            />
            <Text></Text>
            <Text>{props.trainingData.videoTitle}</Text>
            <Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    videoPlayer: {
        alignSelf: 'stretch',
        height: 300,
    },
});

export default Training;
