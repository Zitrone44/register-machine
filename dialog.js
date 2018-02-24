/*
MIT License

Copyright (c) 2018 Zitrone44

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/**
 * Open an Dialog
 * @param {String} title
 * @param {String} body
 * @param {Object[]} buttons
 * @returns {Promise}
 * @private
 */
function open(title, body, buttons) {
    return new Promise((resolve, reject) => {
        $('body').append(`<div class="modal fade" id="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${title}</h5>
              <button type="button" class="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              ${body}
            </div>
            <div class="modal-footer">
              ${(() => {
                return buttons.map((button) => {
                    return `<button type="button" class="btn btn-${button.class}" ${(() => {if(button.close) {return 'data-dismiss="modal"'}})()}>${button.text}</button>`
                }).join('\n');
              })()}
            </div>
          </div>
        </div>
      </div>`)
      $('#modal').modal('show')
      $('#modal').on('hidden.bs.modal', () => {
        $('#modal').remove()
        resolve()
      })
    })
}

/**
 * Opens an Alert Dialog
 * @param {String} msg - The message of the alert
 * @param {String} title - The title of the alert
 * @returns {Promise} Is resolved when alert is Closed
 */
function alert(msg, title) {
    return open(title || 'Alert', msg, [{text: 'Ok', class: 'primary', close: true}])
}

/**
 * Opens an Promt Dialog
 * @param {string} title - The title of the promt
 * @returns {Promise} Is resolved when promt is closed
 */
function prompt() {
    throw new Error("not implemented yet")
}

/**
 * Opens an Confirm Dialog
 * @param {string} msg - The message of the confirm
 * @param {string} title - The title of the confirm
 * @returns {Promise} Is resolved when confirm is closed
 */
function confirm() {
    throw new Error("not implemented yet")
}

export {alert, prompt, confirm}