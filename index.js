const blessed = require('blessed')
const axios = require('axios');
const args = require("args-parser")(process.argv)

const screen = blessed.screen({
    smartCSR: true
});
screen.key(['q', 'C-c', 'escape'], function quit() { return process.exit(0); });

const table = blessed.table({ top: 3, border: 'line', width: "30%" });
const log = blessed.log({ top: 3, border: 'line', left: "30%" });
const input = blessed.textbox({ height: 3, border: 'line', inputOnFocus: true });

let q = {
    scans: 0,
    oks: 0,
    errors: 0,
}

input.key(['enter'], () => input.submit());
input.on('submit', () => {
    let text = input.getValue();
    input.setValue("")
    input.focus();
    q.scans++;
    updateStatus()
    axios.post("https://" + args.url + "/0/point/checkin", { tag: text, pistol: text, scanner: args.scanner }, { headers: { Authorization: "Bearer " + args.secret } })
        .then((response) => {
            q.oks++;
            updateStatus()
        })
        .catch((err) => {
            log.log(err.toString())
            q.errors++;
            updateStatus()
        })
        .finally(() => {
            updateStatus()
        })
});

screen.append(log);
screen.append(table);
screen.append(input);
input.focus();
updateStatus()

screen.render();

function updateStatus() {
    table.setData([
        ['Escaneos', `${q.scans}`],
        ['Correctos', `${q.oks}`],
        ['Erroneos', `${q.errors}`]
    ]);
    screen.render();
}