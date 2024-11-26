import EditProduct from "@/components/EditProduct";

export default async function Page(props) {
    const params = await props.params;
    const apiUrl = process.env.API_URL;

    const res = await fetch(`${apiUrl}/category/${params.slug}/product/${params.pslug}`, {
        method: 'GET',
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    return (
        <>
            <EditProduct data={data} apiUrl={apiUrl} slug={params.slug} pslug={params.pslug} />
        </>
    )
}