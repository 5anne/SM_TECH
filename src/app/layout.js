import localFont from "next/font/local";
import "./globals.css";
import connectDB from "@/lib/connectDB";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { auth } from "../../auth";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata = {
    title: {
        default: "Fresh Harvests",
        template: "%s | Fresh Harvests"
    },
    description: "Fresh Harvests for Fresh Food",
    keywords: ['about', 'shop', 'home', 'blog', 'fruits', 'salad', 'vegetables']
};

export default async function RootLayout({ children }) {
    await connectDB();
    const session = await auth();

    try {
        const { name, email, image } = session.user;
        const response = await fetch(`https://fresh-harvests-6kzq.vercel.app/api/v1/users/authRegister`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, image }),
        });
        if (response.ok) {
            console.log("User registered successfully! You may update your profile!")
        } else {
            console.error("Error occurred!", response.error.message)
        }
    } catch (err) {
        console.error("Error occurred!", err.message);
    }

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Navbar session={session} />
                {children}
                <Footer />
            </body>
        </html>
    );
}