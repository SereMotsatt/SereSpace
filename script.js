const input = document.getElementById('imtext');
const extb = document.getElementById("ext");
const del_all = document.getElementById("delete_all");
const fondoUser = document.getElementById('fondoUser')

fondoUser.addEventListener('change', function(e) {
    const file = e.target.files[0];  // Primer archivo seleccionado
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(event) {
        guardarDatos("userImage", { data1: event.target.result });
        document.body.style.backgroundImage = `url(${event.target.result})`;
    }
    reader.readAsDataURL(file);
});

(async () => {
    const recurs = await chrome.storage.local.get(['userImage']);
    const imgDataSave = recurs.userImage?.data1 ?? "https://images.unsplash.com/photo-1526572728358-228f6b8ca29b?q=80&w=1223&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    if (!imgDataSave) return;
    document.body.style.backgroundImage = `url(${imgDataSave})`;
})();

async function guardarDatos(key, value) {
    await chrome.storage.local.get(null, async (result) => {
        result[key] = value;
        await chrome.storage.local.set(result);
    });
}


extb.addEventListener('click', () => {
    chrome.tabs.create({url: 'chrome://extensions/'});
});

function callhref(thehref, id) {
    let iddoc = document.getElementById(id);
    iddoc.addEventListener('click', () => {
        const valor = input.value.trim();
        guardarDatos("userPreferences", { data1: thehref });
        if (valor) {
            window.location.href = `${thehref}?q=${encodeURIComponent(valor)}`;
        }
    });
};

callhref("https://www.google.com/search","gweb");
callhref("https://www.bing.com/search","bweb");
callhref("https://www.perplexity.ai/search","p_ia");


del_all.addEventListener('click', () => {
    input.value = "";
});


input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
            
        const valor = input.value.trim();
        if (valor) {
            (async () => {
                const res = await chrome.storage.local.get(['userPreferences']);
                // Acceso correcto: res.userPreferences.data1
                const motorPref = res.userPreferences?.data1 ?? "https://www.google.com/search";
                window.location.href = `${motorPref}?q=${encodeURIComponent(valor)}`;
                console.log(res.data1);
            })();
        }
    }
});