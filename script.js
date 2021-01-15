document.addEventListener("DOMContentLoaded", () => {
let version = '1.9.0';
let iframe = document.getElementById('api-frame');
let uid = '3df80a8fc04b47078de68545508b0038';

let client = new window.Sketchfab(version, iframe);

let error = () => {
    console.error('Sketchfab API error');
};

let success = (api) => {
    api.start(() => {
        document.getElementById('screenshot').addEventListener('click', function() {
            api.getScreenShot(800, 800, 'image/png', (err, result) => {
                let anchor = document.createElement('a');
                anchor.href = result;
                anchor.download = 'screenshot.png';
                anchor.innerHTML = '<img width="100" height="100" src=' + result + '>download';
                document.getElementById('controls').appendChild(anchor);
                anchor.style.position = 'relative';
                anchor.style.left = '5px';
            });
        });

        api.addEventListener('Hover',(result) => {
            console.log(result);

            if (result.instanceID) {
                console.log(result.material);
            }

            api.pickColor({ x: result.position2D[0], y: result.position2D[1] }, (rgba) => {
                console.log(arguments);
                console.log(
                    'rgba(' + rgba[0] + ', ' + rgba[1] + ', ' + rgba[2] + ', ' + rgba[3] + ')'
                );
            });
        });
    });
};

client.init(uid, {
    success: success,
    error: error
});

function initGui() {
    let controls = document.getElementById('controls');
    let buttonsText = '';
    buttonsText += '<button id="screenshot">📷<br>Capture</button>';
    controls.innerHTML = buttonsText;
}

initGui();

});
