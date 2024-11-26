import styles from '@/app/page.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default async function Page(props) {
    const params = await props.params;
    const apiUrl = process.env.API_URL;

    const res = await fetch(`${apiUrl}/categories`, {
        method: 'GET',
        cache: 'no-store'
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }

    const data = await res.json();

    return (
        <div className={styles.main}>

            <h2 style={{ margin: 'auto', textAlign: 'center', fontSize: '2rem', fontStyle: 'bold', marginBottom: '3rem', textDecoration: 'underline' }}>
                {params.table} SAYILI MASAYA YENİ ÜRÜN EKLE
            </h2>

            <div className={styles.content}>
                {data.map((category, index) => (

                    <Link key={index} className={styles.link} href={`/admin/orders/${params.table}/${category.slug}`}>
                        <div className={styles.card}>

                            {category.category}
                            <br />
                            <Image
                                src={`${category.image}`}
                                className={styles.image}
                                alt="Ürün Görüntüsü"
                                width={300}
                                height={300}
                                priority
                            />

                        </div>
                    </Link>

                ))}
            </div>
        </div>
    )
}