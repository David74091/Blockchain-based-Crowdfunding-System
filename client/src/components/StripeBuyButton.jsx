import React from "react";

const StripeBuyButton = () => {
  const redirectToCheckout = () => {
    const paymentUrl = "https://buy.stripe.com/test_6oE7v85kb8RK7G8dQS"; // 将此替换为您在Stripe创建的支付链接
    window.location.href = paymentUrl;
  };

  return (
    <button className="btn btn-accent" onClick={redirectToCheckout}>
      支付
    </button>
  );
};

export default StripeBuyButton;
