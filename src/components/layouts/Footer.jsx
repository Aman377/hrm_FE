import { Col, Layout, Row } from "antd";

function Footer() {
  const { Footer: AntFooter } = Layout;
  const year = new Date().getFullYear();

  return (
    <AntFooter className='w-full max-w-[640px] mx-auto'>
      <Row className="flex flex-col items-center lg:flex lg:flex-row lg:justify-between">
        <Col xs={24} md={24} lg={12} className="flex items-center">
          <p className="m-0">
            {year}{" "}
            <a
              // href="https://solution.omega.ac"
              className="font-weight-bold"
              target="_blank"
              rel="noreferrer"
            >
              Excite Solution
            </a>{" "}
            One stop solution.
          </p>
        </Col>
        {/* <Col xs={24} md={24} lg={12}>
          <div className="flex justify-end md:justify-center mt-[10px] lg:mt-0">
            <ul className="flex m-0 p-0 gap-4">
              <li className="nav-item">
                <a
                  href="https://omega.ac"
                  className="nav-link text-muted"
                  target="/"
                >
                  Omega
                </a>
              </li>
              <li className="nav-item">
                <a href="/admin" className="nav-link text-muted" target="/">
                  About Us
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/admin"
                  className="nav-link text-muted"
                  target="_blank"
                >
                  Blog
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/admin"
                  className="nav-link pe-0 text-muted"
                  target="_blank"
                >
                  License
                </a>
              </li>
            </ul>
          </div>
        </Col> */}
      </Row>
    </AntFooter>
  );
}

export default Footer;
