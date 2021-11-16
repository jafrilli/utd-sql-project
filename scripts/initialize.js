const { query } = require('./db')
const csv = require('csvtojson');

module.exports.populateBooksAndAuthors = async (filePath, delimiter) => csv({ delimiter }).fromFile(filePath).then(async (json) => {
    for (let i = 0; i < json.length; i++) {
        const row = json[i]

        // add the authors
        const book_authors = []
        for (let author of row["Author"].split(',')) {
            try {
                book_authors.push(author)
                await query(`
                    INSERT INTO AUTHOR (Name)
                    VALUES (?);
                `, [author])
            } catch (e) {
                // console.error(`Could not add author ${author}.`)
                // console.error(e)
            }
        }

        // add the books
        try {
            await query(`
                INSERT INTO BOOK (Isbn, Title)
                VALUES (?, ?);
            `, [
                row["ISBN10"].toString(),
                row["Title"].toString()
            ])
        } catch (e) {
            console.error(`Could not add book ${row["Title"].toString()}.`)
            console.error(e)
        }

        // add the book_author relationships
        for (let a of book_authors) {
            try {
                await query(`
                    INSERT INTO BOOK_AUTHOR (Author_id, Isbn)
                    VALUES ((SELECT Author_id FROM AUTHOR WHERE Name = ?), ?);
                `, [
                    a.toString(),
                    row["ISBN10"].toString()
                ])
            } catch (e) {
                console.error(`Could not add book-author tuple ${row["ISBN10"].toString()}-${a.toString()}.`)
                console.error(e)
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
            await query(`
                INSERT INTO BORROWER (Bname, Ssn, Address, Phone)
                VALUES (?, ?, ?, ?);
            `, [
                row["first_name"].toString() + " " + row["last_name"].toString(),
                row["ssn"].toString().replace(/[^\d]/g, ""),
                row["address"].toString(),
                row["phone"].toString().replace(/[^\d]/g, ""),
            ])
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



