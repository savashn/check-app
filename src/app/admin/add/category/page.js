import AddCategory from '@/components/AddCategory';

export default function Page() {
    const apiUrl = process.env.API_URL;
    return (
        <>
            <AddCategory apiUrl={apiUrl} />
        </>
    );
}