import * as React from "react";
import call from "react-native-phone-call";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Alert,
  Pressable,
  Image,
} from "react-native";
import TopHeader from "../Components/TopHeader";

import { Ionicons } from "@expo/vector-icons";
//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { Marker } from "react-native-maps";
import Footer from "../Components/Footer";
import { styles } from "../style/styles";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { address, email, hours, phone } from "../Database/firebase.js";

const VBISRegion = {
  latitude: 48.43251013505817,
  longitude: -123.36010116633796,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

function Contact({ navigation }) {
  // get the current theme & font size

  const theme = useSelector((state) => state.theme);
  const fontSize = useSelector((state) => state.fontSize);
  // initialize action dispatcher
  const dispatch = useDispatch();

  // define a component mode state
  const [mode, setMode] = useState(theme.mode);
  const [buttonSize, setButtonSize] = useState(fontSize.buttonSize);
  const [bodySize, setBodySize] = useState(fontSize.bodySize);
  const [subtitleSize, setSubtitleSize] = useState(fontSize.subtitleSize);

  // Update the app Incase the theme mode changes / font size changes
  useEffect(() => {
    setMode(theme.mode);
  }, [theme]);

  useEffect(() => {
    setButtonSize(fontSize.buttonSize);
  }, [fontSize]);

  useEffect(() => {
    setBodySize(fontSize.bodySize);
  }, [fontSize]);

  useEffect(() => {
    setSubtitleSize(fontSize.subtitleSize);
  }, [fontSize]);

  const triggerCall = () => {
    const args = {
      number: phone, // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
      skipCanOpen: true, // Skip the canOpenURL check
    };

    call(args).catch(console.error);
  };

  return (
    <View
      style={
        mode == "light" ? styles.appContainer_light : styles.appContainer_dark
      }
    >
      {/* Top Header(VBIS logo, Settings, Tuitorial)*/}
      <View style={styles.headerContainer}>
        <TopHeader navigation={navigation} />
      </View>

      <View style={styles.middleContainer}>
        <View>
          {/* Heading */}
          <Text
            style={
              [mode == "light" ? styles.heading_light : styles.heading_dark, {fontSize: subtitleSize}]
          }
            accessibilityRole="header"
          >
            Contact
          </Text>
          {/* Contact Description */}
          <Text
            style={
              [mode == "light" ? styles.bodyTextContact_light : styles.bodyTextContact_dark, {fontSize: bodySize}]
            }
            accessibilityRole="text"
          >
            <Text style={{ fontWeight: "bold" }}> Location:</Text>
            <Text> {address}</Text>
          </Text>
          <Text
            style={
              [mode == "light" ? styles.bodyTextContact_light : styles.bodyTextContact_dark, {fontSize: bodySize}]
            }
            accessibilityRole="text"
          >
            <Text style={{ fontWeight: "bold" }}> Working Hours:</Text>
            <Text> {hours} </Text>
          </Text>
          <Text
            style={
              [mode == "light" ? styles.bodyTextContact_light : styles.bodyTextContact_dark, {fontSize: bodySize}]
            }
            accessibilityRole="text"
          >
            <Text style={{ fontWeight: "bold" }}> Phone:</Text>
            <Text> {phone}</Text>
          </Text>
          <Text
            style={
              [mode == "light" ? styles.bodyTextContact_light : styles.bodyTextContact_dark, {fontSize: bodySize}]
            }
            accessibilityRole="text"
          >
            <Text style={{ fontWeight: "bold" }}> Email:</Text>
            <Text> {email}</Text>
          </Text>
          <View>
            <Pressable
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="Call VBIS"
              accessibilityHint="Open Phone app to call the VBIS front desk"
              onPress={triggerCall}
              style={
                mode == "light"
                  ? styles.callButton_light
                  : styles.callButton_dark
              }
            >
              <Ionicons name="call" size={24} color="black" />
              <Text
                style={
                  [mode == "light" ? styles.buttonText_light : styles.buttonText_dark, {fontSize: buttonSize}]
                }
              >
                Call Us
              </Text>
            </Pressable>
          </View>
        </View>

        {/* <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={VBISRegion} 
          >
            <Marker coordinate={VBISRegion} />
          </MapView>
        </View> */}
      </View>
      {/* Footer of the page(Back Button, Home Button)*/}
      <View style={styles.bottomContainer}>
        <Footer navigation={navigation} />
      </View>
    </View>
  );
}

export default Contact;
