"use client";
import React, { useState } from 'react';
import styles from '@/app/page.module.css';
import { useRouter } from 'next/navigation';

function Enter({ apiUrl }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const postData = {
            username,
            password
        };

        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postData)
            });

            if (response.ok) {
                const token = await response.text();
                document.cookie = `x-auth-token=${token}; max-age=86400`;

                router.push('/admin/tables');
            } else {
                throw new Error('Login failed');
            }

        } catch (err) {
            alert('Bir sorun oldu.');
            console.error('Error: ', err);
        }
    };

    return (
        <div className={styles.entryContainer}>
            <div className={styles.entryBox}>

                <form className={styles.entryBody} onSubmit={handleSubmit}>

                    <label>Kullanıcı adı:</label>
                    <br /><br />

                    <input
                        className={styles.entryInput}
                        type="text"
                        value={username}
                        placeholder='admin'
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <br />

                    <label>Şifre:</label>
                    <br /><br />

                    <input
                        className={styles.entryInput}
                        type="password"
                        value={password}
                        placeholder='admin'
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <br />

                    <button className={styles.button} type='submit'>
                        Giriş Yap
                    </button>

                </form>

            </div>
        </div>
    )
}

export default Enter;