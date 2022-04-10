import PageHeader from "./common/pageHeader";

const About = () => {
  return (
    <>
      <PageHeader
        title={
          <>
            <i className="bi bi-basket2"> </i>
            About the website
          </>
        }
      />
      <div className="row">
        <div className="col-12">
          <p id="fontAboutText">
            Hello. i am Adir Barukh and welcome to AwesomeShopIL. Here you can
            buy the best things an orderly and clean why.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
