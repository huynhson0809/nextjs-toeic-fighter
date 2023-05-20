import { useRouter } from "next/router"
const Docs = () => {
    const router = useRouter()
    const { params = [] } = router.query
    console.log(params);
    if (params.length === 2) {
        return (
            <h1>Doc for feature {params[0]} and {params[1]}</h1>
        )
    }
    else if (params.length === 1) {
        return (
            <h1>Doc for feature {params[0]}</h1>
        )
    }
    return <div>Docs</div>
}
export default Docs