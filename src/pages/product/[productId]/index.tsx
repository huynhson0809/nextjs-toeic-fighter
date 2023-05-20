import { useRouter } from "next/router"
import { useState } from "react"
const ProductDetail = () => {
    const router = useRouter()
    const id = router.query.productId
    return <div>ProductDetail + {id}</div>
}
export default ProductDetail