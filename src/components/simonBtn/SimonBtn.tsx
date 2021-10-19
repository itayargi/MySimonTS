import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { playSoundBtn, renderBtns } from '../utils/utils'
import { wait } from '../utils/utils'

interface Props {
    updateStateWithLevel: (level: number) => void
    setWinGame: (bool: boolean) => void
    setModalShow: (bool: boolean) => void
}
interface SimonBtn {
    id: number,
    color: string,
    soundFile: any,
    errorFile: any;
    playSound: () => void
    playError: () => void
}

///////// game setting /////////
const numberOfRounds = 100;
const flashColor = '#e6e6b7';
const flashTime = 300;
const gameSpeed = 1200;
// ////////////////////////////

// 4 simon's btns
const redSimon: SimonBtn = renderBtns(1, "red", "dosoundtwo.mp3")
const greenSimon: SimonBtn = renderBtns(2, "green", "resound.m4a")
const blueSimon: SimonBtn = renderBtns(3, "blue", "misound.m4a")
const yellowSimon: SimonBtn = renderBtns(4, "yellow", "fasound.m4a")

const options: Array<SimonBtn> = [redSimon, greenSimon, blueSimon, yellowSimon];


const SimonBtn = (props: Props) => {
    const { updateStateWithLevel } = props
    const initSimonState = {
        stage: [getRandomBtn(options)],
        index: 0,
    }
    const [flashSimonBtn, setFlashSimonBtn] = useState('');
    const [pressNotAllowed, setPressNotAllow] = useState(true);
    const [simonOption, setSimonOption] = useState(initSimonState);
    const userLevel = simonOption.stage.length - 1

    // get random choise of simon btn
    function getRandomBtn(options: any) {
        const randomNumber = Math.floor(Math.random() * 3 + 0);
        return options[randomNumber];
    }
    // action function for simon btn - play sound and flash
    const simonAction = (simonB: SimonBtn) => {
        simonB.playSound();
        setFlashSimonBtn(simonB.color);
        wait(flashTime).then(() => setFlashSimonBtn(''));
    };
    // when game is over - pop up the modal and initial simon state - boolean for winning
    const gameOver = (bool: boolean) => {
        let newBtn = getRandomBtn(options);
        updateStateWithLevel(userLevel);
        if (bool) {
            props.setWinGame(true);
        } else {
            setPressNotAllow(true);
            props.setWinGame(false);
        }
        props.setModalShow(true);
        setSimonOption({ stage: [newBtn], index: 0 });
    }
    // when starting a round - start going threw the array of btns at gameSpeed time - stops at the end of the array
    const startRound = (stage: SimonBtn[]) => {
        setPressNotAllow(true);
        if (numberOfRounds == userLevel) {
            gameOver(true);
            return;
        }
        let i = 0;
        let intervalRound = setInterval(() => {
            //   finish round
            if (stage[i] == undefined) {
                clearInterval(intervalRound);
                setPressNotAllow(false);
            } else {
                simonAction(stage[i]);
            }
            i++;
        }, gameSpeed);
        setSimonOption({ ...simonOption, index: 0 });
    };

    // start main btn function
    const startBtn = () => {
        startRound(simonOption.stage);
    };

    //render simon btn on screen
    const renderSimonBtn = (onPress: any, stylesBtn: any, btnColor: string) => {
        return (
            <TouchableOpacity
                disabled={pressNotAllowed}
                onPress={onPress}
                style={[stylesBtn, { backgroundColor: flashSimonBtn == btnColor ? flashColor : btnColor }]}>
            </TouchableOpacity>
        );
    };
    // user press function
    const myPlay = (btn: SimonBtn) => {
        const indexToCheck = simonOption.index;
        const arrayOfOption = simonOption.stage;
        const lengthOfArray = arrayOfOption.length;
        // if mistake - user press another btn - play error sound and update state for loosing
        if (arrayOfOption[indexToCheck].id !== btn.id) {
            btn.playError();
            gameOver(false);
        }
        // if not mistake and its not the last index in the array- play sound and move to next index
        else if (indexToCheck + 1 < lengthOfArray) {
            btn.playSound();
            setSimonOption({ ...simonOption, index: simonOption.index + 1 });
        }
        // if last number in array => add another random SimonButton to array
        else {
            let newBtn = getRandomBtn(options);
            btn.playSound();
            setSimonOption({
                ...simonOption,
                index: 0,
                stage: [...simonOption.stage, newBtn],
            });
        }
    };

    useEffect(() => {
        if (simonOption.stage.length > 1) {
            wait(500).then(() => startRound(simonOption.stage));
        }
    }, [simonOption.stage]);
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                {renderSimonBtn(() => myPlay(redSimon), styles.simonBtnRotate, redSimon.color)}
                {renderSimonBtn(() => myPlay(greenSimon), styles.simonBtn, greenSimon.color)}
            </View>
            <View style={styles.circle} >
                <Text>{userLevel}</Text>
            </View>
            <View style={styles.row}>
                {renderSimonBtn(() => myPlay(blueSimon), [styles.simonBtnRotate, { transform: [{ rotate: '180deg' }] }], blueSimon.color)}
                {renderSimonBtn(() => myPlay(yellowSimon), [styles.simonBtn, { transform: [{ rotate: '270deg' }] }], yellowSimon.color)}
            </View>
            <TouchableOpacity
                disabled={userLevel > 1 && pressNotAllowed}
                onPress={() => startBtn()}
                style={styles.btn}>
                <LinearGradient
                    colors={['#4c669f', '#3f4250']}
                    style={styles.linearGradient}>
                    <Text style={styles.btnText}>START</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default SimonBtn

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        width: "100%",
        marginVertical: 50
    },
    simonBtn: {
        backgroundColor: "red",
        width: 70,
        height: 70,
        borderTopRightRadius: 50,
    },
    simonBtnRotate: {
        width: 70,
        height: 70,
        borderTopRightRadius: 50,
        transform: [{ rotate: '90deg' }],
        marginRight: 10,
        marginBottom: 10
    },
    row: {
        flexDirection: "row",
    },
    circle: {
        position: "absolute",
        top: 50,
        padding: 15,
        backgroundColor: "grey",
        borderRadius: 50,
        zIndex: 1
    },
    linearGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        width: '45%',
        height: 70,
        padding: 5,
    },
    btnText: {
        fontSize: 18,
        color: 'white',
    },
})
