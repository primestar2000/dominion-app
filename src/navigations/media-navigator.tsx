import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VideoScreen from "../screens/app/media/video/video-media-screen";
import AudioScreen from "../screens/app/media/audio/audio-media-screen";
import CreateVideoScreen from "../screens/app/media/video/create-video-screen";
import CreateAudioScreen from "../screens/app/media/audio/create-audio-screen";
export type MediaNavigatorParamList = {
  videoScreen: undefined;
  audioScreen: undefined; 
  createVideoScreen: undefined;
  createAudioScreen: undefined; 
}
const MediaNavigator = () => {
    const Stack = createNativeStackNavigator<MediaNavigatorParamList>();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={'videoScreen'} component={VideoScreen} />
            <Stack.Screen name={'audioScreen'} component={AudioScreen} />
            <Stack.Screen name={'createVideoScreen'} component={CreateVideoScreen} />
            <Stack.Screen name={'createAudioScreen'} component={CreateAudioScreen} />
        </Stack.Navigator>
    )
}
export default MediaNavigator