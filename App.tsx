import { Text } from "react-native"
import { View } from "react-native"
import { AuthProvider } from "./context/auth-context";
import { Provider } from "react-redux"
import store from "./redux/store";
import { useAppSelector } from "./redux/hooks";
import RootNavigator from "./src/navigations/root-navigator";
const App = () => {
    // const {isAuthenticated} = useAppSelector(store => store.auth);
    return(
        <Provider store={store}>
            <RootNavigator />
        </Provider>
    )
}
export default App;