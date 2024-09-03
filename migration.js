import mongoose from "mongoose";
import BookModel from "./models/Book.js";;
import fs from "fs"
mongoose
	.connect(`mongodb://127.0.0.1:27017/books-imdb`)
	.then((res) => console.log("Database successfully connected"))
	.catch((err) => {
		console.log((err) => console.log(err));
	});
let bookData = fs.readFileSync(`./books.json`, "utf-8");
bookData = JSON.parse(bookData);
async function seedBookInDatabase(books) {
	try {
		const isSeedDataExist = await BookModel.find({});
		if (isSeedDataExist && isSeedDataExist.length > 0) {
			console.log("Books data already seeded");
            return
		}
		//generate mongo uuid instead of 1,2,3 in json
		const formattedBooks = books.map((book) => {
			delete book._id;
			//formate date also
			if (book.publishedDate && book.publishedDate.$date) {
				book.publishedDate = new Date(
					book.publishedDate.$date
				).toISOString();
			}
			return book;
		});
		const result = await BookModel.insertMany(formattedBooks);
		if (!result) {
			console.log("Something went wrong while seeding data");
            return
		}
		console.log("Books data added successfully!");
	} catch (err) {
		console.log(err);
	}
}

seedBookInDatabase(bookData);
