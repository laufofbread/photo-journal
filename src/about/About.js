import React from 'react';

class About extends React.Component {
  constructor() { super(); }

  render () {
    return (
      <main className="body-wrapper">
        <section className="text-block">
          <p>
            Hello I&#39;m <a href="//lauramccartney.co.uk">Laura McCartney</a>.
          </p>
          <p>
            This is my time capsule to a period of 13 months travelling the world.
            I took over 4000 photographs; selecting, editing and uploading as I went along.
          </p>
          <p>
            All of my photographs were taken with an Olympus OM-D EM10 Mark II with a M.Zuiko Digital 25mm f/1.8 lens. All editing was done using the VSCO app for iPhone.
          </p>
        </section>
      </main>
    )
  }
}

export default About;
