import React, { useRef, useEffect } from 'react';
import { Animated, StyleProp, Text, View, ViewStyle } from 'react-native';

interface Props {
  style:object
  children:JSX.Element
}

const FadeInView = (props:Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver:true,
      }
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}
export default FadeInView;