document.getElementById('btnHitung').addEventListener('click', async () => {
    // 1. Ambil nilai dari HTML
    const angka1 = parseFloat(document.getElementById('angka1').value);
    const angka2 = parseFloat(document.getElementById('angka2').value);
    const operasi = document.getElementById('operasi').value;
    const hasilTeks = document.getElementById('hasilTeks');

    // Validasi input kosong
    if (isNaN(angka1) || isNaN(angka2)) {
        hasilTeks.innerText = "Masukkan angka yang valid!";
        hasilTeks.style.color = "red";
        return;
    }

    hasilTeks.innerText = "Menghitung...";
    hasilTeks.style.color = "black";

    // 2. Siapkan data untuk dikirim ke Backend
    const dataKirim = {
        angka1: angka1,
        angka2: angka2,
        operasi: operasi
    };

    try {
        // CATATAN: Ganti URL ini dengan URL Hugging Face pada saat melakukan deploy
        // Contoh: "https://username-nama-space.hf.space/calculate"
        const BACKEND_URL = "http://127.0.0.1:8000/calculate"; 

        // 3. Lakukan request POST ke Backend Python
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataKirim)
        });

        const dataResponse = await response.json();

        // 4. Tampilkan hasil atau error dari server
        if (!response.ok) {
            hasilTeks.innerText = "Error: " + dataResponse.detail;
            hasilTeks.style.color = "red";
        } else {
            hasilTeks.innerText = dataResponse.hasil;
            hasilTeks.style.color = "green";
        }

    } catch (error) {
        hasilTeks.innerText = "Gagal terhubung ke server!";
        hasilTeks.style.color = "red";
        console.error("Error:", error);
    }
});