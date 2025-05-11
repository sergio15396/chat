let socket = null;
let currentModalAction = null;

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

initTheme();
document.addEventListener('DOMContentLoaded', initTheme);

function join() {
    const user = document.getElementById("username").value;
    const room = document.getElementById("room").value;
    if (!user || !room) {
        alert("Escriu nom i sala");
        return;
    }

    socket = new WebSocket(`ws://${location.host}/ws/${room}/${user}`);

    socket.onopen = () => {
        document.getElementById("chat").style.display = "block";
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const msgBox = document.getElementById("messages");

        if (data.type === "msg") {
            msgBox.innerHTML += `<div id="msg-${data.id}"><span class="msg-id">#${data.id}</span> <b>${data.from}:</b> ${data.msg}</div>`;
        } else if (data.type === "info") {
            msgBox.innerHTML += `<div class="message-info"><i class="fas fa-info-circle"></i> ${data.msg}</div>`;
        } else if (data.type === "delete") {
            const el = document.getElementById(`msg-${data.id}`);
            if (el) {
                el.className = "message-deleted";
                el.innerHTML = `<i class="fas fa-trash-alt"></i> Missatge esborrat per ${data.by}`;
            }
        }
        msgBox.scrollTop = msgBox.scrollHeight;
    };

    socket.onerror = (e) => {
        console.error("WebSocket error:", e);
        alert("Error en la connexió");
    };
}

function sendMsg() {
    const msg = document.getElementById("input").value;
    if (msg && socket) {
        socket.send(JSON.stringify({ type: "msg", msg }));
        document.getElementById("input").value = "";
    }
}

function showDeleteModal() {
    currentModalAction = 'delete';
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalInput = document.getElementById('modal-input');
    const modalConfirm = document.getElementById('modal-confirm');

    modalTitle.textContent = 'Esborrar missatge';
    modalInput.placeholder = 'ID del missatge a esborrar';
    modalConfirm.textContent = 'Esborrar';
    modalConfirm.className = 'danger';
    
    modal.classList.add('show');
    modalInput.focus();
}

function showAdminModal() {
    currentModalAction = 'admin';
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalInput = document.getElementById('modal-input');
    const modalConfirm = document.getElementById('modal-confirm');

    modalTitle.textContent = 'Fer admin';
    modalInput.placeholder = 'Nom de l\'usuari';
    modalConfirm.textContent = 'Fer admin';
    modalConfirm.className = 'success';
    
    modal.classList.add('show');
    modalInput.focus();
}

function closeModal() {
    const modal = document.getElementById('modal');
    const modalInput = document.getElementById('modal-input');
    
    modal.classList.remove('show');
    modalInput.value = '';
    currentModalAction = null;
}

function handleModalConfirm() {
    const modalInput = document.getElementById('modal-input');
    const value = modalInput.value.trim();

    if (!value) return;

    if (currentModalAction === 'delete') {
        socket.send(JSON.stringify({ type: "delete", id: parseInt(value) }));
    } else if (currentModalAction === 'admin') {
        socket.send(JSON.stringify({ type: "make_admin", target: value }));
    }

    closeModal();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
