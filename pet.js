'use strict'

const baseUrl = 'http://localhost:3030/v1/controle-pet/pet'

// GET todos os pets
export async function getPets() {
    const response = await fetch(baseUrl)
    const data = await response.json()
    return data
}

// POST novo pet
export async function postPet(pet) {
    const options = {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pet)
    }

    const response = await fetch(baseUrl, options)
    return response
}

export async function uploadImageToAzure(uploadParams) {

    const { file, storageAccount, sasToken, containerName } = uploadParams;

    const blobName = `${Date.now()}-${file.name}`;

    const baseUrl = `https://${storageAccount}.blob.core.windows.net/${containerName}/${blobName}`;
    const uploadUrl = `${baseUrl}?${sasToken}`;

    const options = {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    }

    const response = await fetch(uploadUrl, options)

    if (response.ok) {
      return baseUrl;
    }else {
      return response.ok
    }
   
}

