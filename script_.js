document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('matches-body');
    const table = document.getElementById('matches-table');
    const loader = document.getElementById('loader');
    const API_URL = 'https://api.szfb.sk/v1/clubs/TVOJE_CLUB_ID/matches'; 

    async function loadRealMatches() {
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) throw new Error('Nepodarilo sa načítať dáta');
            
            const data = await response.json();
            tableBody.innerHTML = data.map(m => `
                <tr>
                    <td>${new Date(m.date).toLocaleDateString('sk-SK')}</td>
                    <td><strong>${m.opponent_name}</strong></td>
                    <td>${m.score ? m.score : m.start_time}</td>
                    <td>${m.venue_name}</td>
                </tr>
            `).join('');

            loader.style.display = 'none';
            table.style.display = 'table';

        } catch (error) {
            console.error("Chyba API:", error);
            loader.innerText = "Dáta zo SZFB nie sú momentálne dostupné. Skontroluj nastavenia API.";

            showFallbackData();
        }
    }

    function showFallbackData() {
        const fallback = [
        { date: 'Nedeľa, 21.09.2025', opponent_name: 'SunLakers SENEC vs Tsunami Záhorská Bystrica A', venue_name: 'ŠPORT ARENA Malacky "kat. A"', score: '4 - 4 / 13:15'},
        { date: 'Nedeľa, 28.09.2025', opponent_name: '1. SC Malacky vs SunLakers SENEC', venue_name: 'ŠPORT ARENA Malacky "kat. A"', score: '0 - 12 / 8:15' },
        { date: 'Nedeľa, 28.09.2025', opponent_name: 'ŠK Florbal Modra vs SunLakers SENEC', venue_name: 'ŠPORT ARENA Malacky "kat. A"', score: '4 - 3 / 12:00' },
        { date: 'Nedeľa, 26.10.2025', opponent_name: 'SunLakers SENEC vs Snipers Šamorín', venue_name: 'ŠH ŠDaJĽŠ Bratislava "kat. D"', score: '1 - 6 / 9:15' },
        { date: 'Nedeľa, 26.10.2025', opponent_name: 'Športová škola Galaktikos vs SunLakers SENEC', venue_name: 'ŠH ŠDaJĽŠ Bratislava "kat. D"', score: '8 - 1 / 11:45' },
        { date: 'Nedeľa, 02.11.2025', opponent_name: 'Tsunami Záhorská Bystrica A vs SunLakers SENEC', venue_name: 'ŠH ŠDaJĽŠ Bratislava "kat. D"', score: '11 - 0 / 13:30' },
        { date: 'Nedeľa, 16.11.2025', opponent_name: 'Tsunami Záhorská Bystrica B vs SunLakers SENEC', venue_name: 'Pankúchova "kat. B"', score: '8 - 9 / 12:00' },
        { date: 'Nedeľa, 16.11.2025', opponent_name: 'SunLakers SENEC vs Snipers Bratislava', venue_name: 'Pankúchova "kat. B"', score: '4 - 11 / 15:45' },
        { date: 'Nedeľa, 30.11.2025', opponent_name: 'Tsunami Záhorská Bystrica B vs SunLakers SENEC', venue_name: 'Tsunami Aréna "kat. B"', score: '2 - 7 / 10:10' },
        { date: 'Nedeľa, 30.11.2025', opponent_name: 'ŠK Lido Prírodovedec bieli vs SunLakers SENEC', venue_name: 'Tsunami Aréna "kat. B"', score: '10 - 0 / 12:50' },
        { date: 'Nedeľa, 14.12.2025', opponent_name: 'SunLakers SENEC vs Športová škola Galaktikos', venue_name: 'ŠPORT ARENA Malacky "kat. A"', score: '8 - 3 / 13:40' },
        { date: 'Nedeľa, 14.12.2025', opponent_name: 'ŠK Lido Prírodovedec bieli vs SunLakers SENEC', venue_name: 'ŠPORT ARENA Malacky "kat. A"', score: '11 - 0 / 10:10' },
        { date: 'Nedeľa, 25.01.2026', opponent_name: 'SunLakers SENEC vs Warriors Petržalka', venue_name: 'ŠPORT ARENA Malacky "kat. A"', score: '8 - 7 / 12:20' },
        { date: 'Sobota, 07.03.2026', opponent_name: 'SunLakers SENEC vs Florbalová Akadémia Rača', venue_name: 't.b.a.', score: 'vs / 00:00' },
        { date: 'Nedeľa, 08.03.2026', opponent_name: 'ŠK Lido červení vs SunLakers SENEC', venue_name: 'ŠH Malina "kat. A"', score: 'vs / 12:15' },
        { date: 'Nedeľa, 08.03.2026', opponent_name: 'Florbalová Akadémia Rača vs SunLakers SENEC', venue_name: 'ŠH Malina "kat. A"', score: 'vs / 9:50' },
        { date: 'Nedeľa, 15.03.2026', opponent_name: 'SunLakers SENEC vs Snipers Bratislava', venue_name: 't.b.a.', score: 'vs / 00:00' },
        { date: 'Nedeľa, 29.03.2026', opponent_name: 'Warriors Petržalka vs SunLakers SENEC', venue_name: 't.b.a.', score: 'vs / 00:00' },
        { date: 'Nedeľa, 19.04.2026', opponent_name: 'ŠK Florbal Modra vs SunLakers SENEC', venue_name: 't.b.a.', score: 'vs / 00:00' },
        { date: 'Nedeľa, 03.05.2026', opponent_name: 'SunLakers SENEC vs 1. SC Malacky', venue_name: 't.b.a.', score: 'vs / 00:00' }
    ];
        
        tableBody.innerHTML = fallback.map(m => `
            <tr>
                <td>${m.date}</td>
                <td>${m.opponent_name}</td>
                <td><strong>${m.score}</strong></td>
                <td>${m.venue_name}</td>
            </tr>
        `).join('');
        
        loader.style.display = 'none';
        table.style.display = 'table';
    }

    loadRealMatches();
});
window.onload = function() {
    const obrazky = [
        "img/img_1.jpg", "img/img_2.jpg", "img/img_3.jpg",
        "img/img_4.jpg", "img/img_5.jpg", "img/img_6.jpg"
    ];

    let index = 0;
    const logo = document.getElementById("obrazokSlider");

    if (logo) { 
        function zmenObrazok() {
            logo.classList.add("hidden");

            setTimeout(() => {
                index = (index + 1) % obrazky.length;
                logo.src = obrazky[index];
                
                logo.onload = () => logo.classList.remove("hidden");
            }, 200); 
        }
        setInterval(zmenObrazok, 3000);
    } else {
        console.error("Element s ID 'mojeLogo' sa nenašiel!");
    }
};