import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import CanvasJSReact from '../lib/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Home() {
  const options = {
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
  return (
    <Container className='home'>
        <Row>
            <Col>
                Home
                <div>Water Collected This Month</div>
                <div>18 Gallons</div>
            </Col>
        </Row>
        <Row>
            <Col>
                <CanvasJSChart options={options} />
            </Col>
        </Row>
    </Container>
  );
}

export default Home;
