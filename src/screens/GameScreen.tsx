import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '../../App';
import ModalScreen from '../components/modal/ModalScreen';
import SimonBtn from '../components/simonBtn/SimonBtn';
import screensName from '../components/utils/ScreensName';
import { connect } from 'react-redux';
import { loadState } from '../components/utils/utils'

interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'GameScreen'>;
    scores: any
    dispatch: any
}

const GameScreen = (props: Props) => {
    const { navigation } = props
    const [showModal, setShowModal] = useState<boolean>(false)
    const [userName, setUserName] = useState<string>("")
    const [gameWin, setGameWin] = useState<boolean>(false)
    const [userLevel, setUserLevel] = useState(0)
    const reduxState = props.scores;
    const sumOfPlayers = reduxState.length;
    const maxPlayersOnList = 10;

    const handleInputModal = (text: string) => {
        setUserName(text)
    }
    const navigateResultScreen = () => {
        navigation.navigate(screensName.ResultScreen)
    }
    const updateStateWithLevel = (level: number) => {
        setUserLevel(level)
    }

    // CHECK IF USER'S SCORE IS ENOUGH TO ENTER THE LIST 
    const checkifUserEnterList = (score: number) => {
        let otherLowerUser = reduxState.find((user: any) => user.score <= score);
        if (otherLowerUser !== undefined) {
            props.dispatch({ type: 'DELETEUSER', id: otherLowerUser.id });
            return true;
        } else return false;
    };

    // upload storage to state
    const updateStateFromStorage = async () => {
        let listFromStorage = await loadState();
        if (listFromStorage !== undefined) {
            console.log('listFromStorage', listFromStorage)
            let copyToState = listFromStorage.map((user: any) => {
                props.dispatch({ type: 'ADDPRESS', name: user.name, score: user.score });
            })
        }
    }

    // WHEN GAME IS FINISH FUNCTION => ENTER/NOT ENTER THE USER TO THE LIST
    const LevelUp = async () => {
        //if list is less than 10 players -enter the user
        if (sumOfPlayers < maxPlayersOnList) {
            props.dispatch({ type: 'ADDPRESS', name: userName, score: userLevel });
        }
        // the list has 10 players- check result to see if the user enter the list
        else {
            let userEnter = checkifUserEnterList(userLevel);
            if (userEnter) {
                props.dispatch({ type: 'ADDPRESS', name: userName, score: userLevel });
            }
            // user is not joining the list- just navigate to ResultScreen
            else {
                console.log('you are not in the list');
            }
        }
    };

    const closeModal=()=>{
        setShowModal(false)
    }
    const onModalBtnPress=()=>{
        LevelUp()
        navigation.navigate(screensName.ResultScreen)
    }

    useEffect(() => {
        updateStateFromStorage()
    }, [])
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
                status={gameWin ? "won" : "lost"}
                name={userName}
                showModal={showModal}
                onChange={handleInputModal}
                closeModal={closeModal}
                onPress={onModalBtnPress}
            />
            <SimonBtn
                updateStateWithLevel={updateStateWithLevel}
                setWinGame={setGameWin}
                setModalShow={setShowModal}
            />
            <Button title="Result Screen" onPress={navigateResultScreen} />
        </LinearGradient>
    )
}


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

function mapStateToProps(state: any) {
    return {
        scores: state.scores,
    };
}

export default connect(mapStateToProps)(GameScreen);
