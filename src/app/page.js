import Enter from "@/components/Enter";

export default function Home() {
  const apiUrl = process.env.API_URL

  return (
    <div>
      <Enter apiUrl={apiUrl} />
    </div>
  );
}
