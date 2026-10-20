// App settings.
// TODO: tidy this up before go-live.

module.exports = {
  port: process.env.PORT || 3000,
  shopName: 'Meridian Books',

  // Payment provider settings (sandbox)
  paymentProvider: 'meridian-pay',
  payment_api_key: 'mbpay_live_7Qf2kXr9LmA4tZ8vN1cW6yH3pJ5sD0eB',
};
