import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
} from 'react-native';
import warning from 'fbjs/lib/warning';

import {
  TouchableView,
} from '../../lib/components';

class FormFieldEditor extends Component {
  static navigationOptions = ({ navigation: { goBack, state } }) => ({
    title: state.params.title || '更改',
    headerRight: (
      <TouchableView
        style={styles.headerRight}
        onPress={() => state.params.handleSubmit()}>
        <Text style={styles.headerRightText}>保存</Text>
      </TouchableView>
    )
  });

  constructor(props) {
    super(props);
    const { field, value } = props.navigation.state.params;
    this.state = {
      field: field,
      value: value,
    };
    this._onChange = this._onChange.bind(this);
    this._submit = this._submit.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ handleSubmit: this._submit });
  }

  _submit() {
    const { state: { params: { onSave } }, goBack } = this.props.navigation;
    warning(
      typeof onSave === 'function',
      `The navigation params.onSave should be a function, but got ${onSave}`
    );
    if (typeof onSave === 'function') {
      const result = onSave(this.state.value);
      result.then(() => {
        goBack();
      });
    }
  }

  _onChange(event) {
    this.setState({ value: event.nativeEvent.text || '' });
  }

  render() {
    const { state } = this.props.navigation;
    const { placeholder, keyboardType } = state.params;
    return (
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            value={this.state.value}
            onChange={(event) => this._onChange(event)}
            underlineColorAndroid="transparent"
            placeholder={placeholder}
            keyboardType={keyboardType}
            placeholderTextColor="#bfbfbf"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerRight: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  headerRightText: {
    fontSize: 16,
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textInputContainer: {
    margin: 10,
    paddingLeft: 8,
    paddingRight: 8,
    minHeight: 45,
    borderBottomWidth: 1,
    borderBottomColor: '#40c0cb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flexGrow: 1,
    fontSize: 17,
    paddingTop: 15,
    borderRadius: 4,
    textAlignVertical: 'center',
  },
});

export default FormFieldEditor;
