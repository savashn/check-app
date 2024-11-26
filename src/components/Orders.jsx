"use client";
import React, { useEffect } from 'react';
import styles from '@/app/page.module.css';
import Link from 'next/link';

function Orders({ data }) {
    let timeoutId;

    useEffect(() => {
        const handleUserActivity = () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                alert("3 dakika boyunca işlem yapılmadı. Sayfa yenileniyor...");
                window.location.reload();
            }, 3 * 60 * 1000);
        };

        window.addEventListener("mousemove", handleUserActivity);
        window.addEventListener("keydown", handleUserActivity);
        window.addEventListener("click", handleUserActivity);
        window.addEventListener("touchstart", handleUserActivity);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("mousemove", handleUserActivity);
            window.removeEventListener("keydown", handleUserActivity);
            window.removeEventListener("click", handleUserActivity);
            window.removeEventListener("touchstart", handleUserActivity);
        };
    }, []);

    return (
        <div className={styles.main}>
            <div className={styles.adminCardContent}>

                {data.map((i, idx) => {

                    const allServed = i.orders.every(order => order.isServed === true);
                    const anyServed = i.orders.some(order => order.isServed === true);

                    let statusMessage = "Masa boş";
                    let cardClass = styles.empty;

                    if (i.orders.length > 0 && allServed) {
                        statusMessage = "Tüm ürünler verildi";
                        cardClass = styles.served;
                    } else if (i.orders.length > 0 && anyServed) {
                        statusMessage = "Bekleyen ürün var";
                        cardClass = styles.notServed;
                    } else if (i.orders.length > 0) {
                        statusMessage = "İlk sipariş";
                        cardClass = styles.notServedAtAll;
                    } else if (i.check === true) {
                        statusMessage = 'Hesap isteniyor';
                        cardClass = styles.check;
                    }

                    return (
                        <div key={idx}>
                            <Link href={`/admin/orders/${i.table}`} className={styles.link}>

                                <div className={`${styles.adminCard} ${cardClass}`}>

                                    <h3 style={{ textAlign: 'center', fontSize: '5rem', margin: 'auto' }}>
                                        {i.table}
                                        <br />
                                        <span style={{ fontSize: '1rem' }}>
                                            {statusMessage}
                                        </span>
                                    </h3>

                                </div>

                            </Link>
                        </div>
                    );

                })}

            </div>
        </div>
    );
}

export default Orders;