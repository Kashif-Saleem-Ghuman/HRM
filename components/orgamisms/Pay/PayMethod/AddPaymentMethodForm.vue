<template>
    <div class="add-payment-method-form">
      <div class="pb-2">
        <bib-input
          type="text"
          name="paymentMethodName"
          placeholder="Type your name"
          label="Payment method name"
          required
        />
      </div>
  
      <div class="pb-2">
        <div class="mb-2 pb-1 bottom_border_wrapper">
          <div class="section-label">Card information</div>
        </div>
        <bib-input
          type="text"
          name="cardNumber"
          placeholder="Type your name"
          label="Card number"
          required
        />
      </div>
  
      <div class="pb-2">
        <bib-input
          type="text"
          name="cardholderName"
          placeholder="Type your name"
          label="Cardholder name"
          required
        />
      </div>
  
      <div class="pb-2 d-flex justify-between">
        <bib-input
          type="text"
          name="expiryDate"
          placeholder="MM/YY"
          label="Expiry date"
          class="pr-1"
          required
        />
        <bib-input
          type="password"
          name="cvv"
          placeholder="***"
          label="CVV/CVC"
          required
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "AddPaymentMethodForm",
  };
  </script>
  