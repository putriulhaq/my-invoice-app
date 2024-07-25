import { useEffect, useState } from "react";
import axios from "axios";
import Notification from "./notification";


const FormInvoice = () => {
  const [formData, setFormData] = useState({
    customer_name: '',
    seller_name: '',
    description: '',
    date: '',
    product: [{ product_id: '', jumlah: '' }]
  });
  const [isLoading, setIsLoading] = useState(false)
  const [showNotification, setShowNotification] = useState(false);
  const [productList, setproductList] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/product");
      const data = response.data;
      setproductList(data)
    } catch (error) {
      console.error('Error fetching the product:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post('http://127.0.0.1:3000/api/invoice', formData)
      setShowNotification(true)

    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData(data => ({
      ...data, 
      [name]: value
    }))
  }
  const handleProductChange = (index, field, value) => {
    const updatedProducts = formData.product.map((product, i) => {
      if (i === index) {
        return { ...product, [field]: value };
      }
      return product;
    });

    setFormData(prevData => ({
      ...prevData,
      product: updatedProducts
    }));
  }

  const addProduct = () => {
    setFormData(prevData => ({
      ...prevData,
      product: [...prevData.product, { product_id: '', jumlah: '' }]
    }));
  }

  const removeProduct = (index) => {
    setFormData(prevData => ({
      ...prevData,
      product: prevData.product.filter((_, i) => i !== index)
    }));
  }

  useEffect( () => {
     fetchProduct()
  })

  const inputClass = "bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500";
  const labelClass = "block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4";

    
    return <>
        <h1 className="text-2xl font-bold mb-4">New Invoice</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className={labelClass}>
              Customer Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input 
            className={inputClass} 
            id="customer_name"
            name="customer_name" 
            type="text" 
            value={formData.customer_name}
            onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className={labelClass}>
              Seller Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input className={inputClass} 
            id="seller_name"
            name="seller_name" 
            type="text" 
            value={formData.seller_name}
            onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className={labelClass}>
              Description
            </label>
          </div>
          <div className="md:w-2/3">
            <input className={inputClass} 
            id="description" 
            name="description" 
            type="text" 
            value={formData.description}
            onChange={handleInputChange}/>
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label className={labelClass}>
              Date
            </label>
          </div>
          <div className="md:w-2/3">
            <input  className={inputClass} 
              id="date" 
              name="date" 
              type="date"
              value={formData.date}
              onChange={handleInputChange}/>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Products</h2>
          {formData.product.map((product, index) => (
            <div key={index} className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <select
                  className={inputClass}
                  value={product.product_id}
                  onChange={(e) => handleProductChange(index, 'product_id', e.target.value)}
                >
                  <option value="">Select a product</option>
                  {productList.map((p, idx) => (
                    <option key={idx} value={p.product_id}>
                      {p.nama}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <input
                  className={inputClass}
                  type="number"
                  placeholder="Jumlah"
                  value={product.jumlah}
                  onChange={(e) => handleProductChange(index, 'jumlah', e.target.value)}
                />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addProduct}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            Add Product
          </button>
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
          <button 
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>


      </form>

      {showNotification && (
        <Notification
          message="Invoice successfully created!"
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
}


export default FormInvoice