import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Components/Navbar";
import CategoryProductList from "../Components/CategoryProductList";
import { useNavigate, useParams } from "react-router-dom";

function CategoryProducts() {
	const [products, setProducts] = useState([]);
	const { category } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		const getProductData = async () => {
			try {
				const response = await axios.get(
					`https://fakestoreapi.com/products/category/${category}`
				);
				console.log(response.data);
				setProducts(response.data);
			} catch (error) {
				console.error("Error fetching data: ", error);
				toast.error("Failed to fetch product data");
			}
		};

		getProductData();
	}, [category]);
	useEffect(() => {
		if (localStorage.getItem("login") !== "true") {
			navigate("/");
			// navigate(`/user/${localStorage.getItem("login_user")}`);
		}
	}, []);
	return (
		<>
			<Navbar />
			{products.length > 0 && (
				<CategoryProductList product_list={products} category={category} />
			)}
		</>
	);
}

export default CategoryProducts;
