document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const tapList = document.getElementById('tapList');
    const taps = tapList.getElementsByTagName('li');

    const speedControl = document.getElementById('speedControl');
    const volumeControl = document.getElementById('volumeControl');
    const speedValue = document.getElementById('speedValue');
    const volumeValue = document.getElementById('volumeValue');

    let currentTapIndex = 0;
    let tapSources = [];
    let savedTime = 0;

    // Key to store current tap and time
    const STORAGE_KEY_TAP = 'currentTap';
    const STORAGE_KEY_TIME = 'currentTime';

    // Fetch audio list from archive.org API
    // async function fetchAudioList() {
    //     try {
    //         const response = await fetch('https://archive.org/metadata/BatDauTroThanhThuToaDanhDauCucDaoDeBinhTH');
    //         const data = await response.json();

    //         // Extract media files from response
    //         const files = data.files.filter(file => file.format === 'VBR MP3');

    //         tapSources = files.map(file => ({
    //             url: `https://archive.org/download/BatDauTroThanhThuToaDanhDauCucDaoDeBinhTH/${file.name}`,
    //             title: file.name
    //         }));

    //         // Populate the list
    //         tapSources.forEach((tap, index) => {
    //             const li = document.createElement('li');
    //             li.textContent = tap.title;
    //             console.log(tap.title);

    //             li.addEventListener('click', () => loadTap(index));
    //             tapList.appendChild(li);
    //         });

    //         // Load the saved tap and time
    //         loadSavedTapAndTime();
    //     } catch (error) {
    //         console.error('Error fetching audio list:', error);
    //     }
    // }
    async function fetchAudioList() {
        try {
            const response = await fetch('https://archive.org/metadata/BatDauTroThanhThuToaDanhDauCucDaoDeBinhTH');
            const data = await response.json();

            // Lọc các file dạng MP3
            const files = data.files.filter(file => file.format === 'VBR MP3');

            // Map tên file thành "Tập xxx"
            tapSources = files.map(file => {
                // Lấy số tập từ tên file (phần số đầu tiên trước dấu "-")
                const tapNumber = file.name.match(/^\d+/)[0]; // Lấy phần số từ tên file
                return {
                    url: `https://archive.org/download/BatDauTroThanhThuToaDanhDauCucDaoDeBinhTH/${file.name}`,
                    title: `Tập ${tapNumber.padStart(3, '0')}` // Format thành "Tập xxx"
                };
            });

            // Hiển thị danh sách các tập
            tapSources.forEach((tap, index) => {
                const li = document.createElement('li');
                li.textContent = tap.title;
                li.addEventListener('click', () => loadTap(index));
                tapList.appendChild(li);
            });

            // Tải tập đã lưu và thời gian đã lưu
            loadSavedTapAndTime();
        } catch (error) {
            console.error('Error fetching audio list:', error);
        }
    }


    // Load tap by index
    function loadTap(index) {
        currentTapIndex = index;
        audioPlayer.src = tapSources[index].url;
        document.getElementById('current-tap').textContent = tapSources[index].title;
        audioPlayer.play();

        // Reset saved time
        localStorage.setItem(STORAGE_KEY_TAP, index);
        savedTime = 0;
        localStorage.setItem(STORAGE_KEY_TIME, 0);
    }

    // Load saved tap and time from localStorage
    function loadSavedTapAndTime() {
        const savedTap = localStorage.getItem(STORAGE_KEY_TAP);
        const savedTime = localStorage.getItem(STORAGE_KEY_TIME);

        if (savedTap !== null) {
            currentTapIndex = parseInt(savedTap, 10);
            loadTap(currentTapIndex);

            if (savedTime !== null && !isNaN(savedTime)) {
                audioPlayer.currentTime = parseFloat(savedTime);
            }
        } else {
            loadTap(0); // Load first tap if no saved state
        }
    }

    // Update time in localStorage when playing
    audioPlayer.addEventListener('timeupdate', () => {
        localStorage.setItem(STORAGE_KEY_TIME, audioPlayer.currentTime);
    });

    playPauseBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.textContent = '⏸';
        } else {
            audioPlayer.pause();
            playPauseBtn.textContent = '▶️';
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentTapIndex > 0) {
            currentTapIndex--;
            loadTap(currentTapIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentTapIndex < tapSources.length - 1) {
            currentTapIndex++;
            loadTap(currentTapIndex);
        }
    });

    // Điều chỉnh tốc độ phát
// Điều chỉnh tốc độ phát
speedControl.addEventListener('input', function() {
    const newSpeed = speedControl.value;
    audioPlayer.playbackRate = newSpeed;  // Thay đổi tốc độ phát
    speedValue.textContent = newSpeed + 'x';  // Hiển thị giá trị tốc độ
});


    // Điều chỉnh âm lượng
    volumeControl.addEventListener('input', function () {
        const newVolume = volumeControl.value;
        audioPlayer.volume = newVolume;  // Thay đổi âm lượng
        volumeValue.textContent = Math.round(newVolume * 100) + '%';  // Hiển thị giá trị âm lượng
    });

    // Fetch audio list on page load
    fetchAudioList();
});
