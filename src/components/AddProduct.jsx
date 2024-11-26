"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/app/page.module.css'

function AddProduct({ apiUrl, data }) {
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(null);
    const [category, setCategory] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('x-auth-token='))?.split('=')[1];
        setToken(token);
        console.log(data)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            product,
            description,
            price,
            category
        };

        try {
            const response = await fetch(`${apiUrl}/add/product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': `${token}`
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                alert('İşlem başarılı.');
                window.location.reload();
            } else {
                throw new Error('İstek başarısız oldu');
            }

        } catch (error) {
            console.error('Error: ', error);
        }
    };


    return (
        <div className={styles.main}>
            <div className={styles.adminContent}>
                <form encType='multipart/form-data' onSubmit={handleSubmit}>

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
                        Ürün türü:
                    </label>

                    <br /><br />

                    <select
                        className={styles.input}
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value='' disabled>
                            Ürün kategorisi
                        </option>

                        {data.map((category, index) => (
                            <option key={index} value={category.slug}>{category.category}</option>
                        ))}
                    </select>

                    <br />

                    <button type='submit' className={styles.button}>Yükle</button>
                </form>
            </div>
        </div>
    )
}

export default AddProduct