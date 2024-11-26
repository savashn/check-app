import styles from '@/app/page.module.css';
import Link from 'next/link';

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
        <div className={styles.main}>

            <div className={styles.tableOrders}>
                <table>
                    <thead>
                        <tr>
                            <th>ÜRÜN</th>
                            <th>EDER</th>
                            <th>STOK</th>
                            <th>İŞLEM</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.products.map((p, idx) => (
                            <tr key={idx}>
                                <td>{p.product}</td>
                                <td>{p.price}</td>
                                <td>{p.stock === true ? 'Var' : 'Yok'}</td>
                                <td>
                                    <Link href={`products/${p.slug}`}>
                                        <button className={styles.button} style={{ backgroundColor: 'green' }}>
                                            DÜZENLE
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>

    )
}