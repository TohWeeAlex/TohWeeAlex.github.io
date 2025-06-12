const dropzone = document.getElementById('dropzone_checksum');
const fileInput = document.getElementById('fileInput_checksum');
const expectedHashInput = document.getElementById('expectedHash');
const checksumIDer = document.getElementById('checksumID');
let selectedFile = null;

dropzone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', e => {
    selectedFile = e.target.files[0];
    dropzone.textContent = `Selected: ${selectedFile.name}`;
});

dropzone.addEventListener('drop', e => {
    e.preventDefault();
    selectedFile = e.dataTransfer.files[0];
    dropzone.textContent = `Selected: ${selectedFile.name}`;
    fileInput.files = e.dataTransfer.files;
});

expectedHashInput.addEventListener('input', e => {
    console.log("Hash input changed")
    let len = expectedHashInput.value.trim().length;
    let hashAlgo;
    if (len === 64) {
        hashAlgo = 'SHA-256';
    }
    if (len === 40) {
        hashAlgo = 'SHA-1';
    }
    if (len === 32) {
        hashAlgo = 'MD5';
    }   
    checksumIDer.innerHTML = ` <strong>${hashAlgo} Hash detected</strong> `;
});

async function computeChecksum() {
    if (!selectedFile) return alert("No file selected");

    const expected = expectedHashInput.value.trim().toLowerCase();
    const algo = detectAlgorithm(expected);
    if (!algo) return alert("Unable to detect checksum algorithm from expected hash");

    const buffer = await selectedFile.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest(algo, buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    const resultDiv = document.getElementById('result');
    const match = expected === hashHex;
    resultDiv.innerHTML = `
        <p><strong>Computed:</strong> ${hashHex}</p>
        <p class="${match ? 'match' : 'mismatch'}">
        ${match ? 'Checksum matches!' : 'Checksum does not match.'}
        </p>
    `;
}