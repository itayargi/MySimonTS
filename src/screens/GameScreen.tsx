import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../App';
import ModalScreen from '../components/modal/ModalScreen';
import screensName from '../components/modal/utils/ScreensName';

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'GameScreen'>;
}

const GameScreen = (props: Props) => {
    const { navigation } = props
    const [showModal, setShowModal] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>("")
    const [gameWin, setGameWin] = useState<boolean>(false)

    const handleInputModal = (text: string) => {
        setUserName(text)
    }
    const navigateResultScreen = () => {
        navigation.navigate(screensName.ResultScreen)
    }
    return (
        <LinearGradient
            colors={['#4c669f', '#3f4250', '#111108']}
            style={styles.container}>
            <Text
                style={styles.welcome}>
                Welcome
            </Text>

            {/* modal to enter user name when game is finished */}
            <ModalScreen
                status={gameWin ? "win" : "loose"}
                name={userName}
                showModal={showModal}
                onChange={handleInputModal}
            />
            <Button title="Game Screen" onPress={navigateResultScreen} />

        </LinearGradient>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    welcome: {
        fontSize: 32,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: 'white',
    },
})
