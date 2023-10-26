import { useParams } from 'react-router-dom'

const ProductDetail = () => {
    const params = useParams();

    return (
        <div>
            This is detail of product page with id: {params?.id}
        </div>
    )
}

export default ProductDetail