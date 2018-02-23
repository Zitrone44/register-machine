import 'babel-polyfill'
import RA from './register.js'

$(document).ready(() => {
    if (location.hash) {
        fetch('https://api.github.com/gists/' + location.hash.slice(1)).then((req) => {
            return req.json()
        }).then((res) => {
            $('#input').val(res.files['ra.txt'].content)
            $('#info').val(res.description)
        }).catch((err) => {
            alert(err)
        })
    }
    $('#run').click((e) => {
        e.preventDefault()
        const schema = $('#input').val()
        try {
            const parsed = RA.parser.parse(schema)
            const ra = new RA.RA(parsed, window.debug || false)
            const result = ra.run()
            alert(result)
        } catch (err) {
            alert(err)
        }
    })
    $('#save').click((e) => {
        e.preventDefault()
        fetch('https://api.github.com/gists', {method: 'POST', body: JSON.stringify({description: prompt('Name des RAs eingeben'),
        public: false,
        files: {"ra.txt": {content: $('#input').val()}}})}).then((req) => {
            return req.json()
        }).then((res) => {
            location = `${location.origin}${location.pathname}#${res.id}`
        }).catch((err) => {
            alert(err)
        })
    })
})