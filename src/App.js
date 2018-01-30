/**
 * Kyuen App
 * @flow
 */

import {
  StackNavigator,
} from 'react-navigation';
import BatterScreen from './BatterScreen';

const App = StackNavigator({
  Home: { screen: BatterScreen },
});
export default App;
