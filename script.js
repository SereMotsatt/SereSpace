const input = document.getElementById('imtext');
const extb = document.getElementById("ext");
const del_all = document.getElementById("delete_all");


async function guardarDatos(key, value) {
  await chrome.storage.local.set({ [key]: value });
  console.log("Datos guardados con éxito");
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