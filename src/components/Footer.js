import React from 'react';
import Modal from 'react-modal';
import privacyStatement from '../data/privacyStatement';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#privacy');

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div>
            <img src="footer-logo-govt.png" srcSet="footer-logo-govt@2x.png 2x,footer-logo-govt.png 1x" width="240" height="46" alt="New Zealand Government" />
            <p>Alpha</p>
            <span id="privacy" onClick={this.openModal}>Privacy Statement</span>
            {this.state.modalIsOpen && <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <button onClick={this.closeModal}>close</button>
              <div dangerouslySetInnerHTML={{ __html: privacyStatement.content.en.text }}></div>
            </Modal>}
          </div>
        </div>
      </footer>);
  }
}

export default Footer;
