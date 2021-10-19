import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import {connect} from 'react-redux';
import FadeInView from '../components/fadeInView/FadeInView';
import PlayersList from '../components/playerList/PlayersList';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import {Player} from '../types/types'
interface Props {
    navigation: StackNavigationProp<RootStackParamList, 'ResultScreen'>;
    scores:any
}
const ResultScreen = (props:Props) => {
  const reduxState = props.scores;
  console.log('state', reduxState);
  let listByOrder = orderList(reduxState);
  const [userList, setUserList] = useState(listByOrder);

  function orderList(list:Player[]) {
      console.log(' my list', list);
      
    if (list !== undefined) {
      let orderedList =list.sort((a, b) => (a.score < b.score) ? 1 : -1)
      return orderedList;
    }
  }

  useEffect(() => {
    let playersF = AsyncStorage.setItem('@users', JSON.stringify(reduxState));
  }, [reduxState]);

  
  const navigateGameScreen = () => {
    props.navigation.navigate('GameScreen');
  };

  return (
    <View style={styles.container}>
      {/* list */}
      <FadeInView style={{flex: 1}}>
        {userList && userList.length > 0 ? (
          <PlayersList playersList={userList} />
        ) : (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={styles.userText}>The list is empty</Text>
            <Text style={styles.userText}>Press start to play</Text>
          </View>
        )}
      </FadeInView>
      <Button title="Game Screen" onPress={navigateGameScreen} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {flex: 1, padding: 10, maxWidth:"100%"},
  userText: {
    color: 'white',
  },
});
function mapStateToProps(state:any) {
  return {
    scores: state.scores,
  };
}

export default connect(mapStateToProps)(ResultScreen);
