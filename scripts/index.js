// run the initialization scripts
async function start() {
    const booksAuthorCsvFile = "./data/books.csv"
    const borrowerCsvFile = "./data/borrowers.csv"
    // db formation
    console.log("Step 1 | DB Formation")
    await require('./migrate').migrate()
    // db population
    console.log(`\nStep 2.1 | DB Book + Author Population\n`)
    await require('./initialize').populateBooksAndAuthors(booksAuthorCsvFile, "\t")

    console.log(`\nStep 2.2 | DB Borrower Population\n`)
    await require('./initialize').populateBorrowers(borrowerCsvFile, ",")
    // end process
    process.exit()
}

start()