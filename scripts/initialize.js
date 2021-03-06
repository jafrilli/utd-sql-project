const { models } = require('../db')
const csv = require('csvtojson');

module.exports.populateBooksAndAuthors = async (filePath, delimiter) => csv({ delimiter }).fromFile(filePath).then(async (json) => {
    for (let i = 0; i < json.length; i++) {
        const row = json[i]

        // add the authors
        const book_authors = []
        for (let author of row["Author"].split(',')) {
            try {
                const a = await models.Author.findOrCreate({ where: { name: author }})
                book_authors.push(a[0].dataValues.authorId)
            } catch (e) {
                // console.error(`Could not add author ${author}.`)
                // console.error(e)
            }
        }

        // add the books
        try {
            await models.Book.create({
                isbn: row["ISBN10"].toString(),
                title: row["Title"].toString()
            })
        } catch (e) {
            // console.error(`Could not add book ${row["Title"].toString()}.`)
            // console.error(e)
        }

        // add the book_author relationships
        for (let authorId of book_authors) {
            try {
                await models.BookAuthor.create({
                    authorId,
                    isbn: row["ISBN10"].toString()
                })
            } catch (e) {
                // console.error(`Could not add book-author tuple ${row["ISBN10"].toString()}-${authorId}.`)
                // console.error(e)
            }
        }

        // progress
        process.stdout.moveCursor(0, -1)
        process.stdout.clearLine(1)
        console.log(`${i + 1}/${json.length} books + authors processed.`)
    }
})

module.exports.populateBorrowers = async (filePath, delimiter) => csv({ delimiter }).fromFile(filePath).then(async (json) => {
    for (let i = 0; i < json.length; i++) {
        const row = json[i]

        // add the borrowers
        try {
            await models.Borrower.create({
                name: row["first_name"].toString() + " " + row["last_name"].toString(),
                ssn: row["ssn"].toString(),
                phone: row["phone"].toString(),
                address: row["address"].toString()
            })
        } catch (e) {
            console.error(`Could not add borrower ${row["ssn"].toString()}.`)
            console.error(e)
        }

        // progress
        process.stdout.moveCursor(0, -1)
        process.stdout.clearLine(1)
        console.log(`${i + 1}/${json.length} borrowers processed.`)
    }
})
