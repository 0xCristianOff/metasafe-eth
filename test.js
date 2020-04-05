var metasafe = require('./index');


async function start() {
    let x = await metasafe.generateMnemonic12();
    console.log(x);
}

metasafe.generateMnemonic12().then((event) => {
    console.log(event);
})


metasafe.analysis12(['add','wealth','wealth','wealth','wealth','wealth','wealth','wealth',
'wealth','wealth','wealth','wealth',]).then((event) => {
    console.log(event);
})