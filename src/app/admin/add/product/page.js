import AddProduct from '@/components/AddProduct';

export default async function Page() {
    const apiUrl = process.env.API_URL;

    const res = await fetch(`${apiUrl}/categories`, {
        method: 'GET',
        cache: 'no-store'
    });

    const data = await res.json();

    return (
        <>
            <AddProduct apiUrl={apiUrl} data={data} />
        </>
    );
}