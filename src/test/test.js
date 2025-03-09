//React
formData.append('product', new Blob(
    [JSON.stringify(updateProductData)], { 
        type: "application/json" 
    })
)
formData.append('imageFile', imageFile)


//API
const { data } = await api.put(`/api/admin/products/${productId}/update`, formData)


//Spring boot
@PutMapping(value = "/{productId}/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
Product updateProduct(@RequestPart("product") String req,
                    @RequestPart("imageFile") MultipartFile imageFile) throws ProductException, IOException;

