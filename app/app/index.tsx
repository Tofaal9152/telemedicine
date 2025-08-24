import React, { useEffect } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { Camera } from "expo-camera";
import { Audio } from "expo-av";

export default function App() {
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        const { status: audioStatus } = await Audio.requestPermissionsAsync();

        if (cameraStatus !== 'granted' || audioStatus !== 'granted') {
          console.warn("Camera or Microphone permission denied");
        }
      }
    };
    requestPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: "https://telemedicine-olive.vercel.app" }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={['*']}
        allowsFullscreenVideo
        useWebKit
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
