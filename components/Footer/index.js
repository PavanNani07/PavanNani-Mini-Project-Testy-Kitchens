import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

const Footer = () => (
  <div className="footer-sec">
    <div className="footer-sec-sub-container">
      <div className="footer-logo-container">
        <img
          className="footer-website-logo"
          src="https://res.cloudinary.com/djr2g813p/image/upload/v1684569745/Frame_275_ko80t1.png"
          alt="website-footer-logo"
        />

        <h1 className="footer-website-heading"> Tasty Kitchen </h1>
      </div>
      <p className="footer-paragraph">
        The only thing we are serious about is food. <br />
        Contact us on
      </p>
      <div className="footer-icon-container">
        <FaPinterestSquare testid="pintrest-social-icon" className="fa-icon" />
        <FaInstagram testid="instagram-social-icon" className="fa-icon" />
        <FaTwitter testid="twitter-social-icon" className="fa-icon" />
        <FaFacebookSquare testid="facebook-social-icon" className="fa-icon" />
      </div>
    </div>
  </div>
)

export default Footer
