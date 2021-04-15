import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import CanvasJSReact from '../lib/canvasjs.react';
// var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Home() {
  console.log('in home');
  const water_collected_options = {
    title: {
      text: "Water Collected in 2020"
    },
    data: [{
      type: "column",
      color: 'blue',
      dataPoints: [
        { label: "January",  y: 10  },
        { label: "February", y: 15  },
        { label: "March", y: 25  },
        { label: "April",  y: 30  },
        { label: "May",  y: 28  },
        { label: "June",  y: 28  },
        { label: "July",  y: 28  },
        { label: "August",  y: 28  },
        { label: "September",  y: 28  },
        { label: "October",  y: 28  },
        { label: "November",  y: 28  },
        { label: "December",  y: 28  },
      ]
    }],
  }

  const money_saved_options = {
    title: {
      text: "Money Saved in 2020"
    },
    data: [{
      type: "column",
      color: 'blue',
      dataPoints: [
        { label: "January",  y: 10  },
        { label: "February", y: 15  },
        { label: "March", y: 25  },
        { label: "April",  y: 30  },
        { label: "May",  y: 28  },
        { label: "June",  y: 28  },
        { label: "July",  y: 28  },
        { label: "August",  y: 28  },
        { label: "September",  y: 28  },
        { label: "October",  y: 28  },
        { label: "November",  y: 28  },
        { label: "December",  y: 28  },
      ]
    }],
  }

  const water_saved_prediction_options = {
    title: {
      text: "Water Predicted to be Saved in 2021"
    },
    data: [{
      type: "column",
      color: 'blue',
      dataPoints: [
        { label: "January",  y: 10  },
        { label: "February", y: 15  },
        { label: "March", y: 25  },
        { label: "April",  y: 30  },
        { label: "May",  y: 28  },
        { label: "June",  y: 28  },
        { label: "July",  y: 28  },
        { label: "August",  y: 28  },
        { label: "September",  y: 28  },
        { label: "October",  y: 28  },
        { label: "November",  y: 28  },
        { label: "December",  y: 28  },
      ]
    }],
  }
  return (
    <div>
      <Container className='home'>

          <Row className='title'>
              <Col>
                Caldwell Rainwater Reclamation Project
              </Col>
          </Row>
          {/*
          <Row className='current-month mt-4'>
              <Col>
                  <div className='current-month-label font-weight-bold'>Water Collected This Month</div>
                  <div className='current-month-number'>18 Gallons</div>
              </Col>
              <Col>
                <CanvasJSChart options={money_saved_options} />
              </Col>
          </Row>
          <Row className='month-chart mt-4 pb-4'>
              <Col>
                  <CanvasJSChart options={water_collected_options} />
              </Col>
              <Col>
                  <CanvasJSChart options={water_saved_prediction_options} />
              </Col>
          </Row>
          */}
          <Row>
            <Col>
              <Carousel interval={5000} fade>
                <Carousel.Item className="current-month">
                  <div className='current-month-label font-weight-bold'>Water Collected This Month</div>
                  <div className='current-month-number'>18 Gallons</div>
                </Carousel.Item>
                <Carousel.Item>

                  <div>
                    <CanvasJSChart options={money_saved_options} />
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div>
                    <CanvasJSChart options={water_collected_options} />
                  </div>
                </Carousel.Item>
                <Carousel.Item>
                  <div>
                    <CanvasJSChart options={water_saved_prediction_options} />
                  </div>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
      </Container>
    </div>
  );
}

export default Home;
