// MainPage.js
import React from 'react';
import './MainPage.css';

function MainPage() {
  return (
    <div className="main-page">
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Welcome to Our Tutorial Platform</h1>
          <p className="lead">
            Learn, share, and grow with our vast collection of tutorials.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://images.pexels.com/photos/4160063/pexels-photo-4160063.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="card-img-top"
                alt="tutorials"
              />
              <div className="card-body">
                <h5 className="card-title">Tutorials</h5>
                <p className="card-text">
                  Explore our comprehensive library of tutorials and enhance your skills.
                </p>
                <a href="/tutorials" className="btn btn-primary">
                  Browse Tutorials
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://images.pexels.com/photos/7662853/pexels-photo-7662853.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="card-img-top"
                alt="request"
              />
              <div className="card-body">
                <h5 className="card-title">Request</h5>
                <p className="card-text">
                  Can't find what you're looking for? Request a tutorial from our community.
                </p>
                <a href="/request" className="btn btn-primary">
                  Make a Request
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card">
              <img
                src="https://images.pexels.com/photos/2777898/pexels-photo-2777898.jpeg"
                className="card-img-top"
                alt="profile"
              />
              <div className="card-body">
                <h5 className="card-title">Profile</h5>
                <p className="card-text">
                  Manage your account, track your progress, and interact with other users.
                </p>
                <a href="/profile" className="btn btn-primary">
                  Go to Profile
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <div className="card">
              <img
                src="https://www.techsmith.com/blog/wp-content/uploads/2021/12/user-documentation.png"
                className="card-img-top"
                alt="How to Use"
              />
              <div className="card-body">
                <h5 className="card-title">How to Use the Application</h5>
                <p className="card-text">
                  Learn how to create, edit, and share tutorials using our platform.
                </p>
                <a href="/profile" className="btn btn-primary">
                  Guides
                </a>
              </div>
            </div>
          </div>
          </div>
          <div className="row mt-5">
          <div className="col">
            <div className="card">
              <img
                src="https://cityofgood.sg/wp-content/uploads/2020/11/Success-3-2048x816.jpg"
                className="card-img-top"
                alt="How to Use"
              />
              <div className="card-body">
                <h5 className="card-title">Learning Community</h5>
                <p className="card-text">
                Connect with LEARNHUB community of learners, and share you experience.
                </p>
                <a href="/profile" className="btn btn-primary">
                  Our Community
                </a>
              </div>
            </div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default MainPage;
