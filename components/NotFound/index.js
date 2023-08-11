import './index.css'
import {Link} from 'react-router-dom'

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-card">
      <img
        className="not-found-img"
        src="https://res.cloudinary.com/djr2g813p/image/upload/v1685081776/erroring_1_wmvczw.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found </h1>
      <p className="not-found-paragraph">
        We are sorry, the page you requested could not be found. <br />
        Please go back to the homepage
      </p>
      <Link to="/">
        <button className="not-found-btn" type="button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
