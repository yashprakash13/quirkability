import { compressImage, getTimestampedName } from "../utils"
import { supabase } from "./supabase"

async function checkUsernameAvailability(username) {
  // check if `username` is present in the `userprofile` table.
  let { data, error } = await supabase
    .from("userprofile")
    .select("username")
    .eq("username", username)
  if (data) {
    if (data.length > 0) {
      return true
    } else {
      return false
    }
  } else {
    console.log(error)
  }
}

export { checkUsernameAvailability }

async function insertIntoUserprofileTable(id, email, username) {
  // insert new row into the `userprofile` table and update user with the `username` attribute
  const { error } = await supabase
    .from("userprofile")
    .insert({ id: id, email: email, username: username })
  if (error) {
    console.log("Error in inserting row into userprofile table: => ", error)
  } else {
    console.log("Inserted user row into userprofile table.")
    // inserted user into userprofile table
    // now update user with username attribute
    const { data, error } = await supabase.auth.updateUser({
      data: { username: username },
    })
    if (error) {
      console.log("Couldn't update user with username.")
    } else {
      console.log("The user now looks like =>", data)
    }
  }
}

export { insertIntoUserprofileTable }

/* 

Functions for making a new product 

*/
async function insertIntoProductTable(id, product, productArtifactURL) {
  // insert a new product into the `product` table
  const { data, error } = await supabase
    .from("product")
    .insert({
      name: product.name,
      description: product.description,
      price: product.price,
      price_type: product.priceType,
      allow_copies: product.allowCopies,
      display_sales: product.displaySales,
      user_id: id,
    })
    .select()
  if (error) {
    console.log("Error in inserting row into the product table: => ", error)
    return null
  } else {
    console.log("Awesome, the product was inserted! => ", data)
    // Insert the product into the `product_url` table for future image + artifact uploads
    const { error2 } = await supabase.from("product_urls").insert({
      redirect_url: productArtifactURL,
      product_id: data[0].id,
    })
    if (error2) {
      console.log(
        "Error in inserting row into the product_url table: => ",
        error
      )
    } else {
      console.log("Awesome, the product url row was inserted!")
    }
    console.log("Returning id: ", data[0].id)
    return data[0].id
  }
}

export { insertIntoProductTable }

async function insertIntoProductImagesStorage(id, images, product_id) {
  // insert new product's images into the the user's folder inside the `product-images` storage bucket,
  // create the folder if there isn't one
  let image_paths = []
  for (let i = 0; i < images.length; i++) {
    const image = await compressImage(images[i])
    const newFilename = getTimestampedName(image.name)
    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(`${id}/${newFilename}`, image)
    if (error) {
      console.log(
        "Error in inserting product image: ",
        image.name,
        " into the product-images storage bucket: ",
        error
      )
    } else {
      console.log("Awesome, the image: ", image.name, " was inserted => ", data)
      image_paths.push(data.path)
    }
  }
  // insert image paths(s) into the specific product id row into the `product_urls` table
  const { error } = await supabase
    .from("product_urls")
    .update({ images: image_paths })
    .eq("product_id", product_id)
  if (error) {
    console.log("Error in updating row with images: ", error)
  } else {
    console.log("Great! Product url row was updated with images. ")
  }
}

export { insertIntoProductImagesStorage }

async function insertIntoProductArtifactStorage(id, product, product_id) {
  // insert new product's artifact into the user's folder inside the `product-artifact` storage bucket
  // create the folder if there isn't one
  const newFilename = getTimestampedName(product[0].name)
  const { data, error } = await supabase.storage
    .from("product-artifact")
    .upload(`${id}/${newFilename}`, product[0])
  if (error) {
    console.log(
      "Error in inserting product artifact: ",
      product[0].name,
      " into the product-artifact storage bucket: ",
      error
    )
  } else {
    console.log(
      "Awesome, the artifact: ",
      product[0].name,
      " was inserted => ",
      data
    )
    // insert the artifact into the specific product id row into the `product_urls` table
    const { error } = await supabase
      .from("product_urls")
      .update({ product_artifact_path: data.path })
      .eq("product_id", product_id)
    if (error) {
      console.log("Error in updating row with artifact: ", error)
    } else {
      console.log("Great! Product url row was updated with the artifact path. ")
    }
  }
}

export { insertIntoProductArtifactStorage }

/* 

Functions for getting a list of products

*/

async function getAllProducts(id, return_urls = true) {
  // function to get all products for userid `id` from `products` table and product url row from the `product_urls` table
  let { data: products, error } = await supabase
    .from("product")
    .select("*")
    .eq("user_id", id)

  if (return_urls && products) {
    let product_url_dict = {}
    for (let i = 0; i < products.length; i++) {
      const product = products[i]
      let { data: product_url, error2 } = await supabase
        .from("product_urls")
        .select("*")
        .eq("product_id", product.id)

      if (product_url) {
        product_url_dict[product.id] = product_url
      } else {
        console.log(
          "Error in fetching product url row for product id => ",
          product.id,
          " with error=> ",
          error2
        )
      }
    }
    return { products, product_url_dict }
  } else if (!return_urls && products) {
    return { products }
  } else {
    console.log("Error in fetching products=> ", error)
  }
}

export { getAllProducts }

/*
payment things
*/

async function getStripeId(id) {
  // function to get stripe account id from `userprofile` table
  let { data: stripe_id, error } = await supabase
    .from("userprofile")
    .select("stripe_connect_id")
    .eq("id", id)

  if (error) {
    console.log("Error fetching stripe id.")
    return null
  } else {
    console.log("Fetched the stripe connect id again.")
    const stripe_connect_id = stripe_id[0].stripe_connect_id
    return stripe_connect_id
  }
}
export { getStripeId }
