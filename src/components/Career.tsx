import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          MY EDUCATION <span>&</span>
          <br /> ACADEMICS
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>SCHOOL</h4>
                <h5>Dr SRS Mission School</h5>
              </div>
              <h3>2018-24</h3>
            </div>
            <p>
             Coming from a Commerce and Math background at Dr. SRS Mission SchooL.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>COLLEGE</h4>
                <h5>Pursuing BCA (From Mdu) <br/> 1st sem - 7.00 SGPA <br/> 2nd sem - 8.18 SGPA</h5>
              </div>
              <h3>Now</h3>
            </div>
            <p>
            I am currently pursuing a BCA from St. Andrews Institute of Technology & Management (MDU). 
             My academic journey has provided me with a strong foundation in computer science fundamentals, 
             which I apply daily to my frontend projects.
             I focus on building scalable solutions and mastering the modern tech
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>IN THE FUTURE</h4>
                <h5>Full Satck Developer</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
             In the future, I aim to become a Senior Full-Stack Developer with a deep expertise in Scalable System Architecture. I want to build robust backend systems that can handle millions of users efficiently
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
