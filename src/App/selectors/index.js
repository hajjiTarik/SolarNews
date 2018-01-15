import design from '../../design';

export const articleSelector = state => {
  if (!state) return false;

  return {
    id: state._id,
    title: state.title,
    source: sourceSelector(state),
    image: imageSelector(state),
  }
};

export const sourceSelector = ({ source }) => {
  if (!source) return false;

  return {
    name: source.name,
    sourceUrl: source.absoluteUrl,
    authorName: source.authorName,
    commentsCount: source.commentsCount,
    likesCount: source.likesCount,
    viewsCount: source.viewsCount,
  }
};

export const imageSelector = ({ image }) => {
  return {
    normal: image.normal ? image.normal : design.noImage
  }
};