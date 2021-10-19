import AsyncStorage from '@react-native-async-storage/async-storage';


var Sound = require('react-native-sound');
// Enable playback in silence mode
Sound.setCategory('Playback');

export const wait = (timeout:any) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

const audioLength = 600;

export const playSoundBtn = (file:any) => {
if (file !== undefined){
    var whoosh = new Sound(file, Sound.MAIN_BUNDLE, (error:any) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        whoosh.setVolume(1);
        // Play the sound with an onEnd callback
        whoosh.play((success:any) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
        whoosh.setCurrentTime(0.2);
        // Get the current playback point in seconds
        wait(audioLength).then(() => {
          whoosh.stop(() => {
            // whoosh.play();
          });
        });
      });
}
    
    // Release the audio player resource
    whoosh.release();
  };

 export const renderBtns = (id: number, color: string, file1: any) => {
    let errorFile = 'error.mp3'
    return {
        id: id,
        color: color,
        soundFile: file1,
        errorFile: errorFile,
        playSound: () => playSoundBtn(file1),
        playError: () => playSoundBtn(errorFile)
    }
}

  // load users list from storage
 export const loadState = async() => {
    try {
      const serializedState =await AsyncStorage.getItem('@users');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  }; 