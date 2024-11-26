"use client";
import React, { useEffect, useState } from "react";
import styles from "../app/page.module.css";
import Link from "next/link";

const getBasketFromStorage = () => {
    if (typeof window !== 'undefined') {
        const basket = localStorage.getItem('basket');
        return basket ? JSON.parse(basket) : [];
    }
    return [];
};

const writeFromBasketToStorage = (products) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('basket', JSON.stringify(products));
    }
};

function Table({ data, apiUrl, tableId }) {
    const [isBasketVisible, setIsBasketVisible] = useState(false);
    const [products, setProducts] = useState(getBasketFromStorage());
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        setIsBasketVisible(products.length > 0);
        const newTotalAmount = products.reduce((total, item) => total + (item.price * item.count), 0);
        setTotalAmount(newTotalAmount);
        writeFromBasketToStorage(products);
    }, [products]);

    const increment = (product) => {
        const currentCount = getProductCount(product.product);
        const updatedProducts = [...products];
        const productIndex = updatedProducts.findIndex(item => item.product === product.product);

        if (productIndex > -1) {
            updatedProducts[productIndex].count = currentCount + 1;
        } else {
            updatedProducts.push({ ...product, count: 1 });
        }

        setProducts(updatedProducts);
    };

    const clearBasket = () => {
        setProducts([]);
        setTotalAmount(0);
        writeFromBasketToStorage([]);
    };

    const decrement = (product) => {
        const currentCount = getProductCount(product.product);
        if (currentCount > 0) {
            const updatedProducts = products
                .map(item =>
                    item.product === product.product
                        ? { ...item, count: currentCount - 1 }
                        : item
                )
                .filter(item => item.count > 0);

            setProducts(updatedProducts);

            if (!updatedProducts.some(item => item.product === product.product)) {
                const basket = getBasketFromStorage();
                const updatedBasket = basket.filter(item => item.product !== product.product);
                writeFromBasketToStorage(updatedBasket);
            }
        }
    };

    const getProductCount = (productName) => {
        const productInBasket = products.find(item => item.product === productName);
        return productInBasket ? productInBasket.count : 0;
    };

    const [isOpen, setIsOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const [paymentModal, setPaymentModal] = useState(false);

    function openModal(objectId) {
        setCurrentProduct(objectId);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
        setCurrentProduct(null);
    }

    function openPaymentModal() {
        setPaymentModal(true);
    }

    function closePaymentModal() {
        setPaymentModal(false);
    }

    const handleServe = async () => {
        if (!currentProduct) return;
        try {
            const response = await fetch(`${apiUrl}/orders/${tableId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ order: currentProduct })
            });

            if (response.ok) {
                closeModal();
                alert('Ürün başarıyla teslim edildi!');
                window.location.reload();
            } else {
                throw new Error('Bir sorun oluştu');
            }

        } catch (err) {
            closeModal();
            alert('Bir sorun oluştu. Lütfen tekrar deneyin.');
            console.log(err);
            window.location.reload();
        }
    };

    const handlePayment = async () => {
        try {
            if (products.length > 0) {
                alert('Sepetteki ürünleri siliniz.');
                window.location.reload();
                return;
            }

            const response = await fetch(`${apiUrl}/close/${tableId}`, {
                method: 'PUT'
            });

            if (response.ok) {
                closeModal();
                alert('Başarıyla ödendi.');
                window.location.reload();
            } else {
                throw new Error('Bir sorun oluştu');
            }

        } catch (err) {
            console.log('Bir sorun oluştu:', err);
            openModal(null, "Bir sorun oluştu. Lütfen tekrar deneyin.");
            window.location.reload();
        }
    };

    const handleOrder = async () => {
        try {
            if (products.length === 0) {
                return alert("Sepet boş, ürün ekleyin.");
            }

            const payload = {
                products: products.map(item => ({
                    product: item.product,
                    description: item.description,
                    price: item.price,
                    count: item.count
                }))
            };

            const response = await fetch(`${apiUrl}/${tableId}/order`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert('Sipariş gönderildi!');
                clearBasket();
                window.location.reload();
            } else {
                throw new Error('Sipariş gönderimi başarısız');
            }

        } catch (err) {
            console.error('Sipariş gönderimi sorunu:', err);
            alert('Sipariş gönderimi aşamasında bir sorun oluştu.');
        }
    };

    return (
        <div className={styles.main}>

            <div className={styles.navigate}>
                <Link href={'/admin/orders'} className={styles.linkText}>
                    &larr; Tüm siparişlere geri dön
                </Link>
            </div>

            <div className={styles.buttonDiv}>
                <Link href={`/admin/orders/${tableId}/add`}>
                    <button className={styles.button}>
                        MASA {tableId} İÇİN YENİ SİPARİŞ EKLE
                    </button>
                </Link>
            </div>

            <br />
            <br />
            <hr />
            <br />
            <br />

            {isBasketVisible && (
                <div>
                    <h3 style={{ textAlign: 'center', margin: '2rem 0', fontSize: '1.5rem' }}>
                        SEPETTEKİ ÜRÜNLERİM
                    </h3>
                    <div className={styles.tableOrders}>

                        <table>
                            <thead>
                                <tr>
                                    <th>ÜRÜN</th>
                                    <th>EDER</th>
                                    <th>SAYI</th>
                                </tr>
                            </thead>
                            <tbody>

                                {products.map((p, idx) => (
                                    <tr key={idx}>

                                        <td>
                                            {p.product}
                                        </td>
                                        <td>
                                            {p.price} ₺
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => increment(p)}
                                                className={styles.arrowButton}
                                                style={{ marginBottom: '1rem' }}
                                            >
                                                ▲
                                            </button>
                                            <br />
                                            {getProductCount(p.product)}
                                            <br />
                                            <button
                                                onClick={() => decrement(p)}
                                                className={styles.arrowButton}
                                                style={{ marginTop: '1rem' }}
                                            >
                                                ▼
                                            </button>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>
                        </table>

                    </div>

                    <br /><br />

                    <div style={{ textAlign: 'center' }}>

                        <p style={{ fontSize: '1.5rem' }}>
                            Seçilen ürünlerin toplam tutarı:
                            <br /><br />
                            {totalAmount} ₺
                        </p>
                        <br /><br />
                        <div className={styles.buttonDiv}>
                            <button className={styles.button} style={{ backgroundColor: '#0f522d' }} onClick={handleOrder}>
                                SEÇİLİ ÜRÜNLERİ ONAYLA
                            </button>
                        </div>
                    </div>

                    <br /><br /><br /><br />
                    <hr />
                    <br /><br />
                </div>
            )}

            {data.orders.length > 0 && (
                <>

                    <div className={styles.tableOrders}>
                        <table>
                            <thead>
                                <tr>
                                    <th>ÜRÜN</th>
                                    <th>SAYI</th>
                                    <th>DURUM</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.orders.map((order, idx) => (
                                    <tr key={idx}>
                                        <td>{order.product}</td>
                                        <td>{order.count} adet</td>
                                        <td>
                                            {order.isServed === false ? (
                                                <button
                                                    className={styles.button}
                                                    style={{ backgroundColor: 'rgba(9, 116, 57, 0.8)', border: '1px solid white' }}
                                                    onClick={() => openModal(order._id)}
                                                >
                                                    Teslim et
                                                </button>
                                            ) : (
                                                <button
                                                    className={styles.button}
                                                    style={{
                                                        border: '1px solid white',
                                                        backgroundColor: "gray",
                                                        cursor: "default",
                                                    }}
                                                >
                                                    Verildi
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.text}>
                        <p>
                            Toplam tutar: {data.totalAmount} ₺
                        </p>

                        <br />
                        {data.orders.every(order => order.isServed === true) && (
                            <button className={styles.button} style={{ backgroundColor: 'rgba(9, 116, 57, 0.8)', border: '1px solid white' }} onClick={() => openPaymentModal()}>
                                Ödemeyi yap
                            </button>
                        )}

                    </div>

                </>
            )}


            {isOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>Onay</h2>
                        <button onClick={handleServe} className={styles.closeButton}>
                            Onayla ve Teslim Et
                        </button>
                        <button onClick={closeModal} className={styles.closeButton} style={{ marginTop: '10px', backgroundColor: '#ff4d4f' }}>
                            İptal
                        </button>
                    </div>
                </div>
            )}

            {paymentModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>Onay</h2>
                        <button onClick={handlePayment} className={styles.closeButton}>
                            Onayla
                        </button>
                        <button onClick={closePaymentModal} className={styles.closeButton} style={{ marginTop: '10px', backgroundColor: '#ff4d4f' }}>
                            İptal
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Table;