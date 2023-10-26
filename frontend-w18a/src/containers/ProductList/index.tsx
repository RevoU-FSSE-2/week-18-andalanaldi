import { ColumnsType } from 'antd/es/table';
import { useEffect, useState  } from 'react';
import { ProductList as ProductListComponent } from '../../components'
import { headers, GetCategoryResponse, Category } from '../../types';
// import { Button } from 'antd'
// import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../config/config';
//useRef
const ProductList = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    // const navigate = useNavigate();
    
    const getCategoryList = async () => {
        const token = localStorage.getItem('token');
        console.log("token:", token);
        try {
            const fetching = await fetch(`${BASE_URL}/trans`, {headers})
            // `https://mock-api.arikmpt.com/api/category`
            // headers: {  
            //     'Content-Type': 'application/json', 
            //     Authorization: `Bearer ${'token'}`
            // },
            const response: GetCategoryResponse = await fetching.json();
            setCategories(response.data ?? []); 
        } catch (error) {
            alert(error);
        }
    }


    // Create a ref for handleNavigate
    // const handleNavigateRef = useRef<(path: string) => void>((path: string) => {
    //     navigate(path);
    // });

    // Extract the function from the ref
    // const handleNavigate = handleNavigateRef.current;

    useEffect(
        () => {
            getCategoryList()
        }, 
        []
    )

    // useEffect(() => {

    //     const token = localStorage.getItem('authToken');
    //     if(!token) {
    //         handleNavigate('/Product'); 
    //         return;
    //     }
    //         getProductList();
    //     }, [handleNavigate]);

    // const removeProduct = async (id: string | undefined) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         console.log("token:", token);
    //         const fetching = await fetch(`https://mock-api.arikmpt.com/api/category/${id}`, {
    //             method: 'DELETE',
    //             headers: { 
    //             //     'Content-Type': 'application/json', 
    //                 Authorization: `Bearer ${token}`
    //             //     // 'authToken'
    //             // 34506582-54ef-4997-ad9b-1d05b716023c
    //             },
    //         })

    //         // const response = await fetching.json()

    //         if(fetching.ok) {
    //             //cara pertama panggil api lagi
    //             // getProductList()

    //             //cara kedua
    //             setCategories((categories) => categories.filter((category) => category.id !== id))
    //         }
    //     } catch (error) {
    //         alert(error)
    //     }
    // }

    const columns: ColumnsType<Category> = [
        // {
        //     title: 'ID',
        //     dataIndex: 'id',
        //     key: 'id',        
        // },
        // {
        //     title: 'Name',
        //     dataIndex: 'name',
        //     key: 'name',        
        // },
        // {
        //     title: 'Status',
        //     dataIndex: 'is_active',
        //     key: 'is_active',
        //     render: (is_active: boolean) => (is_active ? 'Activate' : 'Deactive')
        //     // ( value ) => ( value ?)
        // },
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username', 
        },
        {
            title: 'Transfer',
            dataIndex: 'transfer',
            key: 'transfer', 
        },
        {
            title: 'Nominal',
            dataIndex: 'nominal',
            key: 'nominal', 
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status', 
        }
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //       <>
        //         {/* <Button type={'default'} onClick={() => navigate(`/product/${record.id}`)}>Detail</Button> */}
        //         <Button type={'primary'} onClick={() => navigate(`/product/edit/${record.id}`)}>Edit</Button>
        //         <Button type={'primary'} color={'red'} onClick={() => removeProduct(record.id)} style={{ marginLeft: "0.3rem" }}>Delete</Button>
        //       </>
        //     ),
        // },
    ];

    return (
        <>
            <h3>Product List</h3>
            {/* <Button type={'primary'} onClick={() => navigate('/product/new')}>Add New Product</Button> */}
            <ProductListComponent columns={columns} data={categories}/>
        </>
    )
}

export default ProductList