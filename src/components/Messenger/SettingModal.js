import React from 'react'
import Modal from '@material-ui/core/Modal'
import image1 from '../../photos/blue-abstract-acrylic-brush-stroke-textured-background_53876-86373.jpg'
import image2 from '../../photos/wooden-table-product-background_53876-90059.jpg'
import image3 from '../../photos/white-wooden-texture-flooring-background_53876-63634.jpg'
import image4 from '../../photos/781257.jpg'
import image5 from '../../photos/275_wide.jpg'
import { selectBackground } from '../../action/Conversation'

export default class Modals extends React.Component {
  constructor () {
    super()
    this.state = {
      imageList: [
        {
          img: image1,
          alt: 'background'
        },
        {
          img: image2,
          alt: 'background'
        },
        {
          img: image3,
          alt: 'background'
        },
        {
          img: image4,
          alt: 'background'
        },
        {
          img: image5,
          alt: 'background'
        }
      ]
    }
  }

  render () {
    return (
      <Modal
        className='modalStyle'
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        open={this.props.open}
        onClose={() => this.props.closeModal()}
      >
        <div className='editModal'>
          <span><b> BackGround </b> </span>
          <div className='backgoundImgDiv'>
            {this.state.imageList.map(tile => (
            // <GridListTile >
              <img src={tile.img} alt={tile.alt} key={tile.img} onClick={() => this.props.dispatch(selectBackground(tile.img, tile.alt))} />
            // </GridListTile>
            ))}
          </div>
          <button className='editButton' onClick={() => this.props.closeModal()} > SAVE </button>
        </div>
      </Modal>
    )
  }
}
