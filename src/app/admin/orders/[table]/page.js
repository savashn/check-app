import Table from '@/components/Table';

export default async function Page(props) {
    const params = await props.params;
    const apiUrl = process.env.API_URL;
    const table = params.table;

    const res = await fetch(`${apiUrl}/orders/${table}`, {
        method: 'GET',
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    return (
        <>
            <Table data={data} apiUrl={apiUrl} tableId={table} />
        </>
    )
}