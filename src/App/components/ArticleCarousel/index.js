import React, { Component } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Dimensions, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { Badge } from 'react-native-elements';

import ArticleItem from '../ArticleItem/index';
import { bindActionCreators } from 'redux';
import { fetchApi, setToggleCarousel, setTopArticle } from '../../store/actions';
import config from '../../config/apiConfig';
import styles from './index.style';

const { width } = Dimensions.get('window');

class ArticleCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: 1,
      slider1Ref: null,
      currentSite: config.sites[Math.floor(Math.random() * 2)]
    }
  }

  componentWillMount() {
    this.props.fetchApi(
      this.state.currentSite.id,
      config.typeOfResult.popular,
      1,
      false,
      setTopArticle
    );
  }

  renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <ArticleItem noInfo={true} article={item} keys={index}/>
      </View>
    );
  }

  renderCarousel() {
    if (!this.props.toggle) return null;

    const articles = this.props.topArticle.filter((item, index) => index < 5);
    return (
      <View style={styles.carouselContainer}>
        <Carousel
          ref={(c) => {
            if (!this.state.slider1Ref) {
              this.setState({ slider1Ref: c });
            }
          }}
          data={articles}
          renderItem={this.renderItem}
          sliderWidth={width - 20}
          itemWidth={width - 20}
          autoplay={true}
          onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
        />
        <Pagination
          dotsLength={articles.length}
          activeDotIndex={this.state.slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={'#fff'}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this.state.slider1Ref}
          tappableDots={!!this.state.slider1Ref}
        />
      </View>
    )
  }

  render() {
    return (
      <View>
        <View style={styles.carouselTopTitleContainer}>
          <View>
            <Text style={styles.carouselTitle}>
              Top 5 Articles from {this.state.currentSite.name}
            </Text>
          </View>
          <View>
            <Badge
              value={this.props.toggle ? 'Hide' : 'Show'}
              containerStyle={styles.badgeContainer}
              textStyle={{ color: '#ffffff', fontSize: 11, fontWeight: 'bold', opacity: 0.9 }}
              onPress={() => {
                this.props.setToggleCarousel(this.props.toggle)
              }}
            />
          </View>
        </View>
        {this.renderCarousel()}
      </View>
    );
  }
}

const mapStateToProps = ({ apiReducer, appReducer }) => {
  return {
    topArticle: apiReducer.topArticle,
    toggle: appReducer.showCarousel,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApi: bindActionCreators(fetchApi, dispatch),
    setTopArticle: bindActionCreators(setTopArticle, dispatch),
    setToggleCarousel: bindActionCreators(setToggleCarousel, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCarousel);