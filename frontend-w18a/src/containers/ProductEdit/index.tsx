// import { CategoryForm } from "../../components"
// import { CategoryForm as CategoryFormProps, Category } from "../../types"
// import { useNavigate, useParams } from "react-router-dom"
// import { useCallback, useEffect, useState } from "react";
// import { headers } from '../../types';

// const ProductEdit = () => {

//     const navigate = useNavigate();
//     const [category, setCategory] = useState<Category>()

//     const { id } = useParams();

//     const token = localStorage.getItem('token');
//     console.log("token:", token);

//     const getCategory = useCallback(
//         async () => {
//             const fetching = await fetch(`https://mock-api.arikmpt.com/api/category/${id}`, {headers})
//             const response: Category = await fetching.json();
    
//             setCategory(response)
//         },
//         [id]
//     )

//     useEffect(
//         () => {
//             getCategory()
//         },
//         [getCategory]
//     )

//     const onSubmit = async (values: CategoryFormProps) => {
//         try {

//             const productEdit: Category = {
//                 id : id,
//                 name : values.name,
//                 is_active : values.is_active,
//             }
//             const fetching = await fetch(`https://mock-api.arikmpt.com/api/category/update`, {
//                 method: 'PUT',
//                 headers: 
//                 { 
//                     'Content-Type': 'application/json', 
//                     Authorization: `Bearer ${token}`
//                     // 'authToken'
//                 },
//                 body: JSON.stringify(
//                     productEdit
//                 ),
//             })
//             // await fetching.json()
//             if (fetching.ok) {
//                 navigate('/product')
//             } else {
//                 console.log("Failed to update category")
//             }
//         } catch (error) {
//             alert(error)
//         }
//     }

//     if(category) {
//         return <CategoryForm onSubmit={onSubmit} category={category}/>
//     }

//     return null
// }

// export default ProductEdit