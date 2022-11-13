import { Component } from 'react';

import { fetchImages } from 'utils/api';
import SearchBar from './SearchBar';
import ImageGallery from './imageGallery';
import LoadMore from './LoadMore';
import Loader from './Loader';
import Modal from './Modal';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    modalImage: '',
    showModal: false,
    totalHits: 0,
  };

  componentDidUpdate = (_, prevState) => {
    if (this.state.query !== prevState.query || this.state.page !== prevState.page) {
      if (this.state.query !== prevState.query) {
        this.setState({ images: [], totalHits: 0, });
      }
      this.setState({isLoading: true});
      fetchImages(this.state.query, this.state.page).then(data => {
        this.setState(prevState => ({
          images:
            this.state.page === 1
              ? [...data.hits]
              : [...prevState.images, ...data.hits],
          totalHits:
            this.state.page === 1 ? data.totalHits - data.hits.length : data.totalHits - [...prevState.images, ...data.hits].length,
        }))
      }).finally(() => {
        this.setState({isLoading: false});
      });
    }
  };

  handleSubmit = query => {
    this.setState({query, page: 1, });
  };

  handleLoadMore = () => {
    this.setState(state => ({page: state.page + 1, }));
  }

  toggleModal = (modalImage) => {
    if (!modalImage) {
      this.setState({ modalImage: '', showModal: false });
      document.body.style.overflow = '';
      document.body.style.maxHeight = '';
      return;
    }
    this.setState({ modalImage, showModal: true });
    document.body.style.overflow = 'hidden';
    document.body.style.maxHeight = '100vh';
  }

  render() {
    return (
      <>
        <SearchBar onSubmit={this.handleSubmit} />
        { this.state.isLoading && <Loader /> }
        <ImageGallery images={this.state.images} openModal={this.toggleModal} />
        {!!this.state.totalHits && <LoadMore onLoadMore={this.handleLoadMore} />}
        {this.state.showModal && <Modal modalImage={ this.state.modalImage } closeModal={this.toggleModal} />}
      </>
    );
  }
}
