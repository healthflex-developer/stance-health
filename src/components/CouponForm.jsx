"use-client";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

const CouponForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("initial"); // 'initial', 'otpSent', 'otpVerified'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendOTP = async () => {
    try {
      const response = await axios.post("/api/send-otp", {
        mobile: formData.mobile,
      });
      alert("OTP send succesfully");
      if (response.status === 200) {
        setStatus("otpSent");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Error sending OTP");
    }
  };

  const handleReSendOTP = async () => {
    try {
      const response = await axios.post("/api/retry-otp", {
        mobile: formData.mobile,
      });
      alert(response.data.message);
      if (response.status === 200) {
        setStatus("otpSent");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Error resending OTP");
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post("/api/verify-otp", {
        mobile: formData.mobile,
        otp: otp,
      });
      alert(response.data.message);
      if (response.data.type !== "error") {
        setStatus("otpVerified");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Error verifying OTP");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/submit-coupon-form", formData);
      alert("Form submitted succesfully");
      if (response.status === 200) {
        setStatus("submitted");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Error submitting form");
    }
  };

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h3 className="dark">Avail your Discount</h3>
            <p className="dark" style={{ textAlign: "center" }}>
              Kindly fill in your details to claim your exclusive Stance Coupon
              Code
            </p>
            <Form className="form-styles" onSubmit={handleFormSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="mobile no."
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </Form.Group>
              {status !== "initial" && (
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </Form.Group>
              )}
              {status === "initial" && (
                <Button variant="primary" onClick={handleSendOTP}>
                  Send OTP
                </Button>
              )}
              {status === "otpSent" && (
                <div>
                  <Button variant="success" onClick={handleVerifyOTP}>
                    Verify OTP
                  </Button>
                  <Button
                    variant="link"
                    onClick={handleReSendOTP}
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    Resend OTP
                  </Button>
                </div>
              )}
              {status === "otpVerified" && (
                <Button variant="info" type="submit" style={{ color: "white" }}>
                  Submit Form
                </Button>
              )}
              {status === "submitted" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <h4>{formData.name.slice(0, 2).toUpperCase()}SH10</h4>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        formData.name.slice(0, 2).toUpperCase() + "SH10"
                      );
                      alert("Copied to clipboard!");
                    }}
                    style={{ width: "8rem" }}
                  >
                    <img src="" />
                  </Button>
                </div>
              )}
              {status === "submitted" && (
                <Button variant="info" style={{ color: "white" }}>
                  Submitted
                </Button>
              )}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouponForm;
