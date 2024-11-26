"use client";
import React, { useEffect, useState } from 'react'
import styles from '@/app/page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function EditCategory({ data, apiUrl, slug }) {
    const [category, setCategory] = useState(data.category);
    const [image, setImage] = useState(null);
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(null);

    const [token, setToken] = useState('');

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('x-auth-token='))?.split('=')[1];
        setToken(token);
    }, []);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('category', category);
        formData.append('product', product);
        formData.append('description', description);
        formData.append('price', price);

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`${apiUrl}/edit/category/${slug}`, {
                method: 'PUT',
                headers: {
                    'x-auth-token': `${token}`,
                },
                body: formData,
            });

            if (response.ok) {
                alert('Düzenleme işlemi başarılı.');
                router.push('/admin/categories');
            } else {
                const errorData = await response.json();
                alert(`Hata: ${response.status} - ${errorData.message || 'Bilinmeyen bir sorun oluştu.'}`);
            }

        } catch (err) {
            console.log(err);
            alert(err);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${apiUrl}/delete/category/${slug}`, {
                method: 'DELETE',
                headers: {
                    'x-auth-token': `${token}`
                }
            });

            if (response.ok) {
                alert('Silme işlemi başarılı.');
                router.push('/admin/categories');
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

            <div className={styles.buttonDiv}>
                <Link href={'edit/products'}>
                    <button className={styles.button}>
                        ÜRÜNLERİ DÜZENLE
                    </button>
                </Link>
            </div>

            <br /><br />
            <hr />
            <br />
            <br />

            <div className={styles.adminContent}>
                <h2>{data.category} Kategorisini Düzenle</h2>

                <br />

                <form encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type='text'
                        placeholder='Kategori'
                        id='category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />

                    <br />

                    <input
                        type="file"
                        id='image'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    {image && <p>Seçilen dosya: {image.name}</p>}

                    <br /><br />

                    <hr />

                    <br /><br />

                    <h2>YENİ ÜRÜN EKLE</h2>

                    <br />

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
                        value={price || ''}
                        onChange={(e) => setPrice(e.target.value ? parseFloat(e.target.value) : 0)}
                    />

                    <br /><br />

                    <hr />

                    <br /><br />

                    <button className={styles.button} style={{ backgroundColor: 'darkgreen' }} type='submit'>Değişiklikleri Sakla</button>
                </form>

                <br />
                <button className={styles.button} style={{ backgroundColor: 'darkred' }} onClick={(e) => handleDelete(e)}>Kategoriyi Sil</button>
            </div>
        </div>
    )
}

export default EditCategory