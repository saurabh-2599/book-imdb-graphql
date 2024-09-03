import { generateAuthToken } from "../lib/token.js";
import BookModel from "../models/Book.js";
import UserModel from "../models/User.js";
export const resolvers = {
	Query: {
		books: async () => {
			const books = await BookModel.find().sort("-publishedDate");
			return books;
		},
		book: async (_, args) => {
			const book = await BookModel.findById(args._id);
			return book;
		},
	},

	Mutation: {
		registerUser: async function () {
			const isUserFound = await UserModel.findOne({
				email: args.user.email,
			});
			if (isUserFound) {
				throw new Error("User already exist")
			}
			const userPayload = {
				...args.user,
				otp: Math.floor(100000 + Math.random() * 900000),
				otpGeneratedAt: new Date(),
			};
			console.log("__OTP__", userPayload.otp);
			await UserModel.create(userPayload);
			return {
				message:
					"An Otp is sent to your email for verifying your email",
			};
		},
		loginUser: async function (_id, args) {
			try {
				const isUserFound = await UserModel.findOne({
					email: args.user.email,
				});
				if (!isUserFound) {
					throw new Error("User Not found")
				}
				const newOTP = Math.floor(100000 + Math.random() * 900000);
				console.log("newOTP", newOTP);
				isUserFound.otp = newOTP;
				isUserFound.otpGeneratedAt = new Date();
				await isUserFound.save();
				return {
					message:
						"An Otp is sent to your email for verifying your email",
				};
			} catch (err) {
				return { message: err.message };
			}
		},
		verifyOTP: async function (_, args) {
			const isUserFound = await UserModel.findOne({
				email: args.user.email,
			});
			if (!isUserFound) {
				throw new Error("Invalid email or otp");
			}

			const isValidOTP = await isUserFound.isValidOTP(
				args.user.otp,
				isUserFound
			);

			if (!isValidOTP) {
				throw new Error("Invalid email or otp");
			}
			const token = await generateAuthToken(isUserFound);

			return {
				user: isUserFound,
				token: token,
			};
		},
	},
};
