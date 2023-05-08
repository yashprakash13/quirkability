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

async function getAllProducts(id, return_urls = true, columns = "*") {
  // function to get all products for userid `id` from `products` table and product url row from the `product_urls` table
  let { data: products, error } = await supabase
    .from("product")
    .select(columns)
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

async function populatePublicProducts(username, columns = "*") {
  // function to return all products from a given username in the public page
  // 1. get user's id from `userprofile` table
  let { data: userId, error1 } = await supabase
    .from("userprofile")
    .select("id")
    .eq("username", username)
    .single()
  if (userId) {
    // 2. gotten the id for the username, now select products for that user_id
    let { data: products, error2 } = await supabase
      .from("product")
      .select(columns)
      .eq("user_id", userId.id)
    if (products) {
      // 3. for each product, get image from `product_urls` table and then form the URL to return in order to display from storage
      const product_ids_array = products.map((product) => product.id)
      let { data: product_images, error3 } = await supabase
        .from("product_urls")
        .select("product_id, images")
        .in("product_id", product_ids_array)
      if (error3) {
        console.log(
          "Error getting image urls from product_urls table => ",
          error3
        )
      } else {
        console.log("Product image urls gotten => ", product_images)
        const mergedArray = products.map((product) => {
          const matchingImage = product_images.find(
            (image) => image.product_id === product.id
          )
          return { ...product, ...matchingImage }
        })
        console.log("MergedArray=> ", mergedArray)
        return { products: mergedArray }
      }
    } else {
      console.log("Error in fetching products => ", error2)
    }
  } else {
    console.log("Error in fetching user id from username => ", error1)
  }
}
export { populatePublicProducts }

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

/*
Get specific product details
*/
async function getProductDetailsFromId(productId) {
  // function to get product details for productId for public product page
  let { data: product, error1 } = await supabase
    .from("product")
    .select("*")
    .eq("id", productId)
    .single()
  if (error1) {
    console.log(
      "Error getting product details for productId => ",
      productId,
      ", error=> ",
      error1
    )
  } else {
    let { data: product_url, error2 } = await supabase
      .from("product_urls")
      .select("redirect_url, images, product_artifact_path")
      .eq("product_id", product.id)
      .single()
    if (error2) {
      console.log(
        "Error getting product urls from product_urls table for product id=> ",
        product.id,
        " error=> ",
        error2
      )
    } else {
      let { data: sales, error3 } = await supabase
        .from("sale")
        .select("id, rating")
        .eq("product_id", product.id)
      if (error3) {
        console.log(
          "Error getting sale details for product: ",
          product.id,
          " =>",
          error3
        )
      } else {
        let sale_info = {}
        console.log("Sales=> ", sales)
        if (sales.length > 0) {
          sale_info["num_sales"] = sales.length
          const filteredList = sales.filter((item) => item.rating !== null)
          const average_rating =
            filteredList.reduce((total, item) => total + item.rating, 0) /
            filteredList.length
          sale_info["avg_rating"] = average_rating.toFixed(1)
          sale_info["num_ratings"] = filteredList.length
          console.log("Sale info=> ", sale_info)
        }
        const merged_product_details = {
          ...product,
          ...product_url,
          ...sale_info,
        }
        // console.log("Merged product details=> ", merged_product_details)
        return merged_product_details
      }
    }
  }
}
export { getProductDetailsFromId }

/*
Get user details
*/

async function getUserDetailsFromId(userid, columns = "*") {
  // function to give back user's details from given userid as required in `columns`
  let { data: user_info, error } = await supabase
    .from("userprofile")
    .select(columns)
    .eq("id", userid)
    .single()
  if (error) {
    console.log(
      "Error in fetching user details for id => ",
      userid,
      " => error => ",
      error
    )
  } else {
    return user_info
  }
}
export { getUserDetailsFromId }

async function getUserIdFromUsername(username) {
  // function to return userId from a given username
  let { data: userId, error } = await supabase
    .from("userprofile")
    .select("id")
    .eq("username", username)
    .single()
  if (error) {
    console.log(
      "Error fetching username id for=> ",
      username,
      " => error => ",
      error
    )
  } else {
    return userId
  }
}
export { getUserIdFromUsername }
