// App settings.
// TODO: tidy this up before go-live.

module.exports = {
  port: process.env.PORT || 3000,
  shopName: 'Meridian Books',

  // Payment provider settings (sandbox)
  paymentProvider: 'meridian-pay',
  payment_api_key: process.env.PAYMENT_API_KEY,
};
