const { query } = require('./db')

const createBorrower = `
    CREATE TABLE BORROWER_seq (
        Id INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (Id)
    );
    
    CREATE TABLE BORROWER (
        Card_id VARCHAR(8) NOT NULL DEFAULT '0',
        Bname VARCHAR(255),
        Ssn INT(9),
        Address VARCHAR(255),
        Phone INT(10),
        PRIMARY KEY (Card_id)
    );
        
    DELIMITER $$
    CREATE TRIGGER borrower_card_id
        BEFORE INSERT ON BORROWER
        FOR EACH ROW
    BEGIN
        INSERT INTO BORROWER_seq VALUES (NULL);
        SET NEW.Card_id = CONCAT('ID', LPAD(LAST_INSERT_ID(), 6, '0'));
    END$$
    DELIMITER ;
`
const createBook = `
    CREATE TABLE BOOK (
        Isbn VARCHAR(10) NOT NULL,
        Title VARCHAR(255),
        PRIMARY KEY (Isbn)
    );
`
const createAuthor = `
    CREATE TABLE AUTHOR (
        Author_id INT NOT NULL AUTO_INCREMENT,
        Name VARCHAR(255),
        PRIMARY KEY (Author_id),
        UNIQUE (Name)
    );
`
const createBookToAuthors = `
    CREATE TABLE BOOK_AUTHOR (
        Author_id INT NOT NULL,
        Isbn VARCHAR(10) NOT NULL,
        FOREIGN KEY (Author_id) REFERENCES AUTHOR(Author_id),
        FOREIGN KEY (Isbn) REFERENCES BOOK(Isbn)
    );
`
const createBookToLoan = `
    CREATE TABLE BOOK_LOAN (
        Loan_id INT NOT NULL AUTO_INCREMENT,
        Isbn VARCHAR(10) NOT NULL,
        Card_id INT NOT NULL,
        Date_out DATE NOT NULL,
        Due_date DATE NOT NULL,
        Date_in DATE,
        PRIMARY KEY (Loan_id),
        FOREIGN KEY (Isbn) REFERENCES BOOK(Isbn),
        FOREIGN KEY (Card_id) REFERENCES BORROWER(Card_id)
    );
`
const createFines = `
    CREATE TABLE FINES (
        Loan_id INT NOT NULL,
        Fine_amt FLOAT(100, 2) NOT NULL,
        Paid BOOLEAN NOT NULL,
        PRIMARY KEY (Loan_id),
        FOREIGN KEY (Loan_id) REFERENCES BOOK_LOAN(Loan_id)
    );
`

module.exports.migrate = async () => {
    try {
        for (const s of [createBorrower, createBook, createAuthor, createBookToAuthors, createBookToLoan, createFines]) {
            await query(s)
        }
        console.log("Successfully migrated database!")
    } catch (e) {
        console.error("Unable to create the necessary tables in the database.")
        console.error(e)
        process.exit(1)
    }
}
