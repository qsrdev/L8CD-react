import React, { useState, useEffect } from "react";

const CouponToast = () => {
  const [showToast, setShowToast] = useState(false);

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText("VILLA15").then(() => {
      setShowToast(true);
    });
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      <section>
        <div className="coupons-cta py-3">
          <h3 className="text-center fs-4 text-white rem-5">
            Usa il codice{" "}
            <button
              type="button"
              className="btn text-white text-decoration-underline p-0"
              onClick={handleCopyCoupon}
            >
              VILLA15
            </button>{" "}
            per avere il 15% di sconto sui prodotti
          </h3>
        </div>
      </section>

      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "#fea82f",
            color: "white",
            padding: ".5rem 1rem",
            borderRadius: "0.25rem",
            zIndex: 9999,
          }}
        >
          Codice VILLA15 copiato!
        </div>
      )}
    </>
  );
};

export default CouponToast;
