import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

const DEFAULT_PAGE_SIZE = 20;

class XListView extends Component {

  constructor(props) {
    super(props);
    this._canOnEndReached = true; // 解决onEndReached多次触发问题
  }

  static propTypes = {
    refreshing: PropTypes.bool,
    data: PropTypes.array.isRequired,
    renderFooter: PropTypes.func,
    loadMoreView: PropTypes.func,
  };

  static defaultProps = {
    refreshing: false,
    pageSize: DEFAULT_PAGE_SIZE,
    renderFooter: () => null,
    onEndReached: () => {},
    loadMoreView: () => null,
  };

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={`${sectionID}-${rowID}`} style={styles.separator} />
    );
  }

  _onEndReached({distanceFromEnd}) {
    const { data, refreshing, pageSize, onEndReached } = this.props;
    if (!refreshing && data.length > 0 && this._canOnEndReached) {
      onEndReached();
      this._canOnEndReached = false;
      setTimeout(() => {
        this._canOnEndReached = true;
      }, 500);
    }
  }

  _renderFooter() {
    const { renderFooter, loadMoreView } = this.props;
    return (
      <View>
        { renderFooter() }
        { loadMoreView() }
      </View>
    );
  }

  render() {
    const {
      style,
      contentContainerStyle,
      data,
      refreshing,
      renderRow,
      renderHeader,
      renderSeparator,
      renderSectionHeader,
      ListEmptyComponent,
      onRefresh,
    } = this.props;
    return (
      <FlatList
        style={style || styles.container}
        contentContainerStyle={contentContainerStyle || styles.contentContainer}
        data={data}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderRow}
        ItemSeparatorComponent={renderSeparator || this._renderSeparator.bind(this)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        keyExtractor={(item, index) => index}
        onEndReachedThreshold={0.5}
        onEndReached={this._onEndReached.bind(this)}
        onMomentumScrollBegin={() => { this.isMomentumScrollBegin = true; }}
        onMomentumScrollEnd={() => { this.isMomentumScrollEnd = true; }}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={this._renderFooter.bind(this)}
        ListEmptyComponent={ListEmptyComponent}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebf1',
  },
  contentContainer: {
    backgroundColor: '#fff',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ddd',
  },
  sectionHeader: {
    height: 25,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: 'rgba(233,233,233,0.75)',
  },
  footer: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default XListView;
