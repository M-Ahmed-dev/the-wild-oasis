import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be delete an error occured!");
  }

  return data;
}

export async function insertCabin(newCabin) {
  const imageName = `${Math.floor(Math.random())}-${
    newCabin.image.name
  }`.replaceAll("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // 1. create cabin first
  //https://snwicyaziwpzzxklswyn.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.log(error);
    throw new Error("Error occured in inserting Data");
  }

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // delete cabin if there was storage error

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(error);
    throw new Error("Error occured in uploading Image");
  }
  // 2. upload image after cabin is created successfully

  return data;
}
