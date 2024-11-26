"use client";
import React, { useState, useEffect } from 'react'
import styles from '../app/page.module.css';

function AddTable({ apiUrl }) {
    const [table, setTable] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('x-auth-token='))?.split('=')[1];
        setToken(token);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (table == null) {
            alert('Masa numarası boş bırakılamaz.');
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/add/table`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': `${token}`
                },
                body: JSON.stringify({ table: table })
            });

            if (response.ok) {
                alert('İşlem başarılı.');
                const data = await response.json();
                console.log(data);
                window.location.reload();
            } else {
                throw new Error('İstek başarısız oldu');
            }

        } catch (err) {
            alert('Bir sorun oldu.');
            console.log(err);
        }
    };



    return (
        <div className={styles.main}>
            <div className={styles.adminContent}>

                <h2>Yeni Masa Ekle:</h2>
                <br />

                <form onSubmit={handleSubmit}>
                    <input
                        className={styles.input}
                        type='number'
                        id='table'
                        value={table}
                        onChange={(e) => setTable(Number(e.target.value))}
                    />

                    <br />

                    <button type='submit' className={styles.button} style={{ width: '10rem' }}>
                        EKLE
                    </button>
                </form>

            </div>
        </div>
    )
}

export default AddTable