import Products from '@/components/Products';

export default async function Page(props) {
    const params = await props.params;
    const slug = params.slug;
    const apiUrl = process.env.API_URL;

    const res = await fetch(`${apiUrl}/category/${slug}`, {
        method: 'GET',
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    return (
        <>
            <Products data={data} apiUrl={apiUrl} />
        </>
    );
}