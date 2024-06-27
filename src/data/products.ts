export async function getProducts() {
    // delay 1s
    await new Promise(resolve => setTimeout(resolve, 1000))

    return [
        { id: 101, name: 'Sofá Curvo', price: 4500 },
      ];
           
}

interface CreateProductRequest {
  name: string
  price: number
}

export async function createProduct(_: CreateProductRequest ) {
  // delay 1s
  await new Promise(resolve => setTimeout(resolve, 1000))

  return
}