async function createStripeConnectAccount(id, email) {
  // function to ask backend to start stripe's connect account creation process
  const response = await fetch("http://localhost:8000/create-account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      db_id: id,
    }),
  })
  if (!response.ok) {
    console.log("Error occured in stripe account creation. ")
  }
  const data = await response.json()
  console.log("Got data from stripe account creation =", data.link_url)
  return [data.account_id, data.link_url]
}
export { createStripeConnectAccount }

async function createStripeProduct(id, name, price, price_currency, account) {
  // function to ask backend to create stripe product for connected account
  console.log("createStripeProduct func: --")

  const response = await fetch("http://localhost:8000/create-product", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      name: name,
      price: parseFloat(price),
      price_currency: price_currency,
      account: account,
    }),
  })
  if (!response.ok) {
    console.log("Error occured in stripe product creation. ")
  }
  const data = await response.json()
  console.log("Got data from stripe product creation =", data)
}
export { createStripeProduct }

async function makePayment(
  product_id,
  stripe_price_id,
  account_id,
  customer_email,
  price,
  quantity
) {
  const response = await fetch("http://localhost:8000/make-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product_id: product_id,
      stripe_price_id: stripe_price_id,
      customer_email: customer_email,
      account_id: account_id,
      price: price,
      quantity: quantity,
    }),
  })
  if (!response.ok) {
    console.log(
      "Error occured in making payment for:  ",
      product_id,
      account_id
    )
  }
  const data = await response.json()
  console.log("Got from payment call= ", data)
  return data.url
}
export { makePayment }
