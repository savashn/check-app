"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/app/page.module.css'
import { useRouter } from 'next/navigation';

function EditProduct({ apiUrl, data, slug, pslug }) {
    const [product, setProduct] = useState(data.product);
    const [description, setDescription] = useState(data.description);
    const [price, setPrice] = useState(data.price);
    const [stock, setStock] = useState(data.stock);
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('x-auth-token='))?.split('=')[1];
        setToken(token);
    }, []);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            product,
            description,
            price,
            stock
        }

        try {
            const response = await fetch(`${apiUrl}/category/${slug}/product/${pslug}`, {
                method: 'PUT',
                headers: {
                    'x-auth-token': `${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                alert('İşlem başarılı.');
                router.push(`/admin/categories/${slug}/edit/products`);
            } else {
                const errorData = await response.json();
                alert(`Hata: ${response.status} - ${errorData.message || 'Bilinmeyen bir sorun oluştu.'}`);
            }

        } catch (err) {
            console.log(err);
            alert(err);
        }
    }


    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/delete/product/${pslug}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': `${token}`
                }
            });

            if (response.ok) {
                alert('Silme işlemi başarılı.');
                router.push(`/admin/categories/${slug}/edit/products`);
            } else {
                const errorData = await response.json();
                alert(`Hata: ${response.status} - ${errorData.message || 'Bilinmeyen bir sorun oluştu.'}`);
            }

        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    return (
        <div className={styles.main}>
            <div className={styles.adminContent}>
                <form onSubmit={handleSubmit}>

                    <label>
                        Ürün başlığı:
                    </label>

                    <br /><br />

                    <input
                        className={styles.input}
                        type='text'
                        placeholder='Ürün adı'
                        id='urun'
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                    />

                    <br />

                    <label>
                        Ürün açıklaması:
                    </label>

                    <br /><br />

                    <textarea
                        className={styles.input}
                        style={{ fontFamily: 'inherit', height: '10rem', padding: '1rem' }}
                        type='text'
                        placeholder='Ürün açıklaması'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <br />

                    <label>
                        Ederi:
                    </label>

                    <br /><br />

                    <input
                        className={styles.input}
                        type='number'
                        placeholder='Ürün ederi'
                        id='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <br />

                    <label>
                        Ürün stokta var:
                    </label>

                    <br /><br />

                    <input type="checkbox" checked={!!stock} onChange={(e) => setStock(e.target.checked)} />

                    <br /><br /><br />

                    <button type='submit' className={styles.button} style={{ backgroundColor: 'darkgreen' }}>Düzenlemeleri Saka</button>
                </form>
                <br />
                <button className={styles.button} style={{ backgroundColor: 'darkred' }} onClick={(e) => handleDelete(e)}>Ürünü Sil</button>
            </div>
        </div>
    )
}

export default EditProduct