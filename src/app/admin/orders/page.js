import Orders from "@/components/Orders";

export default async function Page() {
    const apiUrl = process.env.API_URL;

    const res = await fetch(`${apiUrl}/orders`, {
        cache: 'no-store',
        headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
        }
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    return (
        <>
            <Orders data={data} />
        </>
    )
}