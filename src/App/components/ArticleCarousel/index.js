import React, { Component } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { StyleSheet, Text, View, Dimensions} from 'react-native';
import { connect } from 'react-redux';
import colors from '../../../design/index';
import ArticleItem from '../ArticleItem/index';
import { bindActionCreators } from 'redux';
import { fetchApi, setTopArticle } from '../../../store/actions';
import config from '../../../config/apiConfig';


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
        <ArticleItem article={item} keys={index}/>
      </View>
    );
  }

  render() {
    if(!this.props.toggle) return null;

    const articles = this.props.topArticle.filter((item, index) => index < 5);

    return (
      <View>
        <Text style={styles.carouselTitle}>
          Top 5 Articles from {this.state.currentSite.name}
        </Text>
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
      </View>
    );
  }
}

const mapStateToProps = ({ apiReducer }) => {
  return {
    topArticle: apiReducer.topArticle,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchApi: bindActionCreators(fetchApi, dispatch),
    setTopArticle: bindActionCreators(setTopArticle, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleCarousel);

const styles = StyleSheet.create({
  carouselContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,

  },
  slide: {
    width: width - 20,
    backgroundColor: '#fff',
    shadowColor: colors.clearColor,
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 1
  },
  title: {
    backgroundColor: 'transparent'
  },
  paginationContainer: {
    paddingVertical: 8
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 1,
    marginTop: 15
  },
  carouselTitle: {
    backgroundColor:'transparent',
    color: '#fff',
    fontWeight: 'bold',
    paddingLeft: 10
  }
});