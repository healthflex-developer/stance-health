"use client";
import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CouponForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
  });
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("initial"); // 'initial', 'otpSent', 'otpVerified', 'submitted'
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState({
    sendOTP: false,
    resendOTP: false,
    verifyOTP: false,
    submitForm: false,
  });
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
  };

  const handleSendOTP = async () => {
    setLoading((prev) => ({ ...prev, sendOTP: true }));
    try {
      const response = await axios.post("/api/send-otp", {
        mobile: formData.mobile,
      });
      if (response.status === 200) {
        setStatus("otpSent");
        showMessage("OTP sent successfully.", "success");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error sending OTP",
        "error"
      );
    }
    setLoading((prev) => ({ ...prev, sendOTP: false }));
  };

  const handleReSendOTP = async () => {
    setLoading((prev) => ({ ...prev, resendOTP: true }));
    try {
      const response = await axios.post("/api/retry-otp", {
        mobile: formData.mobile,
      });
      if (response.status === 200) {
        setStatus("otpSent");
        showMessage("OTP resent successfully", "success");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error resending OTP",
        "error"
      );
    }
    setLoading((prev) => ({ ...prev, resendOTP: false }));
  };

  const handleVerifyOTP = async () => {
    setLoading((prev) => ({ ...prev, verifyOTP: true }));
    try {
      const response = await axios.post("/api/verify-otp", {
        mobile: formData.mobile,
        otp,
      });
      if (response.data.type !== "error") {
        setStatus("otpVerified");
        showMessage("OTP verified successfully.", "success");
      } else {
        showMessage("Invalid OTP. Please try again.", "error");
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error verifying OTP",
        "error"
      );
    }
    setLoading((prev) => ({ ...prev, verifyOTP: false }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading((prev) => ({ ...prev, submitForm: true }));
    try {
      const response = await axios.post("/api/submit-coupon-form", formData);
      if (response.status === 200) {
        setStatus("submitted");
        showMessage("", "success");
        handleCouponModalOpen();
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error submitting form",
        "error"
      );
    }
    setLoading((prev) => ({ ...prev, submitForm: false }));
  };

  const handleCouponModalClose = () => {
    setShowCouponModal(false);
  };

  const handleCouponModalOpen = () => {
    setShowCouponModal(true);
  };

  return (
    <>
      {isClient && (
        <>
          <Modal
            show={showCouponModal}
            onHide={handleCouponModalClose}
            centered
            className="coupon-data-modal"
          >
            <Modal.Header closeButton />
            <Modal.Body className="coupon-data-modal-body">
              <p className="dark">
                Claimed! Use this coupon for your discount.
              </p>
              <h4 className="dark">
                {formData.name.slice(0, 2).toUpperCase()}SH10
              </h4>
              <Button
                onClick={() =>
                  navigator.clipboard.writeText(
                    formData.name.slice(0, 2).toUpperCase() + "SH10"
                  )
                }
                className="coupon-copy-button"
              >
                <ContentCopyIcon
                  fontSize="small"
                  style={{ marginRight: "0.8rem" }}
                />
                Copy
              </Button>
            </Modal.Body>
          </Modal>

          {status !== "submitted" ? (
            <Modal show centered className="coupon-modal-main">
              {renderForm()}
            </Modal>
          ) : (
            <div className="coupon-modal">{renderForm()}</div>
          )}
        </>
      )}
      ]
    </>
  );

  function renderForm() {
    return (
      <div className="coupon-modal-content modal-content">
        <div className="modal-body">
          <h3 className="coupon-modal-heading">Avail your Discount</h3>
          <p className="coupon-modal-sub">
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
                disabled={status === "submitted"}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={status === "submitted"}
              />
            </Form.Group>
            <Form.Group className="mb-3 d-flex align-items-center">
              <Form.Control
                type="number"
                placeholder="+91"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                disabled={status === "otpVerified" || status === "submitted"}
                style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              />
              <Button
                variant="primary"
                onClick={handleSendOTP}
                disabled={status !== "initial" || loading.sendOTP}
                style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                {loading.sendOTP ? (
                  <Spinner as="span" animation="border" size="sm" />
                ) : (
                  "Send OTP"
                )}
              </Button>
            </Form.Group>
            {status !== "initial" && status !== "submitted" && (
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={status === "otpVerified" || status === "submitted"}
                />
              </Form.Group>
            )}
            {status === "otpSent" && (
              <Button
                variant="success"
                onClick={handleVerifyOTP}
                disabled={loading.verifyOTP}
              >
                {loading.verifyOTP ? (
                  <Spinner as="span" animation="border" size="sm" />
                ) : (
                  "Verify OTP"
                )}
              </Button>
            )}
            {message.text && (
              <p
                style={{
                  fontSize: "0.9rem",
                  marginTop: "0.8rem",
                  color: message.type === "success" ? "green" : "red",
                }}
              >
                {message.text}
              </p>
            )}
            {status === "otpSent" && (
              <Button
                variant="link"
                onClick={handleReSendOTP}
                disabled={loading.resendOTP}
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                {loading.resendOTP ? (
                  <Spinner as="span" animation="border" size="sm" />
                ) : (
                  "Resend OTP"
                )}
              </Button>
            )}
            {status === "otpVerified" && (
              <Button
                variant="success"
                type="submit"
                disabled={loading.submitForm}
              >
                {loading.submitForm ? (
                  <Spinner as="span" animation="border" size="sm" />
                ) : (
                  "Submit Form"
                )}
              </Button>
            )}
          </Form>
        </div>
      </div>
    );
  }
};

export default CouponForm;
