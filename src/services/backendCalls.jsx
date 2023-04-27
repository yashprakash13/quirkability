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
  console.log(typeof id)
  console.log(typeof name)
  console.log(typeof price)
  console.log(typeof price_currency)
  console.log(account, typeof account)

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
