import { AsyncStorage } from 'react-native';
import warning from 'fbjs/lib/warning';

import { themes } from './index';

class ThemeFactory {
  constructor() {
    this.theme = 'Default';
    this._initTheme();
  }

  async _initTheme() {
    console.log('init theme');
    try {
      const name = await AsyncStorage.getItem('@theme:name');
      if (name && themes[name]){
        this.name = name;
        console.log('init theme done');
        return this._createTheme(themes[name]);
      }
    } catch (error) {
      return this._createTheme(themes[this.name]);
    }
  }

  _createTheme(theme = themes.Default) {
    return {
      primaryColor: theme.primaryColor,
      backgroundColor: theme.backgroundColor,
      navBar: {
        backgroundColor: theme.primaryColor,
      },
      navBarTextColor: 'white',
    };
  }

  async setTheme(name) {
    if (!themes[name]) {
      warning(
        themes[name],
        `Can not find theme name: ${name}`
      );
      return;
    }
    try {
      this.name = name;
      await AsyncStorage.setItem('@theme:name', name);
    } catch (error) {
      // Error saving data
    }

  }

  currentTheme() {
    return this._createTheme(themes[this.name]);
  }
}

export default new ThemeFactory();
