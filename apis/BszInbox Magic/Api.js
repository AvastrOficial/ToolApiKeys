// BSZInbox Magic - Sin necesidad de HTML previo

(function () {
    // Esperar a que Vue y Axios estén disponibles
    if (typeof Vue === 'undefined' || typeof axios === 'undefined') {
        console.error('❌ Vue y/o Axios no están cargados. Carga Vue 3 y Axios antes de este script.');
        return;
    }

    // Crear contenedor dinámicamente
    const container = document.createElement('div');
    container.id = 'bsz-inbox-mount';
    document.body.appendChild(container);

    // Inyectar estilos CSS
    const style = document.createElement('style');
    style.textContent = `
        #bsz-inbox-mount {
            font-family: sans-serif;
            max-width: 600px;
            margin: 2rem auto;
            background: #f9f9f9;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .email-box {
            font-weight: bold;
            color: #333;
            margin-bottom: 1rem;
        }
        button {
            background: #4a90e2;
            color: white;
            border: none;
            padding: 0.6rem 1rem;
            border-radius: 0.5rem;
            cursor: pointer;
            margin-right: 0.5rem;
        }
        button:hover {
            background: #357ab8;
        }
        .alert {
            color: red;
            font-weight: bold;
            margin-top: 1rem;
        }
        ul {
            padding-left: 1.2rem;
        }
    `;
    document.head.appendChild(style);

    // Aplicación Vue
    const BSZInboxMagic = {
        setup() {
            const { ref, onMounted } = Vue;
            const email = ref('');
            const token = ref('');
            const emails = ref([]);
            const loading = ref(true);
            const history = ref([]);
            const showAlert = ref(false);
            let alertTimeout = null;

            const generateEmail = async () => {
                try {
                    const response = await axios.post('https://cors-anywhere.herokuapp.com/https://api.tempmail.lol/v2/inbox/create');
                    email.value = response.data.address;
                    token.value = response.data.token;
                    history.value.push({ email: email.value, emails: [] });
                    fetchInbox();
                } catch (error) {
                    console.error('Error generating email:', error);
                    if (error.message === "Request failed with status code 500") {
                        showAlert.value = true;
                        clearTimeout(alertTimeout);
                        alertTimeout = setTimeout(() => {
                            showAlert.value = false;
                        }, 10000);
                    }
                } finally {
                    loading.value = false;
                }
            };

            const fetchInbox = async () => {
                if (!token.value) return;
                try {
                    const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://api.tempmail.lol/v2/inbox?token=${token.value}`);
                    emails.value = response.data.emails;
                    const current = history.value.find(h => h.email === email.value);
                    if (current) current.emails = emails.value;
                } catch (error) {
                    console.error('Error fetching inbox:', error);
                }
            };

            onMounted(generateEmail);

            return { email, emails, loading, fetchInbox, generateEmail, history, showAlert };
        },
        template: `
            <div>
                <div class="email-box">Correo generado: {{ email }}</div>
                <button @click="generateEmail">Generar nuevo correo</button>
                <button @click="fetchInbox">Actualizar buzón</button>
                <div v-if="showAlert" class="alert">Error al generar correo. Intenta más tarde.</div>
                <h3>Correos recibidos:</h3>
                <ul>
                    <li v-for="(msg, index) in emails" :key="index">
                        <strong>{{ msg.from }}</strong>: {{ msg.subject }}
                    </li>
                </ul>
            </div>
        `
    };

    Vue.createApp(BSZInboxMagic).mount('#bsz-inbox-mount');
})();
