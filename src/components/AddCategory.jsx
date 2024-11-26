"use client";
import React, { useEffect, useState } from 'react'
import styles from '@/app/page.module.css'

function AddCategory({ apiUrl }) {
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('x-auth-token='))?.split('=')[1];
        setToken(token);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('category', category);

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch(`${apiUrl}/add/category`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': `${token}`
                },
                body: formData
            });

            if (response.ok) {
                alert('İşlem başarılı.');
                window.location.reload();
            } else {
                throw new Error('İstek başarısız oldu');
            }
            window.location.reload();

        } catch (err) {
            console.log(err);
            alert(err);
        }
    };

    return (
        <div className={styles.main}>
            <div className={styles.adminContent}>
                <h2>Kategori ekle</h2>

                <br />

                <form encType='multipart/form-data' onSubmit={handleSubmit}>
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

                    <button className={styles.button} style={{ width: '10rem' }} type='submit'>Yükle</button>
                </form>
            </div>
        </div>
    );
}

export default AddCategory;