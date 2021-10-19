import { RootStackParamList } from '../../../App';

type ScreenName ={
   GameScreen:keyof RootStackParamList
   ResultScreen:keyof RootStackParamList
   
}

const screensName:ScreenName =  {
    GameScreen:'GameScreen',
    ResultScreen:'ResultScreen'
}

export default screensName

