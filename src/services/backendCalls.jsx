let BASE_BACKEND_URL = ""
if (import.meta.env.VITE_APP_MODE === "prod") {
  BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL_PROD
} else {
  BASE_BACKEND_URL = import.meta.env.VITE_BASE_BACKEND_URL
}

async function perform_server_health_check() {
  try {
    const response = await fetch(`${BASE_BACKEND_URL}/health`)
    const result = await response.json()
    console.log("Health check=> ", result)
    if (result.status) {
      console.log("Health check success.")
      return true
    }
  } catch (error) {
    return false
  }
}
export { perform_server_health_check }

async function createStripeConnectAccount(id, email) {
  // function to ask backend to start stripe's connect account creation process
  const response = await fetch(`${BASE_BACKEND_URL}/create-account`, {
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

  const response = await fetch(`${BASE_BACKEND_URL}/create-product`, {
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

async function editStripePrice(
  id,
  price,
  price_currency,
  connected_account_id,
  product_id,
  price_id
) {
  const response = await fetch(`${BASE_BACKEND_URL}/update-price`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      price: parseFloat(price),
      price_currency: price_currency,
      account: connected_account_id,
      stripe_price_id: price_id,
      stripe_product_id: product_id,
    }),
  })
  const result = await response.json()
  if (result.status) {
    console.log("Stripe price modified.")
    return true
  } else {
    console.log("Error occured in modifying price.")
    return false
  }
}
export { editStripePrice }

async function makePayment(
  product_id,
  stripe_price_id,
  account_id,
  customer_email,
  price,
  quantity
) {
  const response = await fetch(`${BASE_BACKEND_URL}/make-payment`, {
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

async function getSession(session_id) {
  const response = await fetch(`${BASE_BACKEND_URL}/get-session/${session_id}`)
  const result = await response.json()
  console.log(result)
  if (result.success) {
    console.log("Payment done.")
    return true
  } else {
    console.log("Still pending...")
    return false
  }
}
export { getSession }

async function archiveStripeProduct(stripe_product_id, account_id) {
  // function to call backend's archive endpoint
  const response = await fetch(`${BASE_BACKEND_URL}/archive-stripeproduct`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      stripe_product_id: stripe_product_id,
      account_id: account_id,
    }),
  })
  const result = await response.json()
  if (result.status === "success") {
    return true
  } else {
    console.log("Error occured in archiving stripe product.")
    return false
  }
}
export { archiveStripeProduct }
