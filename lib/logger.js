module.exports = {
    log: msg => { console.log('(', Date.now(), ')', msg) },
    error: msg => { console.error('(', Date.now(), ')', msg) }
};
