const uservideo = document.getElementById('user-video');
const startbtn = document.getElementById('start-btn');

const state = { media: null }
const socket = io();
startbtn.addEventListener('click', () => {
    const Mediarecorder = new MediaRecorder(state.media, {
        audioBitsPerSecond: 128000,
        videoBitsPerSecond: 2500000,
        framerate: 25
    })
    Mediarecorder.ondataavailable = ev => {
        console.log('binary stream avialble', ev.data);
        socket.emit('binarystream', ev.data);
    }
    Mediarecorder.start(25);
})
window.addEventListener('load', async e => {
    const media = await navigator
        .mediaDevices
        .getUserMedia({ audio: true, video: true })
    state.media = media;
    uservideo.srcObject = media;
})