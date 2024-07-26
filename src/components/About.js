import React from "react";

export default function About() {

  return (
    <div className='container' >
        <h1 style={{ margin: '35px 0px', marginTop:'90px' }}>About Us</h1>
      <div className="accordion" id="accordionExample" >
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
              
            >
              Get Daily News Updates
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" >
              <strong>Stay Informed with Our Free News App </strong>
              Get the latest headlines at your fingertips with our user-friendly news app. We bring you up-to-the-minute coverage from reliable sources across the globe.
              <code> Never miss a story! </code>
              Our app ensures you're always in the know, whether you're commuting, relaxing at home, or on the go. With a clean design and intuitive navigation, staying informed has never been easier.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
              
            >
              Free To Use
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" >
              <strong>Enjoy all features at no cost.</strong> This NewsBUS - Stop is completely free to use. You can access all functionalities without any hidden charges or subscriptions. <code>.It will be free Forever</code>,
              spend your money on important stuff.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
              
            >
              Browser Compatible
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body" >
              <strong>Works seamlessly across all browsers.</strong> This tool is designed to be compatible with all major web browsers, ensuring a smooth experience whether you're using Chrome, Firefox, Safari, or Edge.<code>.But there might be some problem in mobile version</code>,
              but all the glitches will be fix soon.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
