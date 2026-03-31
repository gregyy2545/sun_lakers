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
            { date: 'Nedeľa, 12.10.2025', opponent_name: 'Športový klub Pressburg Scorpions vs SunLakers Senec', venue_name: 'Telocvičňa Školská ulica 4 Chorvátsky Grob "kategória E"', score: '0 - 0 / 12:00' },
            { date: 'Nedeľa, 12.10.2025', opponent_name: 'Grobshí Vlci Bieli vs SunLakers Senec', venue_name: 'Telocvičňa Školská ulica 4 Chorvátsky Grob "kategória E"', score: '0 - 0 / 10:00' },
            { date: 'Nedeľa, 26.10.2025', opponent_name: 'Snipers Šamorín vs SunLakers Senec', venue_name: 'Telocvičňa Školská ulica 4 Chorvátsky Grob "kategória E"', score: '0 - 0 / 9:00' },
            { date: 'Nedeľa, 26.10.2025', opponent_name: 'Tsunami Záhorská Bystrica Bieli vs SunLakers Senec', venue_name: 'Telocvičňa Školská ulica 4 Chorvátsky Grob "kategória E"', score: '0 - 0 / 10:40' },
            { date: 'Nedeľa, 16.11.2025', opponent_name: 'VŠK FTVŠ UK Hurikán Inspiro vs SunLakers Senec', venue_name: 'Tsunami Aréna "kategória B"', score: '0 - 0 / 16:00' },
            { date: 'Nedeľa, 16.11.2025', opponent_name: 'ŠK Florbal Modra vs SunLakers Senec', venue_name: 'Tsunami Aréna "kategória B"', score: '0 - 0 / 15:00' },
            { date: 'Nedeľa, 30.11.2025', opponent_name: '1. SC Malacky vs SunLakers Senec', venue_name: 'Telocvičňa ZŠ Dr. J. Dérera Malacky "kategória E"', score: '0 - 0 / 9:00' },
            { date: 'Nedeľa, 30.11.2025', opponent_name: 'SunLakers Senec vs Športový klub Pressburg Scorpions', venue_name: 'Telocvičňa ZŠ Dr. J. Dérera Malacky "kategória E"', score: '0 - 0 / 10:00' },
            { date: 'Nedeľa, 25.01.2026', opponent_name: 'Snipers Šamorín vs SunLakers Senec', venue_name: 'CSŠ Hviezdoslavov "kategória E"', score: '0 - 0 / 10:00' },
            { date: 'Nedeľa, 14.12.2025', opponent_name: 'Grobshí Vlci Bieli vs SunLakers Senec', venue_name: 'Multihala Bernolákovo "kategória E"', score: '0 - 0 / 10:50' },
            { date: 'Nedeľa, 11.01.2026', opponent_name: 'VŠK FTVŠ UK Hurikán Inspiro vs SunLakers Senec', venue_name: 'ŠH ZŠ Ľ. Štúra Modra "kategória B"', score: '0 - 0 / 13:10' },
            { date: 'Nedeľa, 11.01.2026', opponent_name: 'SunLakers Senec vs ŠK Florbal Modra', venue_name: 'ŠH ZŠ Ľ. Štúra Modra "kategória B"', score: '0 - 0 / 14:50' },
            { date: 'Nedeľa, 18.01.2026', opponent_name: 'SunLakers Senec vs 1. SC Malacky', venue_name: 'CSŠ Hviezdoslavov "kategória E"', score: '0 - 0 / 15:35' },
            { date: 'Nedeľa, 18.01.2026', opponent_name: 'Tsunami Záhorská Bystrica Bieli vs SunLakers Senec', venue_name: 'CSŠ Hviezdoslavov "kategória E"', score: '0 - 0 / 12:00' },
            { date: 'Nedeľa, 01.03.2026', opponent_name: 'Športový klub Pressburg Scorpions vs SunLakers Senec', venue_name: 'ŠH ZŠ Ľ. Štúra Modra "kategória B"', score: '0 - 0 / 10:40' },
            { date: 'Nedeľa, 01.03.2026', opponent_name: 'Grobshí Vlci Modrí vs SunLakers Senec', venue_name: 'ŠH ZŠ Ľ. Štúra Modra "kategória B"', score: '0 - 0 / 9:00' },
            { date: 'Nedeľa, 15.03.2026', opponent_name: 'Snipers Šamorín vs SunLakers Senec', venue_name: 'Tsunami Aréna "kategória B"', score: '0 - 0 / 10:10' },
            { date: 'Nedeľa, 15.03.2026', opponent_name: 'Tsunami Záhorská Bystrica Bieli vs SunLakers Senec', venue_name: 'Tsunami Aréna "kategória B"', score: '0 - 0 / 12:00' },
            { date: 'Nedeľa, 29.03.2026', opponent_name: 'VŠK FTVŠ UK Hurikán Inspiro vs SunLakers Senec', venue_name: 'Telocvičňa Školská ulica 4 Chorvátsky Grob "kategória E"', score: '0 - 0 / 12:00' },
            { date: 'Nedeľa, 29.03.2026', opponent_name: 'ŠK Florbal Modra vs SunLakers Senec', venue_name: 'Telocvičňa Školská ulica 4 Chorvátsky Grob "kategória E"', score: '0 - 0 / 10:00' },
            { date: 'Nedeľa, 12.04.2026', opponent_name: '1. SC Malacky vs SunLakers Senec', venue_name: 'ŠH Malina Malacky "kategória A"', score: 'vs / 9:00' },
            { date: 'Nedeľa, 12.04.2026', opponent_name: 'SunLakers Senec vs Športový klub Pressburg Scorpions', venue_name: 'ŠH Malina Malacky "kategória A"', score: 'vs / 9:50' },
            { date: 'Nedeľa, 19.04.2026', opponent_name: 'Snipers Šamorín vs SunLakers Senec', venue_name: 't.b.a.', score: 'vs / 0:00' },
            { date: 'Nedeľa, 19.04.2026', opponent_name: 'Grobshí Vlci Modrí vs SunLakers Senec', venue_name: 't.b.a.', score: 'vs / 0:00' },
            { date: 'Nedeľa, 10.05.2026', opponent_name: 'VŠK FTVŠ UK Hurikán Inspiro vs SunLakers Senec', venue_name: 't.b.a.', score: 'vs / 0:00' },
            { date: 'Nedeľa, 10.05.2026', opponent_name: 'SunLakers Senec vs ŠK Florbal Modra', venue_name: 't.b.a.', score: 'vs / 0:00' },
            { date: 'Nedeľa, 31.05.2026', opponent_name: 'SunLakers Senec vs 1. SC Malacky', venue_name: 'Multihala Bernolákovo "kategória E"', score: 'vs / 9:00' },
            { date: 'Nedeľa, 31.05.2026', opponent_name: 'Tsunami Záhorská Bystrica Bieli vs SunLakers Senec', venue_name: 'Multihala Bernolákovo "kategória E"', score: 'vs / 10:40' },
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