import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Development Intern</h4>
                <h5>Innfokidaa Solutions Pvt. Ltd.</h5>
              </div>
              <h3>Jun '25</h3>
            </div>
            <p>
              Learned web development fundamentals and worked on live mini-projects,
              gaining foundational experience in full-stack development workflows.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Programming & Aptitude Trainee</h4>
                <h5>MyPerfectice</h5>
              </div>
              <h3>Jun '25</h3>
            </div>
            <p>
              Strengthened problem-solving skills and core programming concepts through
              structured training in algorithms and aptitude.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Development Intern</h4>
                <h5>Cybronix Pvt. Ltd.</h5>
              </div>
              <h3>Mar '26</h3>
            </div>
            <p>
              Gained hands-on experience in full-stack web development in an office environment.
              Built and contributed to real-world client projects.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Automation Intern</h4>
                <h5>IIIT Bhagalpur</h5>
              </div>
              <h3>Jun '26</h3>
            </div>
            <p>
              Gained practical exposure to automation engineering through hands-on work with
              workflow automation tools and scripting techniques. Applied automation principles
              to streamline processes and improve operational efficiency in a research-driven environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
