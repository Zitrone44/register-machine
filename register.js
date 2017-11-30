
/**
 * Represents a RA
 */
class RA {
    /**
     * Creats a New RA
     * @param {Object[]} syntax 
     * @param {boolean} debug
     * @returns {RA} An Ra
     */
    constructor(syntax, debug) {
        this.syntax = syntax
        this.debug = debug
        this.memory = {0: 0}
    }

    /**
     * Runs the RA
     * @param {Object} options
     * @return {number} Final Memory State
     */
    run(options) {
        this._executeLine(0)
        return this.memory[0]
    }

    /**
     * Execute a Line
     * @private
     * @param {number} lineNumber 
     */
    _executeLine (lineNumber) {
        const line = this.syntax[lineNumber]
        const match = line.parameter.match(/\[([0-9]+)\]/)
        switch(line.command) {
            case 'Load':
                if (match) {
                    this.memory[0] = this.memory[match[1]]                   
                } else {
                    this.memory[0] = line.parameter
                }
                break
            case 'Store':
                this.memory[match[1]] = this.memory[0]         
                break
            case 'Add':
                this.memory[0] = (Number.parseInt(this.memory[0]) + Number.parseInt(this.memory[match[1]])).toString()
                break
            case 'Sub':
                this.memory[0] = (Number.parseInt(this.memory[0]) - Number.parseInt(this.memory[match[1]])).toString() 
                if (this.memory[0] < 0) {
                    this.memory[0] = 0
                }
                break
            case 'Mul':
                this.memory[0] = (Number.parseInt(this.memory[0]) * Number.parseInt(this.memory[match[1]])).toString()            
                break
            case 'Div':
                this.memory[0] = (Number.parseInt(this.memory[0]) / Number.parseInt(this.memory[match[1]])).toString()            
                break
            case 'Goto':
                return this._executeLine(Number.parseInt(line.parameter))
                break
            case 'JZero':
                if(Number.parseInt(this.memory[0]) === 0) {
                    return this._executeLine(Number.parseInt(line.parameter))      
                }
                break
            default:
                throw new Error('Unknown Command ' + line.command)
        }
        if(this.debug) {
            console.log({lineNumber, line, memory: JSON.parse(JSON.stringify(this.memory))}) 
        }
        if(lineNumber !== this.syntax.length -1) {
            return this._executeLine(lineNumber + 1)                
        }
    }

}

const exporter = {RA, parser: require('./parser')}

if (window) {
    window.RA = exporter
}
module.exports = exporter