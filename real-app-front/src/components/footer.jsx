import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className=" pt-3 m-1 p-3  text-center bg-primary text-light">
      <span>
        <a className="facebookStyle" href="https://www.instagram.com/adir.baruch/">
          <i className="bi bi-instagram text-dark"></i>
        </a>
        <p className="instegramStyle"> adir9181@gmail.com</p>
        AwesomeShopIL
      </span>

      <span className="mx-2 ">&copy;A.B</span>
      <span>{new Date().getFullYear()}</span>
    </div>
  );
};

export default Footer;
