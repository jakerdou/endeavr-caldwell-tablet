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
        { label: "January",  y: 1005  },
        { label: "February", y: 1543  },
        { label: "March", y: 874  },
        { label: "April",  y: 1654  },
        { label: "May",  y: 2100  },
        { label: "June",  y: 999  },
        { label: "July",  y: 1323  },
        { label: "August",  y: 1265  },
        { label: "September",  y: 1785  },
        { label: "October",  y: 852  },
        { label: "November",  y: 1987  },
        { label: "December",  y: 2203  },
      ]
    }],
  }

  const money_saved_options = {
    title: {
      text: "Money Saved in 2020"
    },
    data: [{
      type: "column",
      color: 'green',
      dataPoints: [
        { label: "January",  y: 10  },
        { label: "February", y: 15  },
        { label: "March", y: 21  },
        { label: "April",  y: 22  },
        { label: "May",  y: 12  },
        { label: "June",  y: 17  },
        { label: "July",  y: 11  },
        { label: "August",  y: 18  },
        { label: "September",  y: 20  },
        { label: "October",  y: 21  },
        { label: "November",  y: 10  },
        { label: "December",  y: 21  },
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
        { label: "January",  y: 1205  },
        { label: "February", y: 1343  },
        { label: "March", y: 1074  },
        { label: "April",  y: 1454  },
        { label: "May",  y: 2300  },
        { label: "June",  y: 799  },
        { label: "July",  y: 1523  },
        { label: "August",  y: 1065  },
        { label: "September",  y: 1585  },
        { label: "October",  y: 652  },
        { label: "November",  y: 2187  },
        { label: "December",  y: 2003  },
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
                <Carousel.Item className="text-carousel">
                  <div className='current-month-label font-weight-bold'>Water Collected This Month</div>
                  <div className='current-month-number'>1,800 Gallons</div>
                </Carousel.Item>
                <Carousel.Item className="text-carousel">
                  <div className='current-month-label font-weight-bold'>Money Saved This Month</div>
                  <div className='dollar-num'>$17</div>
                </Carousel.Item>
                <Carousel.Item className="text-carousel">
                  <div className='current-month-label font-weight-bold'>Total Water Saved</div>
                  <div className='current-month-number'>460,235 Gallons</div>
                </Carousel.Item>
                <Carousel.Item className="text-carousel">
                  <div className='current-month-label font-weight-bold'>Total Money Saved</div>
                  <div className='dollar-num'>$2,540</div>
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
