import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { RootStackParamList } from '../../App'
import screensName from '../components/modal/utils/ScreensName'

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'ResultScreen'>;
}

const ResultScreen = (props: Props) => {
    const { navigation } = props

    const navigateGameScreen = () => {
        navigation.navigate(screensName.GameScreen)
    }
    return (
        <View style={styles.container}>
            <Text>result screen</Text>
            <Text>press the btn to navigate to game screen</Text>

            <Button title="Game Screen" onPress={navigateGameScreen} />
        </View>
    )
}

export default ResultScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

})