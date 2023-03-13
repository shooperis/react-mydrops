import './NewbieTour.scss';
import inputImg from "./../../assets/images/newbie-tour/input_img.png";
import equalImg from "./../../assets/images/newbie-tour/equal_img.png";
import PostImg from "./../../assets/images/newbie-tour/post_img.png";

const NewbieTour = () => {
  return (
    <div className="newbie-tour">
      <h1 className="title">
        Hello,
        <span>here is a tour how to drop your information into this page</span>
      </h1>
      <div className="left">
        For example paste youtube video link
        <img src={inputImg} alt="Input image" />
        <div className="supported">
          <div className="item supp_youtube">Youtube video</div>
          <div className="item supp_vimeo">Vimeo video</div>
          <div className="item supp_link">Site link</div>
          <div className="item supp_image">Image link</div>
          <div className="item supp_etc">and etc.</div>
        </div>
      </div>
      <div className="center">
        <img src={equalImg} alt="Equal image" />
      </div>
      <div className="right">
        And we got Youtube video in your drops
        <img src={PostImg} alt="Post image" />
      </div>
    </div>
  )
}

export default NewbieTour