const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')
// console.log(notesPath)

async function addNote(title) {
 const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }

    notes.push(note)

    await saveNotes(notes)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green.inverse('Note was added!'))
}

// addNote('Test!')

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function saveNotes(notes) {
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function printNotes() {
    const notes = await getNotes()

    console.log(chalk.bgBlue('Here is the list if notes:'))
    notes.forEach(note => {
        console.log(chalk.blue(note.title), chalk.green(note.id))
    })
}

async function removeNote(id) {
    const notes = await getNotes()
    const filtered = notes.filter(note => note.id !== id)
    await saveNotes(filtered)
    console.log(chalk.red(`Note with id="${id}" remove`))
}

module.exports = {
    addNote, printNotes, removeNote
}