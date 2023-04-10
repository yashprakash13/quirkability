import { getTimestampedName } from "../utils"
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
async function insertIntoProductTable(id, data) {
  // insert a new product into the `product` table
  const { error } = await supabase.from("product").insert({
    id: id,
    name: data.name,
    description: data.description,
    price: data.price,
    price_type: data.priceType,
    allow_copies: data.allow_copies,
    display_sales: data.display_sales,
    user_id: data.user_id,
  })
  if (error) {
    console.log("Error in inserting row into the product table: => ", error)
  } else {
    console.log("Awesome, the product was inserted!")
  }
}

export { insertIntoProductTable }

async function insertIntoProductImagesStorage(id, data) {
  // insert new product's images into the the user's folder inside the `product-images` storage bucket,
  // create the folder if there isn't one
  for (let i = 0; i < data.length; i++) {
    const image = data[i]
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
      console.log("Awesome, the image: ", image.name, " was inserted.")
    }
  }
}

export { insertIntoProductImagesStorage }

async function insertIntoProductArtifactStorage(id, data) {
  // insert new product's artifact into the user's folder inside the `product-artifact` storage bucket
  // create the folder if there isn't one
  const newFilename = getTimestampedName(data[0].name)
  const { data, error } = await supabase.storage
    .from("product-artifact")
    .upload(`${id}/${newFilename}`, data[0])
  if (error) {
    console.log(
      "Error in inserting product artifact: ",
      data[0].name,
      " into the product-artifact storage bucket: ",
      error
    )
  } else {
    console.log("Awesome, the artifact: ", data[0].name, " was inserted.")
  }
}

export { insertIntoProductArtifactStorage }
