import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./CartCoupon.scss";
import { useState } from "react";
import { verifyCoupon } from "utils/axiosService";
import { toast } from "react-toastify";

const CartCoupon = ({ coupon, applyCoupon }) => {
  const [code, setCode] = useState("");
  const [codeAccepted, setCodeAccepted] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await verifyCoupon(code);
      applyCoupon(response.data);
      setCodeAccepted(true);
    } catch (error) {
      setCodeAccepted(false);
      toast.error("This is not the code you're looking for");
    }
  };
  return (
    <Container className="cart-coupon pt-3">
      <Row as={Form} onSubmit={handleSubmit}>
        <Col as={Form.Group} xs={12} md={6}>
          {!codeAccepted ? (
            <Form.Control
              type="text"
              name="code"
              value={code}
              placeholder="Discount Code"
              isInvalid={codeAccepted === false}
              onChange={(e) => setCode(e.target.value)}
            />
          ) : (
            <span>
              {coupon.code}({coupon.discount * 100}% OFF)
            </span>
          )}
        </Col>
        <Col
          as={Form.Group}
          xs={12}
          md={6}
          className="d-flex flex-column-reverse"
        >
          <Button type="submit" variant="info" disabled={codeAccepted}>
            Apply
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CartCoupon;
