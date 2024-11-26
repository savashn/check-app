import AddTable from "@/components/AddTable";

export default async function Page() {
    const apiUrl = process.env.API_URL;

    return (
        <>
            <AddTable apiUrl={apiUrl} />
        </>
    );
}