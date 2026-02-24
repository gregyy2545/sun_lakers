document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('matches-body');
    const table = document.getElementById('matches-table');
    const loader = document.getElementById('loader');

    // SEM VLOŽ REÁLNU URL ZÁPISOV Z METISU ALEBO SZFB API
    const API_URL = 'https://api.szfb.sk/v1/clubs/TVOJE_CLUB_ID/matches'; 

    async function loadRealMatches() {
        try {
            // Skúšame získať dáta
            const response = await fetch(API_URL);
            
            if (!response.ok) throw new Error('Nepodarilo sa načítať dáta');
            
            const data = await response.json();

            // Vygenerujeme riadky z dát, ktoré prišli z API
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
            // Pre istotu tu necháme fallback na naše testovacie dáta, aby stránka nebola prázdna
            showFallbackData();
        }
    }

    // Fallback funkcia, ak API zlyhá
    function showFallbackData() {
        const fallback = [
            { date: '14.03.2026', opponent_name: 'FBC Lions Bratislava', start_time: '18:00', venue_name: 'Mestská Hala Senec', score: 'Prebieha' },
            { date: '07.03.2026', opponent_name: 'Snipers Bratislava', start_time: '14:00', venue_name: 'Hala Elán', score: '5:3' }
        ];
        
        tableBody.innerHTML = fallback.map(m => `
            <tr>
                <td>${m.date}</td>
                <td><strong>${m.opponent_name}</strong></td>
                <td>${m.score}</td>
                <td>${m.venue_name}</td>
            </tr>
        `).join('');
        
        loader.style.display = 'none';
        table.style.display = 'table';
    }

    loadRealMatches();
});