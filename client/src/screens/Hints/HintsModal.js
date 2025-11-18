import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./Hints.css";
import Stepper from "react-stepper-horizontal";

const RenderHint = ({ hint }) => {
  if (!hint) return null;

  return (
    <div className="my-3 mx-2 p-1">
      <h4>{hint.title}</h4>
      <p>{hint.description}</p>
    </div>
  );
};

const HintsModal = (props) => {
  const [activeStep, setActiveStep] = useState(0);

  // ------------------------------------------
  // SAFE HINT PARSING (Fixes your crash)
  // ------------------------------------------
  const rawHints = Array.isArray(props.hints) ? props.hints : [];

  const tempHints = rawHints
    .map((hint, i) => {
      if (typeof hint === "string" && hint.trim().length > 0) {
        return {
          title: "Hint " + (i + 1),
          description: hint,
        };
      }
      return null;
    })
    .filter(Boolean); // remove null

  const steps = tempHints.map((hint) => ({
    title: hint.title,
  }));

  // Prevent crash when no hints exist
  const safeActiveStep = Math.min(activeStep, tempHints.length - 1);

  return (
    <Modal
      {...props}
      size="lg"
      centered
      fullscreen="md-down"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <div
        style={{ backgroundColor: "#343a40" }}
        className="text-primary-white rounded"
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title id="contained-modal-title-vcenter">
            Hints
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {tempHints.length === 0 ? (
            <h4 className="text-center my-5">No hints available</h4>
          ) : (
            <>
              <div style={{ height: "35vh" }}>
                <Stepper
                  steps={steps}
                  activeStep={safeActiveStep}
                  activeColor="#17a2b8"
                  defaultColor="#eee"
                  completeColor="#bc6ff1"
                  activeTitleColor="#fff"
                  completeTitleColor="#eee"
                  defaultTitleColor="#bbb"
                  circleFontColor="#000"
                  completeBarColor="#bc6ff1"
                  circleFontSize={12}
                />

                <RenderHint hint={tempHints[safeActiveStep]} />
              </div>

              <div className="d-flex justify-content-between mx-2">
                {safeActiveStep > 0 && (
                  <Button
                    onClick={() => setActiveStep((prev) => prev - 1)}
                    variant="outline-primary-white fw-bold"
                  >
                    <i className="bi bi-arrow-left"></i>
                  </Button>
                )}

                {safeActiveStep < tempHints.length - 1 && (
                  <Button
                    onClick={() =>
                      setActiveStep((prev) => prev + 1)
                    }
                    variant="outline-primary-white"
                    className="ms-auto"
                  >
                    <i className="bi bi-arrow-right fw-bold"></i>
                  </Button>
                )}
              </div>
            </>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onHide} variant="outline-danger">
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default HintsModal;
